import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { DialogTitleTypo, PageNumberTypo, DetailedInfoTitleTypo, DetailedInfoLabelTypo } from '../../styles';
import { PrimaryButton, SecondaryButton } from 'src/components/Buttons/styles';
import WarningTypo from '../../components/WarningTypo';
import ELAPrice from 'src/components/ELAPrice';
import { useStyles, InfoItemWrapper } from './styles';
import Web3 from 'web3';
import { METEAST_MARKET_CONTRACT_ADDRESS } from 'src/contracts/METMarket';
import { essentialsConnector } from 'src/components/ConnectWallet/EssentialsConnectivity';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useSignInContext } from 'src/context/SignInContext';
import { useDialogContext } from 'src/context/DialogContext';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { isInAppBrowser } from 'src/services/wallet';
import { uploadImage2Ipfs } from 'src/services/ipfs';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { callContractMethod } from 'src/components/ContractMethod';
import { blankContractMethodParam } from 'src/constants/init-constants';

export interface ComponentProps {}

const CheckBlindBoxDetails: React.FC<ComponentProps> = (): JSX.Element => {
    const [signInDlgState] = useSignInContext();
    const [dialogState, setDialogState] = useDialogContext();
    const { enqueueSnackbar } = useSnackbar();
    const [onProgress, setOnProgress] = useState<boolean>(false);
    const walletConnectProvider: WalletConnectProvider = isInAppBrowser()
        ? window.elastos.getWeb3Provider()
        : essentialsConnector.getWalletConnectProvider();
    const { library } = useWeb3React<Web3Provider>();
    const walletConnectWeb3 = new Web3(
        signInDlgState.loginType === '1' ? (walletConnectProvider as any) : (library?.provider as any),
    );

    const uploadCreatedBlindBoxInfo = (imgUri: string) =>
        new Promise((resolve: (value: boolean) => void, reject: (value: string) => void) => {
            const formData = new FormData();
            formData.append('token', signInDlgState.token);
            formData.append('did', signInDlgState.userDid);
            formData.append('address', signInDlgState.walletAccounts[0]);
            formData.append('name', dialogState.crtBlindTitle);
            formData.append('description', dialogState.crtBlindDescription);
            formData.append('asset', imgUri);
            formData.append('tokenIds', dialogState.crtBlindTokenIds);
            formData.append('status', dialogState.crtBlindStatus);
            formData.append('maxQuantity', dialogState.crtBlindQuantity.toString());
            formData.append('blindPrice', dialogState.crtBlindPrice.toString());
            formData.append('saleBegin', (new Date(dialogState.crtBlindSaleBegin).getTime() / 1e3).toString());
            // formData.append('saleEnd', (new Date(dialogState.crtBlindSaleEnd).getTime() / 1e3).toString());
            formData.append('maxPurchases', dialogState.crtBlindPurchases.toString());
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/createBlindBox`, formData, config)
                .then((response) => {
                    if (response.data.code === 200) {
                        resolve(true);
                    } else resolve(false);
                })
                .catch((e) => {
                    reject(e);
                });
        });

    const callCreateOrderForSaleBatch = () =>
        new Promise((resolve: (value: string) => void, reject: (error: string) => void) => {
            if (!dialogState.crtBlindImage) return;
            if (dialogState.crtBlindTxFee > signInDlgState.walletBalance) {
                enqueueSnackbar('Insufficient balance!', {
                    variant: 'error',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                });
                reject('InsufficientBalance');
                return;
            }
            setOnProgress(true);
            setDialogState({
                ...dialogState,
                waitingConfirmDlgOpened: true,
                progressBar: 20,
                waitingConfirmDlgTimer: setTimeout(() => {
                    setDialogState({
                        ...dialogState,
                        errorMessageDlgOpened: true,
                        waitingConfirmDlgOpened: false,
                        progressBar: 0,
                    });
                }, 120000),
            });
            callContractMethod(walletConnectWeb3, {
                ...blankContractMethodParam,
                contractType: 1,
                method: 'setApprovalForAll',
                price: '0',
                operator: METEAST_MARKET_CONTRACT_ADDRESS,
                approved: true,
            })
                .then((result: string) => {
                    if (result === 'success') {
                        enqueueSnackbar(`Set approval succeed!`, {
                            variant: 'success',
                            anchorOrigin: { horizontal: 'right', vertical: 'top' },
                        });
                    }
                    setDialogState({ ...dialogState, waitingConfirmDlgOpened: true, progressBar: 40 });
                    const _quoteToken = '0x0000000000000000000000000000000000000000';
                    const _inTokenIds: string[] = dialogState.crtBlindTokenIds.split(';');
                    const _inQuoteTokens: string[] = Array(_inTokenIds.length);
                    const _inPrices: string[] = Array(_inTokenIds.length);
                    _inQuoteTokens.fill(_quoteToken);
                    _inPrices.fill(BigInt(dialogState.crtBlindPrice * 1e18).toString());

                    callContractMethod(walletConnectWeb3, {
                        ...blankContractMethodParam,
                        contractType: 2,
                        method: 'createOrderForSaleBatch',
                        price: '0',
                        tokenIds: _inTokenIds,
                        quoteTokens: _inQuoteTokens,
                        _prices: _inPrices,
                        didUri: signInDlgState.didUri,
                        isBlindBox: true,
                    })
                        .then((txHash: string) => {
                            enqueueSnackbar(`Create Mystery Box succeed!`, {
                                variant: 'success',
                                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                            });
                            setDialogState({ ...dialogState, progressBar: 60 });
                            resolve(txHash);
                        })
                        .catch((error) => {
                            enqueueSnackbar(`Create Mystery Box error: ${error}!`, {
                                variant: 'error',
                                anchorOrigin: { horizontal: 'right', vertical: 'top' },
                            });
                            setDialogState({
                                ...dialogState,
                                createBlindBoxDlgOpened: false,
                                waitingConfirmDlgOpened: false,
                                errorMessageDlgOpened: true,
                                progressBar: 0,
                            });
                            reject('createOrderForSaleBatchError');
                        });
                })
                .catch((error) => {
                    enqueueSnackbar(`Set approval error: ${error}!`, {
                        variant: 'error',
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                    });
                    setDialogState({
                        ...dialogState,
                        createBlindBoxDlgOpened: false,
                        waitingConfirmDlgOpened: false,
                        errorMessageDlgOpened: true,
                        progressBar: 0,
                    });
                    reject('setApprovalError');
                });
        });

    const handleCreateBlindBox = () => {
        let transactionHash = '';
        callCreateOrderForSaleBatch()
            .then((txHash: string) => {
                transactionHash = txHash;
                return uploadImage2Ipfs(dialogState.crtBlindImage);
            })
            .then((added: any) => {
                setDialogState({ ...dialogState, progressBar: 80 });
                const imgUri = `meteast:image:${added.path}`;
                return uploadCreatedBlindBoxInfo(imgUri);
            })
            .then((success: boolean) => {
                if (success) {
                    enqueueSnackbar(`Create Mystery Box succeed!`, {
                        variant: 'success',
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                    });
                    setDialogState({
                        ...dialogState,
                        createBlindBoxDlgOpened: true,
                        createBlindBoxDlgStep: 2,
                        crtBlindTxHash: transactionHash,
                        waitingConfirmDlgOpened: false,
                        progressBar: 100,
                    });
                } else {
                    enqueueSnackbar(`Create Mystery Box error!`, {
                        variant: 'error',
                        anchorOrigin: { horizontal: 'right', vertical: 'top' },
                    });
                }
            })
            .catch((error) => {
                enqueueSnackbar(`Create Mystery Box error: ${error}!`, {
                    variant: 'error',
                    anchorOrigin: { horizontal: 'right', vertical: 'top' },
                });
            })
            .finally(() => {
                setOnProgress(false);
            });
    };

    const displayItemNames = (names: string) => {
        let ret: string = '';
        if (names !== undefined) {
            const itemNameList: string[] = names.split(';').filter((value: string) => value.length > 0);
            itemNameList.forEach((item: string) => {
                ret += `${item}, `;
            });
            return ret.slice(0, ret.length - 2);
        } else return ret;
    };

    const classes = useStyles();
    return (
        <Stack
            spacing={5}
            width={400}
            maxHeight={'80vh'}
            sx={{ overflowY: 'auto', overflowX: 'hidden' }}
            className={classes.container}
        >
            <Stack alignItems="center">
                <PageNumberTypo>2 of 2</PageNumberTypo>
                <DialogTitleTypo>Check Mystery Box Details</DialogTitleTypo>
            </Stack>
            <Stack paddingX={6} paddingY={4} spacing={1} borderRadius={5} sx={{ background: '#F0F1F2' }}>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Title</DetailedInfoTitleTypo>
                    <Typography fontSize={20} fontWeight={500}>
                        {dialogState.crtBlindTitle}
                    </Typography>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Status</DetailedInfoTitleTypo>
                    <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="#1EA557"
                        sx={{
                            display: 'inline-block',
                            background: '#C9F5DC',
                            paddingX: 1,
                            paddingY: 0.5,
                            borderRadius: 2,
                        }}
                    >
                        {dialogState.crtBlindStatus}
                    </Typography>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo># Of Nft</DetailedInfoTitleTypo>
                    <DetailedInfoLabelTypo>{dialogState.crtBlindQuantity}</DetailedInfoLabelTypo>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Price</DetailedInfoTitleTypo>
                    <ELAPrice price_ela={dialogState.crtBlindPrice} price_ela_fontsize={14} />
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Sale Begins</DetailedInfoTitleTypo>
                    <DetailedInfoLabelTypo>{dialogState.crtBlindSaleBegin.replace('T', ' ')}</DetailedInfoLabelTypo>
                </InfoItemWrapper>
                {/* <InfoItemWrapper>
                        <DetailedInfoTitleTypo>Sale Ends</DetailedInfoTitleTypo>
                        <DetailedInfoLabelTypo>{dialogState.crtBlindSaleEnd.replace('T', ' ')}</DetailedInfoLabelTypo>
                    </InfoItemWrapper> */}
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Max num of purchases</DetailedInfoTitleTypo>
                    <DetailedInfoLabelTypo>{dialogState.crtBlindPurchases}</DetailedInfoLabelTypo>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Description</DetailedInfoTitleTypo>
                    <DetailedInfoLabelTypo textAlign="right">{dialogState.crtBlindDescription}</DetailedInfoLabelTypo>
                </InfoItemWrapper>
                <InfoItemWrapper>
                    <DetailedInfoTitleTypo>Items</DetailedInfoTitleTypo>
                    <DetailedInfoLabelTypo textAlign="right">
                        {displayItemNames(dialogState.crtBlindTokenNames)}
                    </DetailedInfoLabelTypo>
                </InfoItemWrapper>
            </Stack>
            <Stack alignItems="center" spacing={1}>
                <Typography fontSize={14} fontWeight={600}>
                    Available: {signInDlgState.walletBalance} ELA
                </Typography>
                <Stack direction="row" width="100%" spacing={2}>
                    <SecondaryButton
                        fullWidth
                        onClick={() => {
                            setDialogState({
                                ...dialogState,
                                createBlindBoxDlgOpened: true,
                                createBlindBoxDlgStep: 0,
                                progressBar: 0,
                            });
                        }}
                    >
                        Back
                    </SecondaryButton>
                    <PrimaryButton fullWidth disabled={onProgress} onClick={handleCreateBlindBox}>
                        Confirm
                    </PrimaryButton>
                </Stack>
                <WarningTypo width={240}>
                    In case of payment problems, please contact the official customer service
                </WarningTypo>
            </Stack>
        </Stack>
    );
};

export default CheckBlindBoxDetails;

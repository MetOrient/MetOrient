import React, { useState, useEffect } from 'react';
import ModalDialog from 'src/components/ModalDialog';
import MintNFT from 'src/components/TransactionDialogs/MintNFT/MintNFT';
import CheckNFTDetails from 'src/components/TransactionDialogs/MintNFT/CheckNFTDetails';
import NFTMinted from 'src/components/TransactionDialogs/MintNFT/NFTMinted';
import { useDialogContext } from 'src/context/DialogContext';
import { TypeMintInputForm } from 'src/types/mint-types';

export interface ComponentProps {}

const MintNFTDlgContainer: React.FC<ComponentProps> = (): JSX.Element => {
    const defaultValue: TypeMintInputForm = {
        name: '',
        description: '',
        author: '',
        category: { label: '', value: '' },
        file: new File([""], "")
    };
    const [dialogState, setDialogState] = useDialogContext();
    const [inputFormData, setInputFormData] = useState<TypeMintInputForm>(defaultValue);

    useEffect(()=>{
        console.log(dialogState.createNFTDlgStep, "-stage:      ", inputFormData)
    }, [dialogState.createNFTDlgStep]);
    
    return (
        <ModalDialog
            open={dialogState.createNFTDlgOpened}
            onClose={() => {
                setDialogState({ ...dialogState, createNFTDlgOpened: false });
            }}
        >
            {dialogState.createNFTDlgStep === 0 && <MintNFT inputData={inputFormData} setInputData={setInputFormData}/>}
            {dialogState.createNFTDlgStep === 1 && <CheckNFTDetails inputData={inputFormData} setInputData={setInputFormData}/>}
            {dialogState.createNFTDlgStep === 2 && <NFTMinted />}
        </ModalDialog>
    );
};

export default MintNFTDlgContainer;

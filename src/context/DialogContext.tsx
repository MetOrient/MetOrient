import React, { createContext, useState, useContext } from 'react';
import { TypeSelectItem } from 'src/types/select-types';

interface DlgState {
    // manage profile
    manageProfileDlgOpened: boolean;
    // confirm transaction
    waitingConfirmDlgOpened: boolean;
    waitingConfirmDlgTimer: ReturnType<typeof setTimeout> | null;
    loadingDlgOpened: boolean;
    // error msg
    errorMessageDlgOpened: boolean;
    // all transactions
    allTxDlgOpened: boolean;
    // all bids
    allBidDlgOpened: boolean;
    noBidDlgOpened: boolean;
    // progres bar
    progressBar: number;
    // mint nft
    createNFTDlgOpened: boolean;
    createNFTDlgStep: number;
    mintCategory: TypeSelectItem;
    mintTitle: string;
    mintIntroduction: string;
    mintFile: File;
    mintRoyalties: number;
    mintTokenId: string;
    mintTokenUri: string;
    mintDidUri: string;
    mintTxHash: string;
    mintTxFee: number;
    // create order for sale/auction
    sellSaleType: 'buynow' | 'auction';
    sellSaleEnds: TypeSelectItem;
    sellPrice: number;
    sellMinPrice: number;
    sellTxHash: string;
    sellTxFee: number;
    // buy now
    buyNowDlgOpened: boolean;
    buyNowDlgStep: number;
    buyNowName: string;
    buyNowPrice: number;
    buyNowOrderId: string;
    buyNowTxHash: string;
    buyNowTxFee: number;
    // change price
    changePriceDlgOpened: boolean;
    changePriceDlgStep: number;
    changePriceCurPrice: number;
    changePriceOrderId: string;
    changePriceTxHash: string;
    changePriceTxFee: number;
    // cancel sale
    cancelSaleDlgOpened: boolean;
    cancelSaleDlgStep: number;
    cancelSaleOrderId: string;
    cancelSaleTxHash: string;
    cancelSaleTxFee: number;
    // accept bid
    acceptBidDlgOpened: boolean;
    acceptBidDlgStep: number;
    acceptBidName: string;
    acceptBidPrice: number;
    acceptBidOrderId: string;
    acceptBidTxFee: number;
    acceptBidTxHash: string;
    // place bid
    placeBidDlgOpened: boolean;
    placeBidDlgStep: number;
    placeBidName: string;
    placeBidOrderId: string;
    placeBidMinLimit: number;
    placeBidAmount: number;
    placeBidExpire: TypeSelectItem;
    placeBidTxHash: string;
    placeBidTxFee: number;
    // update bid
    updateBidDlgOpened: boolean;
    updateBidDlgStep: number;
    updateBidPrice: number;
    updateBidOrderId: string;
    updateBidTxFee: number;
    updateBidTxHash: string;
    // cancel bid
    cancelBidDlgOpened: boolean;
    cancelBidDlgStep: number;
    cancelBidOrderId: string;
    cancelBidTxHash: string;
    cancelBidTxFee: number;
    // create blind box
    createBlindBoxDlgOpened: boolean;
    createBlindBoxDlgStep: number;
    crtBlindTitle: string;
    crtBlindDescription: string;
    crtBlindImage: File;
    crtBlindTokenIds: string;
    crtBlindTokenNames: string;
    crtBlindStatus: 'offline' | 'online';
    crtBlindQuantity: number;
    crtBlindPrice: number;
    crtBlindSaleBegin: string;
    crtBlindSaleEnd: string;
    crtBlindPurchases: number;
    crtBlindTxFee: number;
    crtBlindTxHash: string;
    // buy blind box
    buyBlindBoxDlgOpened: boolean;
    buyBlindBoxDlgStep: number;
    buyBlindBoxId: number;
    buyBlindName: string;
    buyBlindPriceEla: number;
    buyBlindPriceUsd: number;
    buyBlindAmount: number;
    buyBlindOrderIds: string[];
    buyBlindTokenIds: string[];
    buyBlindImages: string[];
    buyBlindTxFee: number;
    buyBlindTxHash: string;
    buyBlindCreator: string;
    buyBlindMaxPurchases: number;
    buyBlindInstock: number;
}

export const defaultDlgState: DlgState = {
    // manage profile
    manageProfileDlgOpened: false,
    // confirm transaction
    waitingConfirmDlgOpened: false,
    waitingConfirmDlgTimer: null,
    loadingDlgOpened: false,
    // error msg
    errorMessageDlgOpened: false,
    // all transactions
    allTxDlgOpened: false,
    // all bids
    allBidDlgOpened: false,
    noBidDlgOpened: false,
    // progress bar
    progressBar: 0,
    // mint nft
    createNFTDlgOpened: false,
    createNFTDlgStep: 0,
    mintTitle: '',
    mintCategory: { label: '', value: '' },
    mintIntroduction: '',
    mintFile: new File([''], ''),
    mintRoyalties: 0,
    mintTokenId: '',
    mintTokenUri: '',
    mintDidUri: '',
    mintTxHash: '',
    mintTxFee: 0,
    // create order for sale/auction
    sellSaleType: 'buynow',
    sellSaleEnds: { label: '', value: '' },
    sellPrice: 0,
    sellMinPrice: 0,
    sellTxHash: '',
    sellTxFee: 0,
    // buy now
    buyNowDlgOpened: false,
    buyNowDlgStep: 0,
    buyNowName: '',
    buyNowPrice: 0,
    buyNowTxHash: '',
    buyNowOrderId: '',
    buyNowTxFee: 0,
    // change price
    changePriceDlgOpened: false,
    changePriceDlgStep: 0,
    changePriceCurPrice: 0,
    changePriceOrderId: '',
    changePriceTxHash: '',
    changePriceTxFee: 0,
    // cancel sale
    cancelSaleDlgOpened: false,
    cancelSaleDlgStep: 0,
    cancelSaleOrderId: '',
    cancelSaleTxHash: '',
    cancelSaleTxFee: 0,
    // accept bid
    acceptBidDlgOpened: false,
    acceptBidDlgStep: 0,
    acceptBidName: '',
    acceptBidPrice: 0,
    acceptBidOrderId: '',
    acceptBidTxFee: 0,
    acceptBidTxHash: '',
    // place bid
    placeBidDlgOpened: false,
    placeBidDlgStep: 0,
    placeBidName: '',
    placeBidMinLimit: 0,
    placeBidAmount: 0,
    placeBidExpire: { label: '', value: '' },
    placeBidTxHash: '',
    placeBidTxFee: 0,
    placeBidOrderId: '',
    // update bid
    updateBidDlgOpened: false,
    updateBidDlgStep: 0,
    updateBidPrice: 0,
    updateBidOrderId: '',
    updateBidTxFee: 0,
    updateBidTxHash: '',
    // cancel bid
    cancelBidDlgOpened: false,
    cancelBidDlgStep: 0,
    cancelBidOrderId: '',
    cancelBidTxHash: '',
    cancelBidTxFee: 0,
    // create blind box
    createBlindBoxDlgOpened: false,
    createBlindBoxDlgStep: 0,
    crtBlindTitle: '',
    crtBlindDescription: '',
    crtBlindImage: new File([''], ''),
    crtBlindTokenIds: '',
    crtBlindTokenNames: '',
    crtBlindStatus: 'offline',
    crtBlindQuantity: 0,
    crtBlindPrice: 0,
    crtBlindSaleBegin: '',
    crtBlindSaleEnd: '',
    crtBlindPurchases: 0,
    crtBlindTxFee: 0,
    crtBlindTxHash: '',
    // buy blind box
    buyBlindBoxDlgOpened: false,
    buyBlindBoxDlgStep: 0,
    buyBlindBoxId: 0,
    buyBlindName: '',
    buyBlindPriceEla: 0,
    buyBlindPriceUsd: 0,
    buyBlindAmount: 0,
    buyBlindOrderIds: [],
    buyBlindTokenIds: [],
    buyBlindImages: [],
    buyBlindTxFee: 0,
    buyBlindTxHash: '',
    buyBlindCreator: '',
    buyBlindMaxPurchases: 0,
    buyBlindInstock: 0,
};

type ContextType<TValue> = [TValue, (newValue: TValue) => void];

const defaultContextValue: ContextType<DlgState> = [defaultDlgState, () => {}];

export const DialogContext = createContext(defaultContextValue);

export const DialogContextProvider: React.FC = ({ children, ...props }) => {
    const [contextState, setContextState] = useState<DlgState>(defaultDlgState);

    const ctxValue: ContextType<DlgState> = [
        contextState,
        (value: DlgState) => {
            setContextState(value);
        },
    ];

    return <DialogContext.Provider value={ctxValue}>{children}</DialogContext.Provider>;
};

export const useDialogContext = () => useContext(DialogContext);

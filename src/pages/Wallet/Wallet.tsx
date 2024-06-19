import useModal from "../../hooks/useModal.ts";
import {useEffect, useState} from "react";
import Button from "../../components/UI/Button/Button.tsx";
import AddInvestment from "../../components/Modals/AddInvestment/AddInvestment.tsx";
import {
    useAddWalletStocksMutation, useGetWalletByIdQuery,
    useGetWalletStocksQuery,
    useUpdateWalletStocksMutation
} from "../../store/api/walletApi.ts";
import {useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader.tsx";
import cl from './Wallet.module.scss';
import {WalletStockDto} from "../../models/response/WalletStockDto.ts";
import InvestmentTable from "../../components/InvestmentTable/InvestmentTable.tsx";
import WalletSettings from "../../components/Modals/WalletSettings/WalletSettings.tsx";
import Banner from "../../components/Banner/Banner.tsx";
import Recommendation from "../../components/Recommendation/Recommendation.tsx";

const Wallet = () => {
    const {id} = useParams();
    const {isOpen: addInvestmentModalOpen, openModal: addInvestOpenModal, closeModal: addInvestCloseModal} = useModal();
    const {
        isOpen: walletSettingsOpen,
        openModal: walletSettingsOpenModal,
        closeModal: walletSettingsCloseModal
    } = useModal();
    const {isOpen: recoOpen, openModal: recoOpenModal, closeModal: recoCloseModal} = useModal();
    const [selectionStocks, setSelectionStocks] = useState<number[]>([]);
    const {data: walletStocksData, isLoading: getWalletStocksLoading} = useGetWalletStocksQuery(parseInt(id!));
    const [addWalletStocks, {isLoading: addWalletStocksLoading}] = useAddWalletStocksMutation();
    const [walletStocks, setWalletStocks] = useState<WalletStockDto[]>([]);
    const [updateWalletStocks, {isLoading: updateWalletStocksLoading}] = useUpdateWalletStocksMutation();
    const {data: wallet, isLoading: walletLoading} = useGetWalletByIdQuery(parseInt(id!));
    useEffect(() => {
        if (walletStocksData) {
            setWalletStocks(walletStocksData);
        }
    }, [walletStocksData]);

    const handleAddInvestment = () => {
        addInvestOpenModal();
    };

    const handleAddInvestCloseModal = async () => {
        await addWalletStocks({walletId: parseInt(id!), stockIds: selectionStocks});
        addInvestCloseModal();
    };

    const handleWalletStockChange = (stockId: number, purchasePrice: number, quantity: number) => {
        setWalletStocks(prevWalletStocks =>
            prevWalletStocks.map(walletStock =>
                walletStock.stockId === stockId
                    ? {...walletStock, purchasePrice, quantity}
                    : walletStock
            )
        );
    };

    const handleDeleteWalletStock = (stockId: number) => {
        setWalletStocks(prevWalletStocks =>
            prevWalletStocks.filter(walletStock => walletStock.stockId !== stockId)
        );
    };

    const handleSubmit = async () => {
        await updateWalletStocks({walletStocks: walletStocks, walletId: parseInt(id!)});
    };

    if (getWalletStocksLoading || addWalletStocksLoading || updateWalletStocksLoading || walletLoading) {
        return <Loader/>;
    }

    return (
        <div>
            <Banner/>
            <div className={cl.wallet}>
                <h1>Кошелек {wallet?.name}</h1>
                <div className={cl.buttons}>
                    <Button onClick={handleAddInvestment}>
                        Добавить инвестиции
                    </Button>
                    <Button onClick={() => walletSettingsOpenModal()}>
                        Настройки кошелька
                    </Button>
                    <Button onClick={() => recoOpenModal()}>
                        Рекомендация
                    </Button>
                    <Button onClick={handleSubmit}>
                        Сохранить
                    </Button>
                </div>

                <InvestmentTable
                    walletStocks={walletStocks}
                    onChange={handleWalletStockChange}
                    onDelete={handleDeleteWalletStock}
                />

                <AddInvestment
                    isOpen={addInvestmentModalOpen}
                    closeModal={addInvestCloseModal}
                    setSelectionStocks={setSelectionStocks}
                    handleCloseModal={handleAddInvestCloseModal}
                    existIds={walletStocks?.map(x => x.stockId)}
                    walletId={wallet?.id}
                />

                <WalletSettings
                    walletId={wallet?.id}
                    isOpen={walletSettingsOpen}
                    onClose={walletSettingsCloseModal}
                    capital={wallet?.capital}
                    goalId={wallet?.goalId}
                    riskLevel={wallet?.riskLevel}
                    sharePurchaseLimit={wallet?.sharePurchaseLimit}
                />

                <Recommendation
                    walletId={wallet?.id}
                    isOpen={recoOpen}
                    onClose={recoCloseModal}
                />
            </div>
        </div>
    );
};

export default Wallet;

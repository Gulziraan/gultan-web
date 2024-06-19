import StockTable from "../../StockTable/StockTable.tsx";
import Button from "../../UI/Button/Button.tsx";
import {FC} from "react";
import cl from './AddInvestment.module.scss'
import Modal from "../../UI/Modal/Modal.tsx";

interface AddInvestmentProps {
    isOpen: boolean,
    closeModal: () => void,
    setSelectionStocks: (items: number[]) => void,
    handleCloseModal: () => void,
    existIds: number[] | undefined,
    walletId?: number
}

const AddInvestment:FC<AddInvestmentProps> = (
    {
        isOpen,
        closeModal,
        setSelectionStocks,
        handleCloseModal,
        existIds,
        walletId
    }) => {
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
        >
            <div className={cl.add}>
                <StockTable
                    checkboxSelection={true}
                    setSelectionItems={setSelectionStocks}
                    filterForTickers={existIds}
                    walletId={walletId}
                />
                <Button onClick={() => handleCloseModal()}>Добавить</Button>
            </div>
        </Modal>
    );
};

export default AddInvestment;
import Modal from "../../UI/Modal/Modal.tsx";
import {FC} from "react";
import cl from './SuccessAdded.module.scss'

interface SuccessAdded{
    open: boolean,
    onClose: () => void
}

const SuccessAdded:FC<SuccessAdded> = ({open, onClose}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className={cl.successAdded}>
                <h1>Кошелек успешно создан!</h1>
                <button onClick={onClose}>ok</button>
            </div>
        </Modal>
    );
};

export default SuccessAdded;
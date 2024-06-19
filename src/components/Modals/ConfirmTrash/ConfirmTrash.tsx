import Modal from "../../UI/Modal/Modal.tsx";
import Button from "../../UI/Button/Button.tsx";
import {FC} from "react";
import cl from './ConfirmTrash.module.scss'

interface ConfirmTrashProps {
    open: boolean,
    onClose: (decision: boolean) => void
}

const ConfirmTrash: FC<ConfirmTrashProps> = (
    {
        open,
        onClose
    }) => {
    return (
        <Modal
            open={open}
            onClose={() => onClose(false)}
        >
            <h1>Вы уверены что хотите удалить?</h1>
            <div className={cl.buttons}>
                <Button
                    onClick={() => onClose(false)}
                    style={{backgroundColor: 'red', marginRight: '50px'}}
                >
                    Отмена
                </Button>
                <Button onClick={() => onClose(true)}>Да</Button>
            </div>
        </Modal>
    );
};

export default ConfirmTrash;
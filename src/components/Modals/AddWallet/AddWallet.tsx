import {FC, useState} from "react";
import Input from "../../UI/Input/Input.tsx";
import Modal from "../../UI/Modal/Modal.tsx";
import Button from "../../UI/Button/Button.tsx";
import {useAddWalletMutation} from "../../../store/api/walletApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import cl from './AddWallet.module.scss'

interface AddWalletProps {
    open: boolean,
    onClose: () => void
}

const AddWallet:FC<AddWalletProps> = ({open, onClose}) => {
    const [name, setName] = useState('');
    const [addWallet, {isLoading, isSuccess}] = useAddWalletMutation();

    const handleSave = async () => {
        await addWallet(name);
    }

    if(isLoading) {
        return <Loader/>
    }

    if(isSuccess) {
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            padding={'10px'}
        >
            <div>
                <div className={cl.flex}>
                    <label htmlFor='name'>Название кошелька</label>
                    <Input id='name' value={name} onChange={event => setName(event.target.value)}/>
                </div>

                <Button onClick={handleSave}>Save</Button>
            </div>
        </Modal>
    );
};

export default AddWallet;
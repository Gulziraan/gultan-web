import cl from './Modal.module.scss'
import React from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    padding?: string
}

const Modal: React.FC<ModalProps> = (
    {
        open,
        onClose,
        children,
        padding
    }) => {
    if (!open) {
        return null;
    }

    return (
        <div className={cl.modalOverlay} onClick={onClose}>
            <div className={cl.modalContent} style={{padding: padding}} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

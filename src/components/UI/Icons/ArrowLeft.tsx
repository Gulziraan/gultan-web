import {FC} from "react";

interface Props {
    onClick: () => void
}

const ArrowLeft:FC<Props> = ({onClick}) => {
    return (
        <div onClick={onClick}>
            <svg
                style={{cursor: 'pointer'}}
                width="45" height="62"
                viewBox="0 0 130 147"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M129 145C-101.009 108.2 33.1628 34.3333 129 2" stroke="black" strokeWidth="3"/>
            </svg>
        </div>
    );
};

export default ArrowLeft;
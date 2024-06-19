import {FC} from "react";

interface Props {
    onClick: () => void
}

const ArrowRight: FC<Props> = ({onClick}) => {
    return (
        <div onClick={onClick}>
            <svg
                style={{cursor: 'pointer'}}
                width="45" height="62" viewBox="0 0 130 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2C231.009 38.8 96.8372 112.667 1 145" stroke="black" strokeWidth="3"/>
            </svg>
        </div>
    );
};

export default ArrowRight;
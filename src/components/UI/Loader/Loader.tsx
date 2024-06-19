import {CircularProgress} from "@mui/material";
import cl from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={cl.loaderOverlay}>
            <CircularProgress size='20rem'/>
        </div>
    );
};

export default Loader;
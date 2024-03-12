import {Box, CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
};

export default Loading;
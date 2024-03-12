import {styled} from "@mui/material";
import {LoadingButton as _LoadingButton} from "@mui/lab";
export const LoadingButton = styled(_LoadingButton)`
    padding: 0.6rem 0;
    background-color: #f9d13e;
    color: #2363eb;
    font-weight: 500;

    &:hover {
        background-color: #ebc22c;
        transform: translateY(-2px);
    }
`;
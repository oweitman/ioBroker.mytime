import React from 'react';
import { Box } from '@mui/material';

const styles = {
    header: theme => ({
        width: '100%',
        // background: theme.palette.primary.main,
        // color: theme.palette.primary.contrastText,
        padding: '4px !important',
        borderRadius: '3px',
        marginBlockEnd: '1em',
        marginBlockStart: '1em',
    }),
};
function Placeholder({ text }) {
    text = text || '';

    const result = (
        <Box
            component="div"
            sx={styles.header}
        >
            {text}
        </Box>
    );
    return result;
}
export default Placeholder;

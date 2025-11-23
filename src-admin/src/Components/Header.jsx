import React from 'react';
import { Box } from '@mui/material';
import { I18n } from '@iobroker/adapter-react-v5';

const styles = {
    header: theme => ({
        width: '99%',
        // background: theme.palette.primary.main,
        // color: theme.palette.primary.contrastText,
        padding: '4px !important',
        borderRadius: '3px',
        marginBlockEnd: '1em',
        marginBlockStart: '1em',
    }),
};
export function Header({ size, text, noTranslate }) {
    noTranslate = noTranslate || false;
    text = text || '';
    text = noTranslate ? text : I18n.t(text);
    let result;
    switch ((size || 5).toString()) {
        case '1':
            result = (
                <Box
                    component="h1"
                    sx={styles.header}
                >
                    {text}
                </Box>
            );
            break;
        case '2':
            result = (
                <Box
                    component="h2"
                    sx={styles.header}
                >
                    {text}
                </Box>
            );
            break;
        case '3':
            result = (
                <Box
                    component="h3"
                    sx={styles.header}
                >
                    {text}
                </Box>
            );
            break;
        case '4':
            result = (
                <Box
                    component="h4"
                    sx={styles.header}
                >
                    {text}
                </Box>
            );
            break;
        case '5':
        default:
            result = (
                <Box
                    component="h5"
                    sx={styles.header}
                >
                    {text}
                </Box>
            );
    }
    return result;
}
export default Header;

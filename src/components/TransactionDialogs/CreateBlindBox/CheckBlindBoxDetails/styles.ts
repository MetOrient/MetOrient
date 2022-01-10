import { makeStyles } from '@mui/styles';
import { styled, Stack } from '@mui/material';

export const useStyles = makeStyles((theme: any) => ({
    container: {
        '&::-webkit-scrollbar': {
            width: 36,
        },
        '&::-webkit-scrollbar-thumb': {
            border: '14px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            borderRadius: '9999px',
            backgroundColor: '#AAAAAA',
        },
    },
}));

export const InfoItemWrapper = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '>:first-child': {
        maxWidth: '35%',
    },
    '>:last-child': {
        maxWidth: '60%',
    },
});

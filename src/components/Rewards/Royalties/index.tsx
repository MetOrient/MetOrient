import React from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import ClaimBox from '../ClaimBox';
import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Royalties: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box borderRadius={3} paddingX={{ xs: 4, md: 8 }} paddingY={{ xs: 4, md: 7 }} sx={{ background: '#E8F4FF' }}>
            <Grid container columns={10} columnSpacing={8} rowGap={2.5}>
                <Grid item xs={10} md={6}>
                    <Stack
                        direction={{ xs: 'row', md: 'column' }}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        spacing={{ xs: 0.5, md: 0 }}
                    >
                        <img
                            src="/assets/images/rewards/royalties-icon.svg"
                            width={matchDownMd ? 26 : 42}
                            height={matchDownMd ? 26 : 42}
                            alt=""
                        />
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography fontSize={{ xs: 20, md: 40 }} fontWeight={500} color="#1890FF">
                                Royalties
                            </Typography>
                            <Icon
                                icon="ph:question"
                                fontSize={18}
                                color="#1890FF"
                                style={{ marginTop: matchDownMd ? 2 : 14 }}
                            />
                        </Stack>
                    </Stack>
                    <Typography fontSize={16} fontWeight={500} color="#1890FF" marginTop={1}>
                        The minted NFT project can obtain tokens (per transaction) on the following basis:
                    </Typography>
                    <Typography fontSize={16} fontWeight={500} color="#1890FF" marginTop={2}>
                        Tokens to be Received = [(#Td/TTVd) X NFT Transaction Volume X 0.4].
                    </Typography>
                </Grid>
                <Grid item xs={10} md={4}>
                    <Typography fontSize={20} fontWeight={500} color="#1890FF">
                        MET{' '}
                        <Typography fontSize={20} fontWeight={500} color="black" display="inline">
                            to be claimed
                        </Typography>
                    </Typography>
                    <ClaimBox sx={{ marginTop: 1.5 }} />
                    <Typography fontSize={14} fontWeight={500} color="#1890FF" lineHeight={1.2} marginTop={2.5}>
                        Users can claim rewards every day, or accumulate a one-time claim. Rewards never disappear or
                        expire.
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" marginTop={2}>
                        <Typography fontSize={14} fontWeight={500} color="#1890FF">
                            The most recent receipt received:
                        </Typography>
                        <Typography fontSize={14} fontWeight={500} color="#1890FF">
                            --
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" marginTop={0.5}>
                        <Typography fontSize={14} fontWeight={500} color="#1890FF">
                            Received so far:
                        </Typography>
                        <Typography fontSize={14} fontWeight={500} color="#1890FF">
                            --
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Royalties;

import React from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import { enumBadgeType } from 'src/types/product-types';
import ProductPageHeader from 'src/components/ProductPageHeader';
import ProductImageContainer from 'src/components/ProductImageContainer';
import ProductSnippets from 'src/components/ProductSnippets';
import ProductBadge from 'src/components/ProductBadge';
import ELAPrice from 'src/components/ELAPrice';
import { PrimaryButton } from 'src/components/Buttons/styles';
import SingleNFTMoreInfo from 'src/components/SingleNFTMoreInfo';

const SingleNFTAuction: React.FC = (): JSX.Element => {
    return (
        <>
            <ProductPageHeader />
            <Grid container marginTop={5} columnSpacing={5}>
                <Grid item xs={6}>
                    <ProductImageContainer imgurl={'/assets/images/explore/singlenft-template1.png'} />
                </Grid>
                <Grid item xs={6}>
                    <Typography fontSize={56} fontWeight={700}>
                        Sculpting with the Heart
                    </Typography>
                    <ProductSnippets sold={24} instock={200} likes={88} views={4800} />
                    <Stack direction="row" alignItems="center" spacing={1} marginTop={3}>
                        <ProductBadge badgeType={enumBadgeType.OnAuction} />
                        <ProductBadge badgeType={enumBadgeType.ReservePriceNotMet} />
                        <ProductBadge badgeType={enumBadgeType.SaleEnds} content={`2022/02/28  10:00`} />
                    </Stack>
                    <ELAPrice ela_price={199} usd_price={480} marginTop={3} />
                    <PrimaryButton sx={{ marginTop: 3, width: '100%' }}>Place Bid</PrimaryButton>
                </Grid>
            </Grid>
            <Grid container marginTop={5} columnSpacing={5}>
                <Grid item xs={4}>
                    <SingleNFTMoreInfo vertically />
                </Grid>
            </Grid>
        </>
    );
};

export default SingleNFTAuction;

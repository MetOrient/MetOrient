import React from 'react';
import { Link } from 'react-router-dom';
import { TypeProduct } from 'src/types/product-types';
import { ProductImageContainer, LikeBtn } from './styles';
import { Box, Stack, Typography } from '@mui/material';
import ProductBadgeContainer from '../ProductBadgeContainer';
import { Icon } from '@iconify/react';
import ELAPrice from 'src/components/ELAPrice';

export interface BlindBoxGalleryItemProps {
    product: TypeProduct;
    onlyShowImage?: boolean;
}

const BlindBoxGalleryItem: React.FC<BlindBoxGalleryItemProps> = ({ product, onlyShowImage = false }): JSX.Element => {
    return (
        <Box>
            <Link to={`/blind-box/product/${product.id}`}>
                <ProductImageContainer onlyShowImage={onlyShowImage}>
                    <img src={product.image} alt="" />
                    {!onlyShowImage && (
                        <LikeBtn>
                            <Icon icon="ph:heart" fontSize={20} color="black" />
                        </LikeBtn>
                    )}
                </ProductImageContainer>
            </Link>
            {!onlyShowImage && (
                <Stack spacing={1}>
                    <Typography fontWeight={700} fontSize={{ xs: 16, lg: 32 }}>
                        {product.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} display={{ xs: 'none', lg: 'flex' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Icon icon="ph:handshake" />
                            <Typography fontWeight={500} fontSize={12}>{`24 sold`}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Icon icon="ph:heart" />
                            <Typography fontWeight={500} fontSize={12}>{`${product.likes} likes`}</Typography>
                        </Stack>
                    </Stack>
                    <ProductBadgeContainer nfttype={product.type} content={product.saleTime} />
                    <ELAPrice ela_price={199} usd_price={480} />
                </Stack>
            )}
        </Box>
    );
};

export default BlindBoxGalleryItem;

import styled from '@emotion/styled';
import React from 'react';
import type { Product } from '../types/product';

const Card = styled.article(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));


interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = () => {

    return (
        <Card>
            this is dummy product card component
        </Card>
    );
};

export default ProductCard;

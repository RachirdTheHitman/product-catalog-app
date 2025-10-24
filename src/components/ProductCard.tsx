import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatPrice, truncateText } from '../utils/helpers';

const Card = styled.article(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

    '&:hover': {
        boxShadow: theme.shadows.lg,
    },
}));

const ImageLink = styled(Link)({
    display: 'block',
    aspectRatio: '1',
    overflow: 'hidden',
    backgroundColor: '#fff',
});

const ProductImage = styled.img(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: theme.spacing.lg,
}));

const CardBody = styled.div(({ theme }) => ({
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));

const Category = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.xs,
    textTransform: 'uppercase',
    color: theme.colors.gray[500],
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: '0.05em',
    marginBottom: theme.spacing.xs,
}));

const Title = styled(Link)(({ theme }) => ({
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
    textDecoration: 'none',
    display: 'block',
}));

const Description = styled.p(({ theme }) => ({
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
    lineHeight: 1.6,
    flex: 1,
}));

const RatingContainer = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
}));

const StarIcon = styled(Star)({
    width: '1rem',
    height: '1rem',
    fill: '#fbbf24',
    color: '#fbbf24',
});

const RatingText = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
}));

const Footer = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
}));

const Price = styled.span(({ theme }) => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
}));

const AddButton = styled.button(({ theme }) => ({
    minWidth: 'fit-content',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: theme.colors.primaryHover,
    },

    '&:focus': {
        outline: `2px solid ${theme.colors.primary}`,
        outlineOffset: '2px',
    },
}));

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Card>
            <ImageLink to={`/product/${product.id}`}>
                <ProductImage src={product.image} alt={product.title} loading="lazy" />
            </ImageLink>
            <CardBody>
                <Category>{product.category}</Category>
                <Title to={`/product/${product.id}`}>{truncateText(product.title, 60)}</Title>
                <Description>{truncateText(product.description, 100)}</Description>
                <RatingContainer>
                    <StarIcon aria-hidden="true" />
                    <RatingText>
                        {product.rating.rate} ({product.rating.count} reviews)
                    </RatingText>
                </RatingContainer>
                <Footer>
                    <Price>{formatPrice(product.price)}</Price>
                    <AddButton onClick={handleAddToCart}>
                        <ShoppingCart size={18} aria-hidden="true" />
                        Add to Cart
                    </AddButton>
                </Footer>
            </CardBody>
        </Card>
    );
};

export default ProductCard;

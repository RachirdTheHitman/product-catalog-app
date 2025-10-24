import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Container = styled.div(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.md}`,
}));

const BackLink = styled(Link)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    color: theme.colors.primary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.lg,
    textDecoration: 'none',

    '&:hover': {
        textDecoration: 'underline',
    },
}));

const DetailContainer = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing['2xl'],

    [`@media (min-width: ${theme.breakpoints.md})`]: {
        gridTemplateColumns: '1fr 1fr',
    },
}));

const ImageContainer = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing['2xl'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows.md,
}));

const ProductImage = styled.img({
    maxWidth: '100%',
    maxHeight: '500px',
    objectFit: 'contain',
});

const InfoContainer = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
}));

const Category = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.sm,
    textTransform: 'uppercase',
    color: theme.colors.gray[500],
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: '0.05em',
}));

const Title = styled.h1(({ theme }) => ({
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    lineHeight: 1.2,
}));

const RatingContainer = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
}));

const StarIcon = styled(Star)({
    width: '1.25rem',
    height: '1.25rem',
    fill: '#fbbf24',
    color: '#fbbf24',
});

const RatingText = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[600],
}));

const Price = styled.div(({ theme }) => ({
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
}));

const Description = styled.p(({ theme }) => ({
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[700],
    lineHeight: 1.7,
}));

const AddButton = styled.button(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.lg,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    transition: 'background-color 0.2s',
    width: '100%',

    '&:hover': {
        backgroundColor: theme.colors.primaryHover,
    },

    '&:focus': {
        outline: `2px solid ${theme.colors.primary}`,
        outlineOffset: '2px',
    },

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
        width: 'auto',
    },
}));

const SuccessMessage = styled.div(({ theme }) => ({
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
}));

const LoadingContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
});

const LoadingContent = styled.div({
    textAlign: 'center',
});

const SpinnerIcon = styled(Loader2)(({ theme }) => ({
    width: '3rem',
    height: '3rem',
    color: theme.colors.primary,
    margin: `0 auto ${theme.spacing.md}`,
    animation: 'spin 1s linear infinite',

    '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
}));

const LoadingText = styled.p(({ theme }) => ({
    color: theme.colors.gray[600],
    fontSize: theme.fontSize.lg,
}));

const ErrorContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
});

const ErrorContent = styled.div(({ theme }) => ({
    textAlign: 'center',
    color: theme.colors.red[600],
}));

const ErrorIcon = styled(AlertCircle)(({ theme }) => ({
    width: '3rem',
    height: '3rem',
    margin: `0 auto ${theme.spacing.md}`,
}));

const ErrorText = styled.p(({ theme }) => ({
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
}));

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await api.getProduct(parseInt(id));
                setProduct(data);
                setError(null);
            } catch (err) {
                setError('Failed to load product details. Please try again later.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    if (loading) {
        return (
            <LoadingContainer role="status">
                <LoadingContent>
                    <SpinnerIcon aria-hidden="true" />
                    <LoadingText>Loading product details...</LoadingText>
                </LoadingContent>
            </LoadingContainer>
        );
    }

    if (error || !product) {
        return (
            <ErrorContainer role="alert">
                <ErrorContent>
                    <ErrorIcon aria-hidden="true" />
                    <ErrorText>{error || 'Product not found'}</ErrorText>
                </ErrorContent>
            </ErrorContainer>
        );
    }

    return (
        <Container>
            <BackLink to="/" aria-label="Back to product catalog">
                <ArrowLeft size={20} aria-hidden="true" />
                Back to Catalog
            </BackLink>

            <DetailContainer>
                <ImageContainer>
                    <ProductImage src={product.image} alt={product.title} />
                </ImageContainer>

                <InfoContainer>
                    <Category>{product.category}</Category>
                    <Title>{product.title}</Title>

                    <RatingContainer>
                        <StarIcon aria-hidden="true" />
                        <RatingText>
                            {product.rating.rate} ({product.rating.count} reviews)
                        </RatingText>
                    </RatingContainer>

                    <Price>{formatPrice(product.price)}</Price>

                    <Description>{product.description}</Description>

                    <AddButton onClick={handleAddToCart}>
                        <ShoppingCart size={24} aria-hidden="true" />
                        Add to Cart
                    </AddButton>

                    {showSuccess && (
                        <SuccessMessage role="status">
                            Product added to cart successfully!
                        </SuccessMessage>
                    )}
                </InfoContainer>
            </DetailContainer>
        </Container>
    );
};

export default ProductDetail;

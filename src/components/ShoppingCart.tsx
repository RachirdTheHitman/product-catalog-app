import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
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

const Title = styled.h1(({ theme }) => ({
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.xl,
}));

const EmptyCart = styled.div(({ theme }) => ({
    textAlign: 'center',
    padding: `${theme.spacing['3xl']} 0`,
}));

const EmptyText = styled.p(({ theme }) => ({
    fontSize: theme.fontSize.lg,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.lg,
}));

const ShopButton = styled(Link)(({ theme }) => ({
    display: 'inline-block',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.fontWeight.semibold,
    textDecoration: 'none',

    '&:hover': {
        backgroundColor: theme.colors.primaryHover,
    },
}));

const CartContent = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing.xl,

    [`@media (min-width: ${theme.breakpoints.lg})`]: {
        gridTemplateColumns: '2fr 1fr',
    },
}));

const ItemsList = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
}));

const CartItem = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.sm,
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gap: theme.spacing.lg,

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
        gridTemplateColumns: '120px 1fr',
    },
}));

const ItemImage = styled.img(({ theme }) => ({
    width: '100%',
    height: '120px',
    objectFit: 'contain',
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.sm,
}));

const ItemDetails = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const ItemHeader = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
});

const ItemInfo = styled.div({
    flex: 1,
});

const ItemTitle = styled.h3(({ theme }) => ({
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.xs,
}));

const ItemCategory = styled.p(({ theme }) => ({
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    textTransform: 'capitalize',
}));

const RemoveButton = styled.button(({ theme }) => ({
    color: theme.colors.red[600],
    padding: theme.spacing.sm,
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: theme.colors.gray[100],
    },
}));

const ItemFooter = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const QuantityContainer = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    border: `1px solid ${theme.colors.gray[300]}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
}));

const QuantityButton = styled.button(({ theme }) => ({
    padding: theme.spacing.xs,
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.gray[600],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,

    '&:hover': {
        backgroundColor: theme.colors.gray[100],
    },

    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
}));

const Quantity = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    minWidth: '2rem',
    textAlign: 'center',
}));

const ItemPrice = styled.span(({ theme }) => ({
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
}));

const Summary = styled.div(({ theme }) => ({
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    boxShadow: theme.shadows.md,
    height: 'fit-content',
    position: 'sticky',
    top: `calc(64px + ${theme.spacing.md})`,
}));

const SummaryTitle = styled.h2(({ theme }) => ({
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.lg,
}));

const SummaryRow = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[700],
}));

const TotalRow = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTop: `2px solid ${theme.colors.gray[200]}`,
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
}));

const CheckoutButton = styled.button(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.lg,
    border: 'none',
    cursor: 'pointer',
    marginTop: theme.spacing.lg,

    '&:hover': {
        backgroundColor: theme.colors.primaryHover,
    },
}));

const ShoppingCart: React.FC = () => {
    const { items, removeFromCart, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <Container>
                <Title>Shopping Cart</Title>
                <EmptyCart>
                    <EmptyText>Your cart is empty</EmptyText>
                    <ShopButton to="/">Continue Shopping</ShopButton>
                </EmptyCart>
            </Container>
        );
    }

    return (
        <Container>
            <BackLink to="/">
                <ArrowLeft size={20} aria-hidden="true" />
                Continue Shopping
            </BackLink>

            <Title>
                Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </Title>

            <CartContent>
                <ItemsList role="list">
                    {items.map((item) => (
                        <CartItem key={item.id} role="listitem">
                            <ItemImage src={item.image} alt={item.title} />
                            <ItemDetails>
                                <ItemHeader>
                                    <ItemInfo>
                                        <ItemTitle>{item.title}</ItemTitle>
                                        <ItemCategory>{item.category}</ItemCategory>
                                    </ItemInfo>
                                    <RemoveButton
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={20} aria-hidden="true" />
                                    </RemoveButton>
                                </ItemHeader>

                                <ItemFooter>
                                    <QuantityContainer>
                                        <QuantityButton
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} aria-hidden="true" />
                                        </QuantityButton>
                                        <Quantity>
                                            {item.quantity}
                                        </Quantity>
                                        <QuantityButton
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={16} aria-hidden="true" />
                                        </QuantityButton>
                                    </QuantityContainer>

                                    <ItemPrice>{formatPrice(item.price * item.quantity)}</ItemPrice>
                                </ItemFooter>
                            </ItemDetails>
                        </CartItem>
                    ))}
                </ItemsList>

                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryRow>
                        <span>Subtotal:</span>
                        <span>{formatPrice(total)}</span>
                    </SummaryRow>
                    <SummaryRow>
                        <span>Shipping:</span>
                        <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
                    </SummaryRow>
                    <TotalRow>
                        <span>Total:</span>
                        <span>{formatPrice(total)}</span>
                    </TotalRow>
                    <CheckoutButton aria-label="Proceed to checkout">Proceed to Checkout</CheckoutButton>
                </Summary>
            </CartContent>
        </Container>
    );
};

export default ShoppingCart;

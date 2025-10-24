import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header(({ theme }) => ({
    backgroundColor: theme.colors.white,
    boxShadow: theme.shadows.md,
    position: 'sticky',
    top: 0,
    zIndex: 50,
}));

const Nav = styled.nav(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const Logo = styled(Link)(({ theme }) => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    textDecoration: 'none',

    '&:hover': {
        color: theme.colors.primaryHover,
    },
}));

const CartButton = styled(Link)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing.sm,
    color: theme.colors.gray[700],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    textDecoration: 'none',
    borderRadius: theme.borderRadius.md,
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: theme.colors.gray[100],
    },
}));

const CartBadge = styled.span(({ theme }) => ({
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: '100%',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    padding: `0 ${theme.spacing.xs}`,
}));

const Header: React.FC = () => {
    const { itemCount } = useCart();

    return (
        <HeaderContainer>
            <Nav role="navigation" aria-label="Main navigation">
                <Logo to="/">Product Catalog</Logo>
                <CartButton to="/cart">
                    <ShoppingCart size={24} aria-hidden="true" />
                    {itemCount > 0 && (
                        <CartBadge>
                            {itemCount}
                        </CartBadge>
                    )}
                </CartButton>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;

import styled from '@emotion/styled';
import React from 'react';

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

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Nav role="navigation" aria-label="Main navigation">
                this is dummy header component
            </Nav>
        </HeaderContainer>
    );
};

export default Header;

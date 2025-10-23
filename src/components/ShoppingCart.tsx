import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.md}`,
}));

const ShoppingCart: React.FC = () => {
    return (
        <Container>
            shopping cat component
        </Container>
    );
};

export default ShoppingCart;

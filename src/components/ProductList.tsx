import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.md}`,
}));


const ProductList: React.FC = () => {
    return (
        <Container>
            dummy product list component
        </Container>
    );
};

export default ProductList;

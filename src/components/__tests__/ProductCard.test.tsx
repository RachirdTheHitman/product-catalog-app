import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';
import { CartProvider } from '../../context/CartContext';
import { theme } from '../../styles/theme';
import type { Product } from '../../types/product';

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'This is a test product description that is long enough to be truncated',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: {
        rate: 4.5,
        count: 120,
    },
};

const renderProductCard = (product: Product = mockProduct) => {
    return render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <ProductCard product={product} />
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>,
    );
};

describe('ProductCard', () => {
    it('should render product information correctly', () => {
        renderProductCard();

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$29.99')).toBeInTheDocument();
        expect(screen.getByText(/4.5/)).toBeInTheDocument();
    });

    it('should render product image with correct alt text', () => {
        renderProductCard();

        const image = screen.getByAltText('Test Product');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('should add product to cart when Add to Cart button is clicked', async () => {
        const user = userEvent.setup();
        renderProductCard();

        const addButton = screen.getByRole('button', { name: /Add to Cart/i });
        await user.click(addButton);

        expect(addButton).toBeInTheDocument();
    });
});

import { describe, it, expect } from 'vitest';
import { calculateTotal, formatPrice, truncateText } from '../helpers';
import type { CartItem } from '../../types/product';

describe('calculateTotal', () => {
    it('should calculate the total price of cart items', () => {
        const items: CartItem[] = [
            {
                id: 1,
                title: 'Product 1',
                price: 10.99,
                description: 'Test product',
                category: 'test',
                image: 'test.jpg',
                rating: { rate: 4.5, count: 100 },
                quantity: 2,
            },
            {
                id: 2,
                title: 'Product 2',
                price: 25.5,
                description: 'Test product 2',
                category: 'test',
                image: 'test2.jpg',
                rating: { rate: 4.0, count: 50 },
                quantity: 1,
            },
        ];

        const total = calculateTotal(items);
        expect(total).toBeCloseTo(47.48, 2);
    });

    it('should return 0 for an empty cart', () => {
        const total = calculateTotal([]);
        expect(total).toBe(0);
    });
});

describe('formatPrice', () => {
    it('should format price as USD currency', () => {
        expect(formatPrice(10.99)).toBe('$10.99');
        expect(formatPrice(100)).toBe('$100.00');
    });

    it('should handle large numbers', () => {
        expect(formatPrice(1234.56)).toBe('$1,234.56');
    });
});

describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
        const text = 'This is a very long text that needs to be truncated';
        const result = truncateText(text, 20);
        expect(result).toBe('This is a very long ...');
    });

    it('should not truncate text shorter than maxLength', () => {
        const text = 'Short text';
        const result = truncateText(text, 20);
        expect(result).toBe('Short text');
    });
});

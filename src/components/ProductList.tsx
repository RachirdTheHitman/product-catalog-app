import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

const Container = styled.div(({ theme }) => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.md}`,
}));

const Header = styled.header(({ theme }) => ({
    marginBottom: theme.spacing.xl,
}));

const Title = styled.h1(({ theme }) => ({
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.lg,
}));

const FilterContainer = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,

    [`@media (min-width: ${theme.breakpoints.md})`]: {
        flexDirection: 'row',
    },
}));

const SearchContainer = styled.div({
    flex: 1,
    position: 'relative',
});

const SearchIcon = styled(Search)(({ theme }) => ({
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.colors.gray[400],
    width: '1.25rem',
    height: '1.25rem',
    pointerEvents: 'none',
}));

const SearchInput = styled.input(({ theme }) => ({
    width: '100%',
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    paddingLeft: '2.5rem',
    border: `1px solid ${theme.colors.gray[300]}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.fontSize.base,

    '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary,
        boxShadow: `0 0 0 3px ${theme.colors.primary}33`,
    },
}));

const SelectContainer = styled.div(({ theme }) => ({
    [`@media (min-width: ${theme.breakpoints.md})`]: {
        width: '16rem',
    },
}));

const Select = styled.select(({ theme }) => ({
    width: '100%',
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    border: `1px solid ${theme.colors.gray[300]}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.fontSize.base,
    backgroundColor: theme.colors.white,

    '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary,
        boxShadow: `0 0 0 3px ${theme.colors.primary}33`,
    },
}));

const ResultsCount = styled.div(({ theme }) => ({
    color: theme.colors.gray[600],
    fontSize: theme.fontSize.base,
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

const NoResults = styled.div(({ theme }) => ({
    textAlign: 'center',
    padding: `${theme.spacing['3xl']} 0`,
}));

const NoResultsText = styled.p(({ theme }) => ({
    color: theme.colors.gray[600],
    fontSize: theme.fontSize.lg,
}));

const ProductGrid = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing.lg,

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (min-width: ${theme.breakpoints.lg})`]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [`@media (min-width: ${theme.breakpoints.xl})`]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
}));

const ScreenReaderOnly = styled.label({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
});

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    api.getProducts(),
                    api.getCategories(),
                ]);
                setProducts(productsData);
                setFilteredProducts(productsData);
                setCategories(categoriesData);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let result = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter((product) => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    if (loading) {
        return (
            <LoadingContainer role="status">
                <LoadingContent>
                    <SpinnerIcon aria-hidden="true" />
                    <LoadingText>Loading products...</LoadingText>
                </LoadingContent>
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <ErrorContainer role="alert">
                <ErrorContent>
                    <ErrorIcon aria-hidden="true" />
                    <ErrorText>{error}</ErrorText>
                </ErrorContent>
            </ErrorContainer>
        );
    }

    return (
        <Container>
            <Header>
                <Title>Product Catalog</Title>

                <FilterContainer>
                    <SearchContainer>
                        <ScreenReaderOnly htmlFor="search">Search products</ScreenReaderOnly>
                        <SearchIcon aria-hidden="true" />
                        <SearchInput
                            id="search"
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchContainer>

                    <SelectContainer>
                        <ScreenReaderOnly htmlFor="category">Filter by category</ScreenReaderOnly>
                        <Select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </Select>
                    </SelectContainer>
                </FilterContainer>

                <ResultsCount>
                    Showing {filteredProducts.length} of {products.length} products
                </ResultsCount>
            </Header>

            {filteredProducts.length === 0 ? (
                <NoResults role="status">
                    <NoResultsText>No products found matching your criteria.</NoResultsText>
                </NoResults>
            ) : (
                <ProductGrid role="list">
                    {filteredProducts.map((product) => (
                        <div key={product.id} role="listitem">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </ProductGrid>
            )}
        </Container>
    );
};

export default ProductList;

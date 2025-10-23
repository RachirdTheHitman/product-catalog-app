import React, { type ReactNode } from 'react';
import styled from '@emotion/styled';
import Header from './Header';

const LayoutContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

const Main = styled.main({
    flex: 1,
});

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <LayoutContainer>
            <Header />
            <Main>{children}</Main>
        </LayoutContainer>
    );
};

export default Layout;

import { Global } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        minWidth: '320px',
        minHeight: '100vh',
        backgroundColor: theme.colors.gray[50],
        color: theme.colors.gray[800],
      },
      '#root': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      button: {
        fontFamily: 'inherit',
        cursor: 'pointer',
      },
      'input, select': {
        fontFamily: 'inherit',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
      },
      '*:focus-visible': {
        outline: `2px solid ${theme.colors.primary}`,
        outlineOffset: '2px',
      },
    }}
  />
);

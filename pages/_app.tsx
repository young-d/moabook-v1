import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SpendingProvider from '@contexts/SpendingProvider';
import styled from '@emotion/styled';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SpendingProvider>
      <RootContainer>
        <Component {...pageProps} />
      </RootContainer>
    </SpendingProvider>
  );
}

const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #085ff3;
`;

export default MyApp;

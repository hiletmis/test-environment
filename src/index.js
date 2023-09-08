import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import {
  arbitrumGoerli,
  avalancheFuji,
  bscTestnet,
  fantomTestnet,
  gnosisChiado,
  moonbaseAlpha,
  optimismGoerli,
  polygonMumbai,
  polygonZkEvmTestnet,
  zkSyncTestnet
} from 'wagmi/chains';

import { sepolia } from './data/chains';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrumGoerli, avalancheFuji, bscTestnet, sepolia, fantomTestnet, gnosisChiado, moonbaseAlpha, optimismGoerli, polygonMumbai, polygonZkEvmTestnet, zkSyncTestnet
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: String(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID),
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={lightTheme({
            fontStack: 'system',
            overlayBlur: 'large',
            borderRadius: 'large',
          })}
        >
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

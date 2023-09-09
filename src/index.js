import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { walletConnectWallet, metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
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

const projectId = String(process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID)

const connectors = connectorsForWallets([
  {
    groupName: 'Other',
    wallets: [
      injectedWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
    ],
  },
]);

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

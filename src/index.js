import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import { arbitrumGoerli, avalancheFuji, bscTestnet, sepolia, fantomTestnet, gnosisChiado, moonbeam, optimismGoerli, polygonMumbai, polygonZkEvmTestnet, zkSyncTestnet, hardhat } from './data/chains';

const { chains, provider } = configureChains([arbitrumGoerli, avalancheFuji, bscTestnet, sepolia, fantomTestnet, gnosisChiado, moonbeam, optimismGoerli, polygonMumbai, polygonZkEvmTestnet, zkSyncTestnet, hardhat], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
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

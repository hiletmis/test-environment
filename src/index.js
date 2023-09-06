import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';

const sepolia2 = {
  id: 11155111,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "SEP",
      decimals: 18,
 },
  rpcUrls: {
      default: {
          http:  ["https://rpc.notadegen.com/eth/sepolia"],
     }
 },
  blockExplorers: {
      etherscan: {
          name: "Sepolia Scan",
          url: "https://sepolia.etherscan.io/",
     },
      default: {
          name: "Sepolia Scan",
          url: "https://sepolia.etherscan.io/",
     },
 },
  contracts: {
      multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 6507670,
     },
 },
  testnet: true,
};

const { chains, provider } = configureChains([sepolia2], [publicProvider()]);

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

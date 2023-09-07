import './App.css';
import Header from './Components/Header';
import DeployProxy from './Components/DeployProxy';
import Prepayment from './Components/Prepayment';
import DeployMulticall from './Components/Multicall';
import { COLORS } from './data/colors';

import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

const modifiedTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: props.colorMode === 'dark' ? COLORS.bg : 'white',
      },
    }),
  },
  shadows: {
    whiteShadow: '0px 30px 90px rgba(255, 255, 255, 0.12)',
  },
});

function App() {
  return (
    <ChakraProvider theme={modifiedTheme}>
        <Router>
        <div className="App" >
        <Header />

        <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
        <Flex>
          <Routes>
            <Route path="/" element={<DeployProxy />} />
            <Route path="deposit" element={<Prepayment />} />
            <Route path="multicall" element={<DeployMulticall />} />
          </Routes>

        </Flex>    
        </div>
      </div>
        </Router>
    </ChakraProvider>
  );
}

export default App;

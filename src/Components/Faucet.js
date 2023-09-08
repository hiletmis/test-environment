import React, { useState, useEffect } from "react";
import { Grid } from 'react-loader-spinner'

import {
  Button, Heading,
  VStack, Text, Box, Flex, Spacer, Image
} from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper
  } from '@chakra-ui/react'
  import { CloseIcon } from '@chakra-ui/icons'
import { ethers } from "ethers";
import { useBalance, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

import { TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../data/abi";

import { COLORS } from '../data/colors';

const Hero = ({stateChanger}) => {
  const { address } = useAccount()

  const [ethAmount, setEthAmount] = useState("");
  const [ethPrice, setEthPrice] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [data_, setData] = useState("");
  const [signedMessage, setSignedMessage] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [items, setItems] = useState([]);
  const [refreshBalance, setRefreshBalance] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

const fetchETHBalance_ = useBalance({
  address: address,
  chainId: 11155111,
})

useEffect(() => {
  if (fetchETHBalance_.data != null) {
    setEthBalance(fetchETHBalance_.data.formatted)
  }
}, [fetchETHBalance_]);

const balance = useBalance({
  address: address,
  token: TOKEN_CONTRACT_ADDRESS,
  chainId: 11155111,
  enabled: refreshBalance,
})

useEffect(() => {
  if (balance.data != null) {
    setTokenBalance(balance?.data.formatted)
  }
}, [balance]);

  useEffect(() => {
    if (!ethAmount || isNaN(parseFloat(ethAmount))) return;
    if (ethAmount <= 0) return;
    if (ethAmount) {
      fetch("https://pool.nodary.io/0xc52EeA00154B4fF1EbbF8Ba39FDe37F1AC3B9Fd4")
        .then((response) => response.json())
        .then((data) => {
          if (data.count > 0) {
            const hashKey = "0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d";
            const beaconData = data.data[hashKey];

            if (beaconData) {
              const decodedValue = ethers.utils.defaultAbiCoder.decode(
                ["int256"],
                beaconData.encodedValue
              );
              setEthPrice(decodedValue);
              setTimestamp(beaconData.timestamp);
              setSignedMessage(beaconData.signature);
              setData(beaconData.encodedValue);
            } else {
              console.log("No data found for the specified hashKey");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [ethAmount]);

  const calculateAmountValue = () => {
    if (!ethAmount || isNaN(parseFloat(ethAmount))) return 0;
    if (ethPrice && ethAmount) {
      return ((ethPrice * ethAmount) / 1e18).toFixed(2);
    }
    return "0";
  };

  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'mint',
    chainId: 11155111,
    enabled: timestamp && data_ && signedMessage && !isNaN(parseFloat(ethAmount)) && parseFloat(ethAmount) > 0,
    args: [timestamp, data_, signedMessage],
    value: (!ethAmount || isNaN(parseFloat(ethAmount))) ? 0 : ethers.utils.parseEther(ethAmount),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const mintTokens = async () => {
    setIsMinting(true)
  };

  useEffect(() => {
    if (!timestamp || !data_ || !signedMessage || isNaN(parseFloat(ethAmount)) || parseFloat(ethAmount) <= 0) return
    if (write == null || write === undefined) return
    
    if (isMinting) {
      setIsMinting(false)
      write?.()
    }
  }, [data_, ethAmount, isMinting, signedMessage, timestamp, write]);

  useEffect(() => { 
    if (isSuccess) {
      localStorage.setItem('items', JSON.stringify(items));
        setEthAmount("");
        setRefreshBalance(true)
    }
    }, [isSuccess, items]);

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('items'));
      if (items) {
       setItems(items);
      }
    }, []);


  return (
    <VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >
      <Flex>
      <Heading size={"lg"}>TestUSDC Faucet</Heading>
        <Spacer />
        {isLoading
        ?
        <Grid
        height="40"
        width="40"
        radius="9"
        color="green"
        ariaLabel="loading"
        visible={isLoading}/>
       :
       <CloseIcon onClick={() => stateChanger()}/>}
      </Flex>


    <Text fontSize={"sm"}>Deposit Sepolia ETH to get testUSDC</Text>

    <Box width={"100%"} height="120px" bgColor={COLORS.main} borderRadius={"10"}>

    <VStack spacing={3} direction="row" align="left" m="1rem">
      <Flex>
      <NumberInput value={ethAmount} step={1} min={0} size={"lg"} onChange={(valueString) => setEthAmount(valueString)}>
              <NumberInputField borderWidth={"0px"} focusBorderColor={"red.200"} placeholder="0.0" fontSize={"4xl"} inputMode="numeric"/><NumberInputStepper></NumberInputStepper>
            </NumberInput>
      <Spacer />
      <Image src={`https://market.api3.org/images/asset-logos/ETH.webp`} width={"50px"} height={"50px"} />
      </Flex>

      <Flex>
        <Text 
        color={parseFloat(ethBalance) < parseFloat(ethAmount) ? "red.500" : "white"}
        fontWeight={"bold"} 
        fontSize={"lg"}>
          {parseFloat(ethBalance) < parseFloat(ethAmount)  ? "Insufficient Balance" : "ETH Balance"}
          </Text>
        <Spacer />
        <Image src={'/wallet.svg'} width={"40px"} height={"24px"} />
        <Text fontWeight={"bold"} fontSize={"lg"}>{ethBalance}</Text>
        </Flex>
      </VStack>
    </Box>

    <Box width={"100%"} height="60px" bgColor={COLORS.main} borderRadius={"10"}>
        <VStack spacing={3} direction="row" align="left" m="1rem">

        <Flex>
        <Text 
        fontWeight={"bold"} 
        fontSize={"lg"}>
          TestUSDC will be minted
          </Text>
        <Spacer />
        <Image marginRight={"2"} src={'https://market.api3.org/images/asset-logos/USD.webp'} width={"24px"} height={"24px"} />
        <Text fontWeight={"bold"} fontSize={"lg"}>{parseFloat(calculateAmountValue())}</Text>
        </Flex>


        </VStack>
        </Box>

        <Box width={"100%"} height="60px" bgColor={COLORS.main} borderRadius={"10"}>
        <VStack spacing={3} direction="row" align="left" m="1rem">

        <Flex>
        <Text 
        fontWeight={"bold"} 
        fontSize={"lg"}>
          Token Balance
          </Text>
        <Spacer />
        <Image marginRight={"2"} src={'https://market.api3.org/images/asset-logos/USD.webp'} width={"24px"} height={"24px"} />
        <Text fontWeight={"bold"} fontSize={"lg"}>{tokenBalance}</Text>
        </Flex>


        </VStack>
        </Box>

      <VStack spacing={4} w="100%">
      <Button
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        minWidth={"200px"}
        isDisabled={isLoading || !ethAmount || isNaN(parseFloat(ethAmount)) || parseFloat(ethAmount) <= 0 || parseFloat(ethBalance) < parseFloat(ethAmount)}
        onClick={mintTokens}
      >
      { isLoading ? 'Minting...' : 'Mint'}
      </Button>
    </VStack>


    </VStack>
  );
};

export default Hero;

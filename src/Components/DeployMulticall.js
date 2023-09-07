import React, { useState, useEffect } from "react";
import { Grid } from 'react-loader-spinner'

import {
  Button, Heading,
  VStack, Text, Box, Flex, Spacer, Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

import { ethers, ContractFactory } from "ethers";
import { useAccount, useNetwork } from 'wagmi';

import { COLORS } from '../data/colors';
import OevSearcherMulticallV1 from "../Contracts/OevSearcherMulticallV1.json";

let provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

const DeployMulticall = () => {
    const { address, isConnected } = useAccount()

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [multicallAddress, setMulticallAddress] = useState(null);
    const [items, setItems] = useState([]);

    const { chain } = useNetwork()

    useEffect(() => {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }, [chain]);

    useEffect(() => { 
        if (isSuccess) {
          localStorage.setItem('multicall', JSON.stringify(items));
        }
        }, [isSuccess, items]);
    
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('multicall'));
        if (!items) return
        const multicall = items.find(item => item.address === address && item.chain === chain.id) 
        if (multicall) {setMulticallAddress(multicall.multicall)} else setMulticallAddress(null)
        
        if (items) {
        setItems(items);
        }
    }, [address, chain.id]);

const deployMulticall = async () => { 
    if (!isConnected) return
    setIsLoading(true)
    const factory = new ContractFactory(OevSearcherMulticallV1.abi, OevSearcherMulticallV1.bytecode, provider.getSigner())

    factory.connect(provider.getSigner()).deploy().then((contract) => {
      contract.deployTransaction.wait().then((receipt) => {
        setMulticallAddress(contract.address)
        items.push( { address: address, chain: chain.id, multicall: contract.address})
        setIsLoading(false)
        setIsSuccess(true)
    }).catch((err) => {
        setIsLoading(false)
    })

    }).catch((err) => {
      console.log(err)
    })
}
    
  return (
    <VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >

      <Flex>
      <Heading size={"lg"}>Deploy Multicall Contract</Heading>
      
        <Spacer />
        <Grid
        height="40"
        width="40"
        radius="9"
        color="green"
        ariaLabel="loading"
        visible={isLoading}/>
      </Flex>
      <Text fontSize={"sm"}>Deploy a multicall contract to update data feeds. Multicall contract address will be saved to your browser.</Text>
   
      <Box width={"100%"} height={"160px"} bgColor={COLORS.main} borderRadius={"10"}>

      <VStack spacing={3} direction="row" align="left" m="1rem">
        <Text fontWeight={"bold"} fontSize={"md"}>Multicall Contract</Text>
        <Box p= "2" width={"100%"} borderRadius={"10"} bgColor={COLORS.app}  alignItems={"center"}>
        <Flex className='box'>
        <Text marginLeft={3} fontSize={"md"}>{multicallAddress}</Text>
        <Spacer />
        <Button 
            isDisabled={!multicallAddress}
            onClick={() => {
              navigator.clipboard.writeText(multicallAddress)
            }}
          >Copy</Button>
        </Flex>
        </Box>
        <Link visibility={!multicallAddress ? 'hidden': 'visible'} href={chain.blockExplorers.default.url + '/address/' + multicallAddress} isExternal>
  Show in explorer <ExternalLinkIcon mx='2px' />
</Link>
        </VStack>
        </Box> 

      <VStack spacing={4} w="100%">
      <Button
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        minWidth={"200px"}
        isDisabled={isLoading}
        onClick={
            () => deployMulticall()
        }
      >
      { isLoading ? 'Deploying...' : 'Deploy'}
      </Button>
    </VStack>


    </VStack>
  );
};

export default DeployMulticall;

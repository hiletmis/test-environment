import React, { useState, useEffect } from "react";
import { Grid } from 'react-loader-spinner'

import {
  Button, Heading,
  VStack, Text, Box, Flex, Spacer
} from "@chakra-ui/react";
import { ethers, ContractFactory } from "ethers";
import { useAccount } from 'wagmi';

import { OEV_SEARCHER_MULTICALL_V1_ABI, OEV_SEARCHER_MULTICALL_V1_BYTECODE } from "../data/abi";
import { COLORS } from '../data/colors';

const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

const DeployMulticall = () => {
    const { address, isConnected } = useAccount()

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [multicallAddress, setMulticallAddress] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => { 
        if (isSuccess) {
          localStorage.setItem('multicall', JSON.stringify(items));
        }
        }, [isSuccess, items]);
    
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('multicall'));
        if (!items) return
        const multicall = items.find(item => item.address === address) 
        if (multicall) {setMulticallAddress(multicall.multicall)} else setMulticallAddress(null)
        
        if (items) {
        setItems(items);
        }
    }, [address]);

const deployMulticall = async () => { 
    if (!isConnected) return
    setIsLoading(true)
    const factory = new ContractFactory(OEV_SEARCHER_MULTICALL_V1_ABI, OEV_SEARCHER_MULTICALL_V1_BYTECODE, provider.getSigner());
    const address = await provider.getSigner().getAddress()
    const contract = await factory.deploy().catch((err) => {
        setIsLoading(false)
    })

    await contract.deployTransaction.wait().then((receipt) => {
        items.push( { address: address, multicall: contract.address})
        setIsLoading(false)
        setIsSuccess(true)
        setMulticallAddress(contract.address)
    }).catch((err) => {
        setIsLoading(false)
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
   
      <Box width={"100%"} height={"130px"} bgColor={COLORS.main} borderRadius={"10"}>

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
        visibility={multicallAddress ? "hidden" : "visible"}
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

import React, {useEffect} from "react";
import { VStack, Heading, Flex, Spacer, Text, Box, Image, Stack, Button} from '@chakra-ui/react';
import { COLORS } from '../data/colors';
import { useNetwork } from "wagmi";

const Hero = () => {

    const { chain } = useNetwork()
    
    useEffect(() => {
    }, [chain]);

    function switchNetwork() {
        if (window.ethereum === null) {
            return;
        }
        window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xAA36A7' }],
        });
    }

  return (
    <VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >
    <Flex>
      <Heading size={"lg"}>Switch Network</Heading>
      <Spacer />
      <Image src={`/caution.svg`} width={"30px"} height={"30px"} />
    </Flex>

  <Text fontSize={"sm"}>Prepayment depository contract is deployed on Ethereum Sepolia network. Please switch to Ethereum Sepolia network to proceed adding collateral funds.</Text>

  <Box width={"100%"} height="85px" bgColor={COLORS.main} borderRadius={"10"}>
    <VStack spacing={3} direction="row" align="left" m="1rem">
    <Flex>
    <Spacer />

    <Image src={`/chainIcons/${chain == null ? 1 : chain.id}.svg`} width={"50px"} height={"50px"} />
    <Spacer />
    <Image src={`/switch.svg`} width={"50px"} height={"50px"} />
    <Spacer />
    <Image src={`/chainIcons/11155111.svg`} width={"50px"} height={"50px"} />
    <Spacer />

    </Flex>
    </VStack>
    </Box>
    <Stack alignItems={"center"} >
      <Button
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        minWidth={"200px"}
        onClick={switchNetwork}
      >
        Switch Network
      </Button>
      </Stack>
    </VStack>


  );
};

export default Hero;
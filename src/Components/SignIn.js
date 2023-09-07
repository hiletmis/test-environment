import React from "react";
import { VStack, Heading, Flex, Spacer, Text, Image } from '@chakra-ui/react';
import { COLORS } from '../data/colors';

const Hero = () => {

  return (
    <VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >
    <Flex>
      <Heading size={"lg"}>Sign In</Heading>
      <Spacer />
      <Image src={`/caution.svg`} width={"30px"} height={"30px"} />
    </Flex>

  <Text fontSize={"sm"}>Sign in to your Metamask wallet to continue.</Text>
    </VStack>


  );
};

export default Hero;
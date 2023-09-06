import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, Text, Image, Flex, Spacer, Box, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { ethers } from 'ethers';
import { useContractWrite, useWaitForTransaction, useProvider, useAccount } from 'wagmi';
import { ABI, CONTRACT_ADDRESS } from '../data/abi';
import DataFeedList from './DataFeedList';
import { Grid } from 'react-loader-spinner'
import { computeDataFeedProxyWithOevAddress } from '@api3/contracts'; 

import { COLORS } from '../data/colors';

const Commit = () => {
  const provider = useProvider();
  const { address, isConnected } = useAccount()

  const [dataFeedId, setDataFeedId] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState(isConnected ? address : '');
  const [proxyAddress, setProxyAddress] = useState('');
  const [contractExists, setContractExists] = useState(false);
  const [contractDeployed, setContractDeployed] = useState(false);
  const [contractRegistered, setContractRegistered] = useState(false);
  const [contractRegisteredAddress, setContractRegisteredAddress] = useState(false);
  const [dataFeed, setDataFeed] = useState(null);

  const { data, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'deployDataFeedProxyWithOev',
    args: [
      dataFeedId,
      beneficiaryAddress,
      '0x',
    ], 
    enabled: !contractExists && !contractDeployed && !contractRegistered,
    onError: (error) => {
      setContractDeployed(false);
      console.log('Transaction Error');
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isConnected) {
      setBeneficiaryAddress(address);
    } else {
      setBeneficiaryAddress('');
      setDataFeed(null);
    }
  }, [address, isConnected]);

  useEffect(() => {
    console.log('isLoading:', isLoading);
    console.log('isSuccess:', isSuccess);

    if (isSuccess) {
      setContractDeployed(true);
    }

  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (proxyAddress === '') {
      setContractExists(false);
      console.log('No proxy address');
      return
    }
    
    provider.getCode(proxyAddress, 'latest').then((code) => {
      console.log(code, '- Code')
      if (code !== '0x') {
        setContractExists(true);
      }
    })
  },[provider, proxyAddress])

  useEffect(() => {
    setContractExists(false);
    setContractDeployed(false);
    setContractRegistered(false);
    setContractRegisteredAddress(false);

    if (validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {
      setProxyAddress(computeDataFeedProxyWithOevAddress(provider.network.chainId, dataFeedId, beneficiaryAddress, '0x'));
    }
    
  }, [beneficiaryAddress, dataFeedId, provider.network.chainId])

  useEffect(() => {
    setDataFeed(dataFeed);
    setDataFeedId(dataFeed?.beaconId);
  }, [dataFeed])

  useEffect(() => {
    if (proxyAddress !== '' && validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {
      console.log('Checking if contract is registered at:', proxyAddress);

      fetch('http://localhost:3040/proxy/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proxyAddress: proxyAddress,
          dataFeedId: dataFeedId,
          beneficiaryAddress: beneficiaryAddress,
          chainId: provider.network.chainId,
        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setContractRegistered(data.proxyRegisted);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [beneficiaryAddress, dataFeedId, provider.network.chainId, proxyAddress]);

  useEffect(() => {
    if (contractRegisteredAddress && proxyAddress !== '' && validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {
      console.log('Registering proxy at:', proxyAddress);

      fetch('http://localhost:3040/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proxyAddress: proxyAddress,
          dataFeedId: dataFeedId,
          beneficiaryAddress: beneficiaryAddress,
          chainId: provider.network.chainId,
        }),
      }).then((response) => response.json())

        .then((data) => {
          console.log('Success:', data);
          setContractRegisteredAddress(false);
          setContractRegistered(data.proxyRegisted);
        })
        .catch((error) => {
          console.error('Error:', error);
        }); 
    }
  }, [beneficiaryAddress, contractRegistered, contractRegisteredAddress, dataFeedId, provider.network.chainId, proxyAddress]);

  return (
<VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >
      <Flex>
      <Heading size={"lg"}>Deploy Proxy</Heading>
        <Spacer />
        <Grid
  height="40"
  width="40"
  radius="9"
  color="green"
  ariaLabel="loading"
  visible={isLoading}
  />
      </Flex>

      <Box width={"100%"} height={contractExists || contractDeployed ? "410px" : "250px"} bgColor={COLORS.main} borderRadius={"10"}>

      <VStack spacing={3} direction="row" align="left" m="1rem">
        <Text fontWeight={"bold"} fontSize={"md"}>Beneficiary Address</Text>
        <Box p= "2" width={"100%"}  borderRadius={"10"} bgColor={COLORS.app}  alignItems={"center"}>
        <Flex className='box'>
          <Text fontSize={"md"}>{beneficiaryAddress}</Text>
          <Spacer />
          <Button 
            isDisabled={!isConnected}
            onClick={() => {
              navigator.clipboard.readText()
              .then(text => {
                setBeneficiaryAddress(validateAddress(text) ? text : beneficiaryAddress);
              })
            }}
          >Paste</Button>
        </Flex>
        </Box>
        <Text fontWeight={"bold"} fontSize={"md"}>Data Feed</Text>
        <Box p= "3" width={"100%"} height={"70px"} borderRadius={"10"} bgColor={COLORS.app}  alignItems={"center"}>
        <Flex className='box'>

        <Stack direction="column" spacing={"2"} width={"75%"}>
              <Stack direction="row" spacing={"2"} >
                <Stack visibility={!dataFeed ? "hidden" : "visible"} direction="row" spacing={"-2"}>
                  <Image zIndex={2} src={dataFeed === null ? "" : `https://market.api3.org/images/asset-logos/${dataFeed.image1 == null ? dataFeed.p1 : dataFeed.image1}.webp`} width={"24px"} height={"24px"} />
                  <Image zIndex={1} src={dataFeed === null ? "" : `https://market.api3.org/images/asset-logos/${dataFeed.image2 == null ? dataFeed.p2 : dataFeed.image2}.webp`} width={"24px"} height={"24px"} />
                </Stack>
                <Text fontSize="md" fontWeight="bold">{dataFeed === null ? "" : dataFeed.p1 + '/' + dataFeed.p2}</Text>
            
                <Box visibility={"hidden"} paddingLeft={2} paddingRight={2} borderRadius={"10"} bgColor={COLORS.info} height={5} >
                <Text fontSize="xs">Deployed</Text>
                </Box>
                <Box visibility={"hidden"} paddingLeft={2} paddingRight={2} borderRadius={"10"} bgColor={COLORS.info} height={5} >
                <Text fontSize="xs">Registered</Text>
                </Box>
              </Stack>
              <Text width={"100%"} noOfLines={1} fontSize="xs">{dataFeed === null ? "" : dataFeed.beaconId}</Text>
            </Stack>

          <Spacer />
          <DataFeedList stateChanger={setDataFeed}/>
        </Flex>
          </Box>

        <VStack spacing={3} alignItems={"left"} visibility={(contractDeployed || contractExists) ? "visible" : "hidden"} >


        <Text fontWeight={"bold"} fontSize={"md"}>Proxy Address</Text>
        <Box p= "2" width={"100%"} bgColor={COLORS.app} borderRadius={"10"} alignItems={"center"}>

        <Flex className='box'>
          <Text fontSize={"md"}>{proxyAddress}</Text>
          <Spacer />
          <Button 
            isDisabled={!isConnected || !proxyAddress}
            visibility={(contractDeployed || contractExists) ? "visible" : "hidden"}
            onClick={() => {
              navigator.clipboard.writeText(proxyAddress)
            }}
          >Copy</Button>
        </Flex>
        </Box>

        <Flex>
        <Text fontWeight={"bold"} fontSize={"sm"}>Contract Exists</Text>
          <Spacer />
          {(contractExists || contractDeployed) ? <CheckIcon/> : <CloseIcon />} 
        </Flex>

        <Flex>
        <Text fontWeight={"bold"} fontSize={"sm"}>Contract Registered</Text>
          <Spacer />
          {(contractRegistered) ? <CheckIcon/> : <CloseIcon />} 

        </Flex>
        </VStack>
        </VStack>
      </Box>
    
      <Stack alignItems={"center"} >
      <Button
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        minWidth={"200px"}
        visibility={contractRegistered ? "hidden" : "visible"}
        isDisabled= { 
          (contractDeployed || contractExists)
          ? (contractRegistered || !validateDataFeedId(dataFeedId) || !validateAddress(beneficiaryAddress))
          : !dataFeedId || !validateAddress(beneficiaryAddress) || isLoading || (contractExists && validateDataFeedId(dataFeedId))
        }
        onClick={() => {
          if (contractDeployed || contractExists) {
            console.log('Registering');
            setContractRegisteredAddress(true);
          } else {
            console.log('Deploying'); 
            write?.();
          }

        }}
      >
      { ((contractExists || contractDeployed ) ? (isLoading ? 'Registering...' : 'Register Proxy') : isLoading ? 'Deploying...' : 'Deploy Proxy' )}
      </Button>
      </Stack>
            
  </VStack>
  );
};

function validateAddress(address) {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
}

function validateDataFeedId(dataFeedId) {
  try {
    if (dataFeedId.length !== 66) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}


export default Commit;
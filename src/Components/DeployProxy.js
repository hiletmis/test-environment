import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, Text, Image, Flex, Spacer, Box, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { ethers } from 'ethers';
import { useContractWrite, useWaitForTransaction, useAccount, useNetwork, usePublicClient } from 'wagmi';
import { ABI, CONTRACT_ADDRESS } from '../data/abi';
import DataFeedList from './DataFeedList';
import { Grid } from 'react-loader-spinner'
import { computeDataFeedProxyWithOevAddress } from '@api3/contracts'; 
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import CopyInfoRow from './CopyInfoRow';


import { COLORS } from '../data/colors';

const Commit = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const publicClient = usePublicClient();

  const [dataFeedId, setDataFeedId] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState(isConnected ? address : '');
  const [proxyAddress, setProxyAddress] = useState('');
  const [contractExists, setContractExists] = useState(false);
  const [contractDeployed, setContractDeployed] = useState(false);
  const [contractRegistered, setContractRegistered] = useState(false);
  const [contractRegisteredAddress, setContractRegisteredAddress] = useState(false);
  const [dataFeed, setDataFeed] = useState(null);
  const [chainId, setChainId] = useState(chain != null ? chain.id : 0);
  const [isDataFeedListOpen, setIsDataFeedListOpen] = useState(false);

  const { data, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: CONTRACT_ADDRESS(chainId),
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
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const removeDataFeed = () => {
    setContractRegistered(false);
    setContractRegisteredAddress(true);
    setDataFeed(null);
    setDataFeedId('');
    setProxyAddress('');
  }

  useEffect(() => {
    setDataFeed(dataFeed);
    setDataFeedId(dataFeed?.beaconId);
    setIsDataFeedListOpen(false);
  }, [dataFeed])

  useEffect(() => {
    if (isConnected) {
      setBeneficiaryAddress(address);
    } else {
      setBeneficiaryAddress('');
      setDataFeed(null);
    }
  }, [address, isConnected]);

  useEffect(() => {
    setChainId(chain != null ? chain.id : 0);
  }, [chain]);

  useEffect(() => {
    if (isSuccess) {
      setContractDeployed(true);
    }

  }, [isSuccess]);

  useEffect(() => {
    if (proxyAddress === '') {
      setContractExists(false);
      return
    }

    publicClient.getBytecode({
      address: proxyAddress,
      blockTag: 'latest',
    }).then((code) => {
      if (code !== '0x' && code !== '0x0' && code !== undefined) {
        setContractExists(true);
      }
    })
  },[publicClient, proxyAddress])

  useEffect(() => {
    setContractExists(false);
    setContractDeployed(false);
    setContractRegistered(false);
    setContractRegisteredAddress(false);

    if (validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {
      setProxyAddress(computeDataFeedProxyWithOevAddress(chainId, dataFeedId, beneficiaryAddress, '0x'));
    }
    
  }, [beneficiaryAddress, dataFeedId, chainId])

  useEffect(() => {
    setProxyAddress('');
    setDataFeed(dataFeed);
    setDataFeedId(dataFeed?.beaconId);
  }, [dataFeed])

  useEffect(() => {
    if (proxyAddress !== '' && validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {

      fetch('https://proxy.api3dev.com/proxy/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proxyAddress: proxyAddress,
          dataFeedId: dataFeedId,
          beneficiaryAddress: beneficiaryAddress,
          chainId: chainId,
        }),
      }).then((response) => response.json())
        .then((data) => {
          setContractRegistered(data.proxyRegisted);
        })
        .catch((error) => {
        });
    }
  }, [beneficiaryAddress, dataFeedId, proxyAddress, chainId]);

  useEffect(() => {
    if (contractRegisteredAddress && proxyAddress !== '' && validateDataFeedId(dataFeedId) && validateAddress(beneficiaryAddress)) {

      fetch('https://proxy.api3dev.com/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proxyAddress: proxyAddress,
          dataFeedId: dataFeedId,
          beneficiaryAddress: beneficiaryAddress,
          chainId: chainId,
        }),
      }).then((response) => response.json())

        .then((data) => {
          setContractRegisteredAddress(false);
          setContractRegistered(data.proxyRegisted);
        })
    }
  }, [beneficiaryAddress, contractRegistered, contractRegisteredAddress, dataFeedId, proxyAddress, chainId]);

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

      <Box width={"100%"} bgColor={COLORS.main} borderRadius={"10"}>

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
        <Box p= "3" width={"100%"}  borderRadius={"10"} bgColor={COLORS.app}  alignItems={"center"}>
        <Flex alignItems={isDataFeedListOpen ? "top" : "center"} className='box'>

        <Stack direction="column" spacing={"2"} width={"80%"}>
          { isDataFeedListOpen ? <DataFeedList stateChanger={setDataFeed}/> :
            <Stack direction="row" spacing={"2"} >
              <Stack visibility={!dataFeed ? "hidden" : "visible"} direction="row" spacing={"1"}>
                <Image src={dataFeed === null ? "" : `/coins/${dataFeed.p1}.webp`} fallbackSrc={`/coins/NA.webp`} width={"24px"} height={"24px"} />
                <Image src={dataFeed === null ? "" : `/coins/${dataFeed.p2}.webp`} fallbackSrc={`/coins/NA.webp`} width={"24px"} height={"24px"} />
              </Stack>
            <Text fontSize="md" fontWeight="bold">{dataFeed === null ? "" : dataFeed.p1 + '/' + dataFeed.p2}</Text>
            </Stack>
          }
          <Text width={"100%"} noOfLines={1} fontSize="xs">{dataFeed === null ? "" : dataFeed.beaconId}</Text>
        </Stack>
        <Spacer />
          {contractRegistered 
          ? <Button onClick={ removeDataFeed }>X</Button> 
          : isDataFeedListOpen ? <TriangleUpIcon width={"24px"} height={"24px"} onClick={() => {setIsDataFeedListOpen(false)}}></TriangleUpIcon> : <TriangleDownIcon width={"24px"} height={"24px"} onClick={() => {setIsDataFeedListOpen(true)}}/>
          }
        </Flex>
      </Box>

        <VStack spacing={3} alignItems={"left"} visibility={(contractDeployed || contractExists) ? "visible" : "hidden"} >

        { contractDeployed || contractExists ?

            <VStack spacing={3} alignItems={"left"} >
            <CopyInfoRow header={"Proxy Address"} text={proxyAddress}></CopyInfoRow>

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
            : null
            }
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
            setContractRegisteredAddress(true);
          } else {
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
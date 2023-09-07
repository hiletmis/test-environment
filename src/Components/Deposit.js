import React, { useState, useEffect } from "react";
import { COLORS } from '../data/colors';
import Faucet from './Faucet';
import Popup from 'reactjs-popup';
import { Grid } from 'react-loader-spinner'
import { useNetwork } from 'wagmi';

import { Button, Heading, VStack, Box, Text } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex, Spacer, Image, Stack
} from '@chakra-ui/react'

import { ethers } from "ethers";
import { PREPAYMENT_DEPOSIT_ABI, PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../data/abi";
 
let provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
let contract = new ethers.Contract(PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS, PREPAYMENT_DEPOSIT_ABI, provider);
 
const Deposit = () => {

  const [tokenAmount, setTokenAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0); 
  const [collateral, setCollateral] = useState('');
  const [refreshBalance, setRefreshBalance] = useState(false);
  const { chain } = useNetwork()

  useEffect(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    contract = new ethers.Contract(PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS, PREPAYMENT_DEPOSIT_ABI, provider);
    setRefreshBalance(true)
  }, [chain]);

  const fetchTokenBalance = (async () => {
    const signer = provider.getSigner();
    const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, provider);

    const contractWithSigner = token.connect(signer);
    const address = await signer.getAddress();
    const balance = await contractWithSigner.balanceOf(address);
    const balance_ = balance / 1e6
    setTokenBalance(balance_.toString());
})

const fetchCollateral = (async () => {
  const signer = provider.getSigner();

  const contractWithSigner = contract.connect(signer);
  const address = await signer.getAddress();
  const balance = await contractWithSigner.userToWithdrawalLimit(address);
  const balance_ = balance / 1e6
  setCollateral(balance_.toString());
})

  const depositTokens = async () => {
    const signer = provider.getSigner();

    const contractWithSigner = contract.connect(signer);
    const deadline = ethers.constants.MaxUint256
    const amount = ethers.utils.parseEther(tokenAmount) / (1e12)
    
    const address = await signer.getAddress()
    const { v, r, s } = await signErc2612Permit(signer, contract.address, amount, deadline)

    try {
      setIsLoading(true);
      const tx = await contractWithSigner.applyPermitAndDeposit(address, amount, deadline, v, r, s);
      console.log("Transaction Hash:", tx.hash);
      await tx.wait();
      setIsSuccess(true);
      console.log("Transaction Confirmed!");
  } catch (error) {
      setIsLoading(false);
    console.error("Error sending transaction:", error);
  }

  };
 
  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      setIsSuccess(false);
      setTokenAmount("");
    }
  }, [isSuccess]);
  
  useEffect(() => {
    if (refreshBalance) {
      fetchTokenBalance()
      fetchCollateral()
      setRefreshBalance(false)
    }
  }, [refreshBalance]);

  return (
  <VStack bgColor={COLORS.app} spacing={4} p={8} borderRadius="lg" boxShadow="lg" width="600px" alignItems={"left"} >
      <Flex>
        <Heading size={"lg"}>Add Collateral</Heading>
        <Spacer />
        <Grid
  height="40"
  width="40"
  radius="9"
  color="green"
  ariaLabel="loading"
  visible={isLoading}/>
      </Flex>

    <Text fontSize={"sm"}>Deposit TestUSDC as collateral to start bidding</Text>

    <Box width={"100%"} height="120px" bgColor={COLORS.main} borderRadius={"10"}>
      <VStack spacing={3} direction="row" align="left" m="1rem">
      <Flex>
      <NumberInput  value={tokenAmount} step={1} min={0} size={"lg"} onChange={(valueString) => setTokenAmount(valueString)}>
              <NumberInputField borderWidth={"0px"} focusBorderColor={"red.200"} placeholder="0.0" fontSize={"4xl"} inputMode="numeric"/><NumberInputStepper></NumberInputStepper>
            </NumberInput>
      <Spacer />
      <Image src={`https://market.api3.org/images/asset-logos/USD.webp`} width={"50px"} height={"50px"} />
      </Flex>

        <Flex>
        <Text 
        color={parseFloat(tokenBalance) < parseFloat(tokenAmount) ? "red.500" : "white"}
        fontWeight={"bold"} 
        visibility={tokenBalance === "0" ? "hidden" : "visible"}
        fontSize={"lg"}>
          {parseFloat(tokenBalance) < parseFloat(tokenAmount)  ? "Insufficient Balance" : "Token Balance"}
          </Text>
        <Spacer />
        <Image src={tokenBalance === "0" ? '/getToken.svg' : '/wallet.svg'} width={"40px"} height={"24px"} />
        <Text onClick={() => {
          setTokenAmount(tokenBalance)
        }} fontWeight={"bold"} fontSize={"lg"}>{tokenBalance === "0" 
        ? 
        <Popup
        trigger={<Button height={"30px"} width={"110px"} bgColor={"transparent"}>Get testUSDC</Button> }
        modal>
        { close => (<Faucet stateChanger={close} refreshBalance={close}></Faucet>)  }
        </Popup>
        : tokenBalance}</Text>
        <Image src={'/refresh.svg'} width={"40px"} height={"24px"} onClick={() => {setRefreshBalance(true)}} />
        </Flex>

        </VStack>
        </Box>

        <Box width={"100%"} height="60px" bgColor={COLORS.main} borderRadius={"10"}>
        <VStack spacing={3} direction="row" align="left" m="1rem">

        <Flex>
        <Text 
        fontWeight={"bold"} 
        fontSize={"lg"}>
          Collateral
          </Text>
        <Spacer />
        <Image marginRight={"2"} src={'https://market.api3.org/images/asset-logos/USD.webp'} width={"24px"} height={"24px"} />
        <Text fontWeight={"bold"} fontSize={"lg"}>{collateral}</Text>
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
        isDisabled={isLoading || !tokenAmount || isNaN(parseFloat(tokenAmount)) || parseFloat(tokenBalance) < parseFloat(tokenAmount) || parseFloat(tokenAmount) <= 0}
        onClick={depositTokens}
      >
        { isLoading ? 'Depositing...' : 'Deposit'}
      </Button>
      </Stack>
    </VStack>
  );
};


async function signErc2612Permit(
  signer,
  spenderAddress,
  amount,
  deadline
) {

  const token = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);

  const signerAddress = await signer.getAddress();
  return ethers.utils.splitSignature(
    await signer._signTypedData(
      {
        name: await token.name(),
        version: '2',
        chainId: (await token.provider.getNetwork()).chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      {
        owner: signerAddress,
        spender: spenderAddress,
        value: amount,
        nonce: await token.nonces(signerAddress),
        deadline,
      }
    )
  );
}


export default Deposit;

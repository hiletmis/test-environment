import React from "react";
import DeployMulticall from './DeployMulticall'; 
import SignIn from './SignIn';
import { useNetwork } from "wagmi";

const Hero = () => {
    const { chain } = useNetwork()
  return (
    chain == null ? <SignIn></SignIn> : <DeployMulticall></DeployMulticall> 
  );
};

export default Hero;
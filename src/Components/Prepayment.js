import React, { useState, useEffect } from "react";
import Deposit from './Deposit'; 
import SwitchNetwork from './SwitchNetwork';
import SignIn from './SignIn';
import { useNetwork } from "wagmi";

const Hero = () => {

    const { chain } = useNetwork()
    const [isSepolia, setIsSepolia] = useState(0)

    useEffect(() => {
        setIsSepolia(chain == null ? 0 : chain.id === 11155111)
    }, [chain]);

  return (
    chain == null ? <SignIn></SignIn> : isSepolia ? <Deposit></Deposit> : <SwitchNetwork></SwitchNetwork>
  );
};

export default Hero;
import { Flex, Heading, Button } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import { COLORS } from '../data/colors';

const Header = () => {
  return (
    <Flex bg={COLORS.app} boxShadow="lg" flexDirection={'column'}>
      <Flex as="header" align="center" justify="space-between" p={4}>
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Flex align="flex-start" cursor="pointer" gap={'12px'}>
            <Heading size="md">OEV Relay Test Environment</Heading>
          </Flex>
        </Link>
        <Flex align="flex-end" gap={'12px'}>
        <Link to="/" >
            <Button borderRadius={"10px"} color="white" size="sm" height={"40px"}>
              Deploy Proxy
            </Button>
          </Link>
          <Link to="/deposit" >
            <Button borderRadius={"10px"} color="white" size="sm" height={"40px"}>
            Collateral
            </Button>
          </Link>
          <ConnectButton 
            chainStatus={{
              largeScreen: "full",
              smallScreen: "icon",
            }}
            accountStatus="address"
            label="Sign in"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </Flex>
      </Flex>
      {/* <Divider /> */}
    </Flex>
  );
};

export default Header;

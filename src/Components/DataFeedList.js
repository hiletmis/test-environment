import React, {useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { VStack, Button } from '@chakra-ui/react';
import { Stack, Heading, Text, Box, Image } from "@chakra-ui/react";
import ScrollableFeed from 'react-scrollable-feed'
import { SearchBar } from "./SearchBar";
import { useAccount } from 'wagmi';
import { nodaryFeeds, computeFeedId } from '@nodary/utilities'

import { COLORS } from '../data/colors';

const SelectDataFeed = ({stateChanger}) => {
  const { isConnected } = useAccount()
  const[state, setState]=useState('');

  const ref = useRef(null);

  const mapFeeds = () => {
    return nodaryFeeds.map((feed) => {

      const [p1, p2] = feed.name.split('/')
      const beaconId = computeFeedId(feed.name)

      return {
        p1,
        p2,
        beaconId,
        image1: feed.image1,
        image2: feed.image2
      }
    })
  }

  let [items, setItems] = useState(mapFeeds);

  useEffect(() => { 
     const items = mapFeeds(nodaryFeeds).filter((item) => {
      return item.p1.toLowerCase().includes(state.toLowerCase()) || item.p2.toLowerCase().includes(state.toLowerCase()) || item.beaconId.toLowerCase().includes(state.toLowerCase())
    })

    setItems(items)
  }, [state]);

  return (
    <Popup
    trigger={
      <Button
      isDisabled={!isConnected}
      width={"100px"}>
    { "Select" }
    </Button>
    }
    modal
  >
    {close => (
      <VStack bgColor={COLORS.app} alignItems={"center"} spacing={6} borderRadius="lg" boxShadow="lg" width="600px" minHeight={"600px" }>


<VStack spacing={3} p={7} borderRadius="lg" width="600px" alignItems={"left"}>
    <Heading size={"lg"}>Data Feeds</Heading>
    <VStack spacing={4} direction="row" align="center" m="1rem">
        <SearchBar stateChanger={setState}/>
        <Box width={"100%"} bgColor={COLORS.bg} height={"400px"} borderRadius={"3.3"}>
        <ScrollableFeed
          forceScroll={false}
          onScrollComplete={() => {
            ref.current.scrollIntoView();
           }           
        }>
        {items.map((item, i) => {
          return (
            <Box className='dataFeedItem' ref={i === 0 ? ref : null} key={i} p={4} shadow="md" margin={"2"} borderWidth="px" flex="1" borderRadius={"10"} bgColor={COLORS.app}
            onClick={() => {
              setState('')
              stateChanger(item)
              close()
            }}>
                <Stack direction="column" spacing={"2"} width={"100%"}>
                  <Stack direction="row" spacing={"2"}>
                    <Stack direction="row" spacing={"-2"}>
                      <Image zIndex={2} src={`https://market.api3.org/images/asset-logos/${item.image1 == null ? item.p1 : item.image1}.webp`} width={"24px"} height={"24px"} />
                      <Image zIndex={1} src={`https://market.api3.org/images/asset-logos/${item.image2 == null ? item.p2 : item.image2}.webp`} width={"24px"} height={"24px"} />
                    </Stack>
                    <Text fontSize="md" fontWeight="bold">{item.p1 + '/' + item.p2}</Text>
                    <Box visibility={"hidden"} paddingLeft={2} paddingRight={2} borderRadius={"10"} bgColor={COLORS.info} height={5} >
                    <Text fontSize="xs">Deployed</Text>
                    </Box>
                    <Box visibility={"hidden"} paddingLeft={2} paddingRight={2} borderRadius={"10"} bgColor={COLORS.info} height={5} >
                    <Text fontSize="xs">Registered</Text>
                    </Box>
                  </Stack>
                  <Text width={"100%"} noOfLines={1} fontSize="xs">{item.beaconId}</Text>
                </Stack>
            </Box>
          );
        })}
      </ScrollableFeed>
        </Box>
      </VStack>
    </VStack>
      </VStack>
    )}
  </Popup>
  )

};

export default SelectDataFeed;
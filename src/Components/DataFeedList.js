import React, {useEffect, useRef, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { Stack, Text, Box, Image } from "@chakra-ui/react";
import ScrollableFeed from 'react-scrollable-feed'
import { SearchBar } from "./SearchBar";
import { nodaryFeeds, computeFeedId } from '@nodary/utilities'

import { COLORS } from '../data/colors';

const SelectDataFeed = ({stateChanger}) => {
  const[state, setState]=useState('');

  const ref = useRef(null);

  const mapFeeds = () => {
    return nodaryFeeds.map((feed) => {
      const [p1, p2] = feed.name.split('/')
      const beaconId = computeFeedId(feed.name)
      return { p1,p2,beaconId }
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
    <VStack width={"100%"} direction="row" align="left" m="1rem">
    <SearchBar stateChanger={setState}/>
    <Box height={"400px"} borderRadius={"3.3"}>
      <ScrollableFeed width={"100%"} forceScroll={false} onScrollComplete={() => {ref.current.scrollIntoView();}}>
        {items.map((item, i) => {
          return (
            <Box className='dataFeedItem' ref={i === 0 ? ref : null} key={i} p={4} shadow="md" margin={"2"} borderWidth="px" flex="1" borderRadius={"10"} bgColor={COLORS.bg}
            onClick={() => {
              setState('')
              stateChanger(item)
            }}>
                <Stack direction="column" spacing={"2"}>
                  <Stack direction="row" spacing={"2"}>
                    <Stack direction="row" spacing={"1"}>
                      <Image src={`/coins/${item.image1 == null ? item.p1 : item.image1}.webp`} fallbackSrc={`/coins/NA.webp`} width={"24px"} height={"24px"} />
                      <Image src={`/coins/${item.image2 == null ? item.p2 : item.image2}.webp`} fallbackSrc={`/coins/NA.webp`} width={"24px"} height={"24px"} />
                    </Stack>
                    <Text fontSize="md" fontWeight="bold">{item.p1 + '/' + item.p2}</Text>
                  </Stack>
                 </Stack>
            </Box>
          );
        })}
      </ScrollableFeed>
    </Box>
  </VStack>
  )
};

export default SelectDataFeed;
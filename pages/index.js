import { Image } from '@chakra-ui/image';
import { Container, Heading } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Box, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';

import CountdownTimer from '../components/countdown-timer';
import Logo from '../components/logo';
import config from '../constants/config';
import FadeInWhenVisible from '../components/animation/fade-in-while-visible';
import Mint from '../components/sections/mint-overview';
import CallToAction from '../components/sections/call-to-action';
import Faq from '../components/sections/faq';
import SectionContainer from '../components/sections/section-container';
export default function Home() {
  const [timerElapsed, setTimerElapsed] = useState(false);

  return (
    <Box>
      <Box marginTop='2rem' align='center'>
        <Logo />
      </Box>
      <Box marginTop='2rem' align='center'>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}
          bgGradient='linear(to-l, #B13FFF, #ffffff)'
          bgClip='text'
        >
          {config.projectName} NFT
        </Heading>
        <Heading as='h5' size='sm' fontWeight={200} textAlign='center'>
          P2E NFT Racing Game Built on Elrond Blockchain
        </Heading>
      </Box>

      {timerElapsed ? (
        <Box marginTop='2rem'>
          <CallToAction leftText={'Mint'} leftRoute='/#mint' />
        </Box>
      ) : (
        <VStack marginTop={{ base: '2rem', md: '2rem' }}>
          <FadeInWhenVisible delay={0.5}>
            <CountdownTimer onFinish={() => setTimerElapsed(true)} />
          </FadeInWhenVisible>
        </VStack>
      )}
      <VStack>
        <SectionContainer
          id='mint'
          backgroundColor={useColorModeValue('gray.100', 'gray.900')}
          backgroundPosition='top'
        >
          <Mint />
        </SectionContainer>
        <SectionContainer
          id='faq'
          backgroundColor={useColorModeValue('gray.100', 'gray.900')}
          backgroundPosition='top'
        >
          <Faq />
        </SectionContainer>
      </VStack>
    </Box>
  );
}

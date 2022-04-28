import { CheckCircleIcon, Icon } from '@chakra-ui/icons';
import { Container, Heading } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useGetLoginInfo } from '@elrondnetwork/dapp-core';

import { BsTrophyFill, BsDiscord } from 'react-icons/bs';
import { GiPartyPopper } from 'react-icons/gi';

import { useRouter } from 'next/router';

import React from 'react';

import config from '../constants/config';
import FadeInWhenVisible from '../components/animation/fade-in-while-visible';
import SectionHeader from '../components/sections/section-header';

export default function MintSuccess() {
  const { isLoggedIn } = useGetLoginInfo();
  const colmuns = useBreakpointValue({ base: 1 });
  const router = useRouter();
  const whitelistAddress = router.query.address;

  // if (!isLoggedIn) {
  //   return (
  //     <Container maxW='container.xl' marginY='3rem' marginBottom='8rem'>
  //       <Alert color='warning' background='rgba(144, 205, 244, 0.16)'>
  //         <AlertIcon />
  //         <Text>Please connect your wallet.</Text>
  //       </Alert>
  //     </Container>
  //   );
  // }

  return (
    <>
      <Container maxW='container.xl' marginY='3rem' marginBottom='8rem'>
        <SectionHeader color='#00b0ee' title='Whitelisted' end />
        <SimpleGrid columns={colmuns} spacing={12} textAlign='center'>
          <Box bgImage="linear-gradient(rgba(13, 17, 44, 0.527),rgba(13, 17, 44, 0.5)) , url('Background.jpg')">
            <FadeInWhenVisible delay={0.3}>
              <Box
                marginBottom={12}
                paddingBottom='3rem'
                paddingX='3rem'
                paddingY='3rem'
              >
                <Box marginBottom='2rem'>
                  <Icon as={GiPartyPopper} w={16} h={16} color='white' />
                </Box>
                <Box marginBottom='2rem'>
                  <Heading as='h4' color='white'>
                    You are on the whitelist!
                  </Heading>
                </Box>
                <Box marginBottom='2rem'>
                  <Text color='white'>
                    You will be able to participate in the whitelist sale on{' '}
                    {config.whitelistDate.toLocaleDateString()}
                    {!whitelistAddress
                      ? '.'
                      : ` with this wallet
                    address: ${whitelistAddress}`}
                  </Text>
                </Box>
                <Box marginBottom='2rem'>
                  <Button
                    color='white'
                    _active={{ background: 'whiteAlpha.300' }}
                    _hover={{ background: 'whiteAlpha.300' }}
                    background='blackAlpha.600'
                    onClick={() =>
                      window.open(config.discordWhitelistRegistrationChannelUrl)
                    }
                  >
                    <Icon as={BsDiscord} marginRight={'0.5rem'} />
                    Back to Discord
                  </Button>
                </Box>
              </Box>
            </FadeInWhenVisible>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
}

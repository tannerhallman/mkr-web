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

import { BsTrophyFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';

import { useRouter } from 'next/router';

import React from 'react';

import FadeInWhenVisible from '../../components/animation/fade-in-while-visible';
import SectionHeader from '../../components/sections/section-header';

export default function MintSuccess() {
  const { isLoggedIn } = useGetLoginInfo();
  const colmuns = useBreakpointValue({ base: 1, lg: 2 });
  const router = useRouter();
  const txId = router.query.txId;
  // todo : use txID!!!

  function mintMore() {
    router.push('/mint');
  }
  if (!isLoggedIn) {
    return (
      <Container maxW='container.xl' marginY='3rem' marginBottom='8rem'>
        <Alert color='warning' background='rgba(144, 205, 244, 0.16)'>
          <AlertIcon />
          <Text>Please connect your wallet.</Text>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container maxW='container.xl' marginY='3rem' marginBottom='8rem'>
        <SectionHeader color='#00b0ee' title='Success' end />
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
                  <Icon as={BsTrophyFill} w={16} h={16} color='white' />
                </Box>
                <Box marginBottom='2rem'>
                  <Heading as='h4' color='white'>
                    You have successfully minted!
                  </Heading>
                </Box>
                <Box marginBottom='2rem'>
                  <Text color='white'>
                    Your NFTs will be visible in your wallet shortly. Note: It
                    can take a bit of time for the maiar wallet to refresh.
                  </Text>
                </Box>
                <Box marginBottom='2rem'>
                  <Button
                    color='white'
                    _active={{ background: 'whiteAlpha.300' }}
                    _hover={{ background: 'whiteAlpha.300' }}
                    background='blackAlpha.600'
                    onClick={() =>
                      window.open(
                        `https://${
                          process.env.NEXT_PUBLIC_ELROND_NETWORK === 'devnet'
                            ? 'devnet-'
                            : ''
                        }explorer.elrond.com/transactions/${txId}`,
                        '_blank'
                      )
                    }
                  >
                    View Transaction
                  </Button>

                  <Button
                    color='white'
                    _active={{ background: 'whiteAlpha.300' }}
                    _hover={{ background: 'whiteAlpha.300' }}
                    background='blackAlpha.600'
                    onClick={mintMore}
                  >
                    <Icon as={VscDebugRestart} />
                    Mint Again
                  </Button>
                </Box>
              </Box>
            </FadeInWhenVisible>
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <FadeInWhenVisible delay={0.5}>
              <Box
                display={{ base: 'block' }}
                marginBottom={12}
                borderColor='white'
                borderWidth={3}
              >
                <Image
                  src='https://media.giphy.com/media/IFqM1ExPOENyHS0jrL/giphy.gif'
                  alt='Success'
                  w='100%'
                />
              </Box>
            </FadeInWhenVisible>
          </Box>
        </SimpleGrid>
        <canvas id='my-canvas'></canvas>
      </Container>
    </>
  );
}

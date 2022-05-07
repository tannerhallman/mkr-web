import { Container, Flex, VStack } from '@chakra-ui/layout';
import { Box, Heading, Text } from '@chakra-ui/react';

import { useGetAccountInfo, useGetLoginInfo } from '@elrondnetwork/dapp-core';

import React from 'react';

import List from '../components/nfts/list-nfts';
import SectionHeader from '../components/sections/section-header';

export default function MyNfts() {
  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  return (
    <VStack>
      <Container maxW='container.xl' p={{ base: 0, lg: 1 }}>
        <SectionHeader color='#c423c6' title='My NFTs' start />
        {isLoggedIn && (
          <Box
            rounded='lg'
            roundedBottom={{ base: 'none', lg: 'lg' }}
            backgroundColor={{ base: 'transparent' }}
            opacity={1}
            transition={{
              base: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
              lg: 'none'
            }}
            mb={{ base: 0, lg: 5 }}
            p={{ base: 3, lg: 8 }}
            ps={{ base: 0, lg: 8 }}
            pe={{ base: 0, lg: 8 }}
            boxShadow='xl'
          >
            <Box>
              <List />
            </Box>
          </Box>
        )}
        {!isLoggedIn && (
          <Text>You need to connect your wallet before viewing your NFTs.</Text>
        )}
      </Container>
    </VStack>
  );
}

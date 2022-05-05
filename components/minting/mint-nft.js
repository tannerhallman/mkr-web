import { Container, Heading } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Alert,
  AlertIcon,
  Box,
  Image,
  SimpleGrid,
  Text,
  useToast,
  Badge,
  Link,
  Icon,
  Skeleton
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { Balance } from '@elrondnetwork/erdjs';
import {
  logout,
  useGetAccountInfo,
  useGetLoginInfo
} from '@elrondnetwork/dapp-core';

import React, { useEffect, useState } from 'react';

import { MdCircle } from 'react-icons/md';
import { FaLockOpen, FaLock } from 'react-icons/fa';

import PageTemplate from '../page-template';
import FadeInWhenVisible from '../animation/fade-in-while-visible';
import SectionHeader from '../sections/section-header';
import config from '../../constants/config';

import MintNFTForm from './components/mint-nft-form';
import MintStatus from './components/mint-status';
import Stat from './components/stat';
import useAllowedMintable from './functions/useAllowedMintable';
import useIsMintingPaused from './functions/useIsMintingPaused';
import useIsWhitelisted from './functions/useIsWhitelisted';
import useNftPrice from './functions/useNftPrice';
import useQuantityAvailable from './functions/useQuantityAvailable';
import useTotalSupply from './functions/useTotalSupply';
import useWhitelistSize from './functions/useWhitelistSize';

export default function Mint() {
  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();
  const colmuns = useBreakpointValue({ base: 1, lg: 2 });

  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const [isPublicSale, setIsPublicSale] = useState(false);

  // const isWhitelistEnabled = new Date() >= new Date(config.whitelistDate);
  // const isMintingPaused = new Date() >= new Date(config.releaseDate);
  const {
    isLoading: loadingMintStatus,
    isError: isMintStatusError,
    data: isMintingPaused,
    error: MintStatusError
  } = useIsMintingPaused();

  const {
    isLoading: loadingWhitelistStatus,
    isError: isWhitelistMintError,
    data: isWhitelistEnabled,
    error: whitelistStatusError
  } = useIsMintingPaused(true);

  const {
    isLoading: loadingIsWhitelisted,
    isError: isWhitelistedError,
    data: amIWhitelisted,
    error: whitelistedError,
    refetch: refetchAmIWhitelisted
  } = useIsWhitelisted(address);

  const {
    isLoading: loadingQuantityAvailable,
    isError: isQuantityAvailableError,
    data: quantityAvailable,
    error: quantityAvailableError
  } = useQuantityAvailable();

  const {
    isLoading: loadingTotalSupply,
    isError: isTotalSupplyError,
    data: totalSupply,
    error: totalSupplyError
  } = useTotalSupply();

  const {
    isLoading: loadingTotalWhitelistSize,
    isError: isTotalWhitelistSizeError,
    data: totalWhitelistSize,
    error: totalWhitelistSizeError
  } = useWhitelistSize();

  const {
    isLoading: loadingAllowedMintableQuantity,
    isError: isAllowedMintableQuantityError,
    data: allowedMintableQuantity,
    error: allowedMintableQuantityError
  } = useAllowedMintable();

  const {
    isLoading: loadingNftPrice,
    isError: isNftPriceError,
    data: nftPrice,
    error: nftPriceError
  } = useNftPrice();

  const isLoading = false;
  const isError = false;

  useEffect(() => {
    // minting is ON and the whitelist is not enforced
    const isMintLive = !isMintingPaused;
    setIsPublicSale(isMintLive && !isWhitelistEnabled);

    console.log(
      'isMintingPaused',
      isMintingPaused,
      'isWhitelistEnabled',
      isWhitelistEnabled
    );
  }, [isMintingPaused, isWhitelistEnabled]);

  useEffect(() => {
    if (address) {
      refetchAmIWhitelisted();
    }
  }, [address]);

  function showAlert() {
    // if (isLoading) {
    //   return null;
    // }
    if (isError) {
      return (
        <Box marginY='1rem'>
          <Alert status='error' background='rgba(144, 205, 244, 0.16)'>
            <AlertIcon />
            Unable to check for whitelist or public sale status.
          </Alert>{' '}
        </Box>
      );
    }
    if (isWhitelistEnabled) {
      <Box marginY='1rem'>
        <Alert status='info' background='rgba(144, 205, 244, 0.16)'>
          <AlertIcon />
          The whitelist sale is live.
        </Alert>
      </Box>;
    }
    // if is public sale
    return null;
  }

  function renderMintForm() {
    const isMintLive = !isMintingPaused;

    if (isPublicSale || (isMintLive && isWhitelistEnabled && amIWhitelisted)) {
      const price = nftPrice / 1000000000000000000;
      return (
        <MintNFTForm
          quantityAllowed={allowedMintableQuantity}
          nftPrice={price}
        />
      );
    }
  }

  function renderAmIWhitelisted() {
    if (loadingIsWhitelisted) {
      return <Skeleton height='20px' />;
    }
    if (isPublicSale) {
      // whitelist isn't required at this point
      return null;
    }
    if (amIWhitelisted) {
      // we should show the whitelist status, before minting has started
      return (
        <Text>
          <Icon as={CheckIcon} color='green.500' />
          You are whitelisted with this address.
        </Text>
      );
    }
    if (!isLoggedIn) {
      // Dont know which wallet to check
      return null;
    }
    return (
      <Text>
        <Icon as={CloseIcon} color={'red'} /> You not whitelisted with this
        address. Please wait for the public sale on{' '}
        {config.releaseDate.toLocaleDateString()} at{' '}
        {config.releaseDate.toLocaleTimeString()}.
      </Text>
    );
  }
  function renderStatsGrid() {
    return (
      <SimpleGrid marginBottom='1rem' columns={2} spacing={6}>
        <Stat
          title={'Minting'}
          stat={
            <>
              <Icon as={MdCircle} color={isMintingPaused ? 'red' : 'green'} />{' '}
              {isMintingPaused ? 'Not Started' : 'Live Now'}
            </>
          }
        />
        <Stat
          title={`Whitelist ${
            totalWhitelistSize ? `(${totalWhitelistSize})` : undefined
          }`}
          stat={
            <>
              <Icon
                as={isPublicSale ? FaLockOpen : FaLock}
                color={'grey.200'}
              />{' '}
              {isPublicSale ? 'Not Required' : 'Required'}
            </>
          }
        />
      </SimpleGrid>
    );
  }

  return (
    <Container maxW='container.xl' marginY='1rem' marginBottom='8rem'>
      <SectionHeader color='#00b0ee' title='Mint' />
      {showAlert()}

      <SimpleGrid columns={colmuns} spacing={12}>
        <Box display={{ base: 'none', lg: 'block' }}>
          <FadeInWhenVisible delay={0.5}>
            <Box
              display={{ base: 'block' }}
              marginBottom={12}
              borderColor='white'
              borderWidth={3}
            >
              <Image
                src={
                  'https://media.giphy.com/media/S33ngdsjxeiHUfRQW8/giphy.gif'
                }
                alt={config.projectName}
                w='100%'
              />
            </Box>
          </FadeInWhenVisible>
        </Box>
        <Box bgImage="linear-gradient(rgba(13, 17, 44, 0.527),rgba(13, 17, 44, 0.5)) , url('Background.jpg')">
          <FadeInWhenVisible delay={0.3}>
            <Box paddingX='3rem' paddingTop='3rem' paddingBottom='1rem'>
              <MintStatus
                loading={loadingQuantityAvailable && loadingTotalSupply}
                quantityMinted={
                  totalSupply ? totalSupply - quantityAvailable : '-'
                }
                quantityTotal={totalSupply ? totalSupply : '-'}
              />
            </Box>
            <Box paddingX='3rem' paddingTop='2rem' paddingBottom='1rem'>
              {renderStatsGrid()}
            </Box>
            <Box marginBottom={12} paddingX='3rem'>
              {renderAmIWhitelisted()}

              <Heading variant='quote'>
                {isLoggedIn ? (
                  renderMintForm()
                ) : (
                  <Text marginY='1rem'>
                    You need to connect your wallet before minting{' '}
                  </Text>
                )}
              </Heading>
            </Box>
          </FadeInWhenVisible>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

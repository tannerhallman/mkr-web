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
  Badge
} from '@chakra-ui/react';

import {
  logout,
  useGetAccountInfo,
  useGetLoginInfo
} from '@elrondnetwork/dapp-core';
import { Address, AddressValue } from '@elrondnetwork/erdjs';

import React, { useEffect, useState } from 'react';

import PageTemplate from '../page-template';
import FadeInWhenVisible from '../animation/fade-in-while-visible';
import SectionHeader from '../sections/section-header';
import config from '../../constants/config';

import MintNFTForm from './mint-nft-form';
import MintStatus from './mint-status';

import {
  runSCFunction,
  parseSCResponseForBool,
  convertToDecimal
} from './smartContractUtils/funcs';
import useSmartContractQuery from './smartContractUtils/useSmartContractQuery';

export default function Mint() {
  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();
  const colmuns = useBreakpointValue({ base: 1, lg: 2 });

  const [quantityAvailable, setQuantityAvailable] = useState(null);
  const [loadingQuantityAvailable, setLoadingQuantityAvailable] = useState(
    false
  );
  const [quantityTotal, setQuantityTotal] = useState(null);
  const [loadingQuantityTotal, setLoadingQuantityTotal] = useState(false);

  // state for whitelist
  const [isWhitelistSale, setIsWhitelistSale] = useState(false);
  const [isPublicSale, setIsPublicSale] = useState(false);

  const [loadingSaleStatus, setLoadingSaleStatus] = useState(false);

  // state for amIWhitelisted
  const [amIWhitelisted, setAmIWhitelisted] = useState(false);
  const [loadingAmIWhitelisted, setLoadingAmIWhitelisted] = useState(false);

  const toast = useToast({ position: 'bottom', variant: 'solid' });

  // const [
  //   loadingQuantityAvailable,
  //   responseGetTotalTokensLeft,
  //   errorGetTotalTokensLeft,
  //   triggerGetTotalTokensLeft
  // ] = useSmartContractQuery(
  //   process.env.NEXT_PUBLIC_SC_CHECK_REMAINING_NFT_COUNT_FN_NAME ||
  //     'getTotalTokensLeft',
  //   {}
  // );

  // const isWhitelistSale = new Date() >= new Date(config.whitelistDate);
  // const isPublicSale = new Date() >= new Date(config.releaseDate);

  const isLoading = false;
  const isError = false;

  useEffect(() => {
    if (!loadingSaleStatus) {
      getSaleStatus();
    }
    if (!loadingQuantityAvailable) {
      getQuantityAvailable();
    }
    if (!loadingQuantityTotal) {
      getTotalSupply();
    }
  }, []);

  useEffect(() => {
    if (
      isWhitelistSale &&
      isPublicSale &&
      !loadingAmIWhitelisted &&
      isLoggedIn &&
      address
    ) {
      checkWhitelistForAddress(address);
    }
  }, [isWhitelistSale, isPublicSale, isLoggedIn]);

  async function getQuantityAvailable() {
    setLoadingQuantityAvailable(true);

    const functionName =
      process.env.NEXT_PUBLIC_SC_CHECK_REMAINING_NFT_COUNT_FN_NAME ||
      'getTotalTokensLeft';
    const response = await runSCFunction({
      functionName
    });

    if (
      response.isSuccess() &&
      response.returnData &&
      Array.isArray(response.returnData)
    ) {
      const quantityRemaining = convertToDecimal(response.returnData[0]);
      setQuantityAvailable(quantityRemaining);
    } else {
      toast({
        title: 'Failed NFTs Left Check',
        description: 'There was a problem checking for how many NFTs are left.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
    setLoadingQuantityAvailable(false);
  }
  async function getTotalSupply() {
    setLoadingQuantityTotal(true);

    const functionName =
      process.env.NEXT_PUBLIC_SC_CHECK_TOTAL_NFT_COUNT_FN_NAME ||
      'getTotalTokens';
    const response = await runSCFunction({
      functionName
    });
    if (
      response.isSuccess() &&
      response.returnData &&
      Array.isArray(response.returnData)
    ) {
      const quantityTotal = convertToDecimal(response.returnData[0]);
      setQuantityTotal(quantityTotal);
    } else {
      toast({
        title: 'Failed total NFTs Check',
        description: 'There was a problem checking for total suppply of NFTs.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
    setLoadingQuantityTotal(false);
  }

  async function getSaleStatus() {
    setLoadingSaleStatus(true);

    // check for public sale
    const fn1 =
      process.env.NEXT_PUBLIC_SC_CHECK_MINTING_STATUS_FN_NAME ||
      'isMintingPaused';
    const publicSaleCheck = runSCFunction({
      functionName: fn1
    });

    // check for whitelist sale
    const fn2 =
      process.env.NEXT_PUBLIC_SC_CHECK_WHITELIST_STATUS_FN_NAME ||
      'isAllowlistEnabled';
    const whitelistSaleCheck = runSCFunction({
      functionName: fn2
    });

    await Promise.all([publicSaleCheck, whitelistSaleCheck]).then(values => {
      // handle public sale
      // handle whitelist sale
      const publicSaleResponse = values[0];
      if (
        publicSaleResponse.isSuccess() &&
        publicSaleResponse.returnData &&
        Array.isArray(publicSaleResponse.returnData)
      ) {
        const isPublicSale = !parseSCResponseForBool(
          convertToDecimal(publicSaleResponse.returnData[0])
        );
        console.log('Public Sale', isPublicSale);
        setIsPublicSale(isPublicSale);
      } else {
        console.error(publicSaleResponse);
        toast({
          title: 'Failed to check for Public Sale',
          description:
            'There was a problem checking for the status of the public sale.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'solid'
        });
      }

      // handle whitelist sale
      const whitelistResponse = values[1];
      if (
        whitelistResponse.isSuccess() &&
        whitelistResponse.returnData &&
        Array.isArray(whitelistResponse.returnData)
      ) {
        const isWhitelistSale = parseSCResponseForBool(
          convertToDecimal(whitelistResponse.returnData[0])
        );
        console.log('Whitelist Sale', isWhitelistSale);

        setIsWhitelistSale(isWhitelistSale);
      } else {
        console.error(whitelistResponse);
        toast({
          title: 'Failed to check for Whitelist Sale',
          description:
            'There was a problem checking for the status of the whitelist sale.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'solid'
        });
      }
    });
    setLoadingSaleStatus(false);
  }

  async function checkWhitelistForAddress(addressToCheck) {
    setLoadingAmIWhitelisted(true);

    const functionName = 'getAllowlistAddressCheck';

    const args = [new AddressValue(new Address(addressToCheck))];
    const response = await runSCFunction({
      functionName,
      args
    });
    if (
      response.isSuccess() &&
      response.returnData &&
      Array.isArray(response.returnData)
    ) {
      const isAddressWhitelisted = parseSCResponseForBool(
        convertToDecimal(response.returnData[0])
      );

      setAmIWhitelisted(isAddressWhitelisted);
    } else {
      setAmIWhitelisted(false);
    }
    setLoadingAmIWhitelisted(false);
  }

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
    if (isWhitelistSale) {
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

  function renderSaleTitle() {
    if (isPublicSale) {
      if (isWhitelistSale) {
        return (
          <Heading color='white' as='h4'>
            Whitelist Mint
            <Badge ml='1' colorScheme='green'>
              Live!
            </Badge>
          </Heading>
        );
      } else {
        return (
          <Heading color='white' as='h4'>
            Public Mint
            <Badge ml='1' colorScheme='green'>
              Live!
            </Badge>
          </Heading>
        );
      }
    }
    return (
      <Heading color='white' as='h4'>
        Mint
      </Heading>
    );
  }

  function renderMintForm() {
    if (isPublicSale) {
      if (!isWhitelistSale) {
        return <MintNFTForm />;
      } else if (isWhitelistSale && amIWhitelisted) {
        return <MintNFTForm />;
      } else if (isWhitelistSale && !amIWhitelisted) {
        return (
          <Box marginY='1rem'>
            <Alert status='info' background='rgba(144, 205, 244, 0.16)'>
              <AlertIcon />
              You are not whitelisted for the sale with this address.
            </Alert>
          </Box>
        );
      }
    } else {
      return <Text>Sale has not started</Text>;
    }
  }

  return (
    <Container maxW='container.xl' marginY='1rem' marginBottom='8rem'>
      <SectionHeader color='#00b0ee' title='Mint' />
      {showAlert()}
      <SimpleGrid columns={colmuns} spacing={12}>
        <Box display={{ base: 'none', md: 'block' }}>
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
                env
              />
            </Box>
          </FadeInWhenVisible>
        </Box>
        <Box bgImage="linear-gradient(rgba(13, 17, 44, 0.527),rgba(13, 17, 44, 0.5)) , url('Background.jpg')">
          <FadeInWhenVisible delay={0.3}>
            <Box
              marginBottom={12}
              paddingBottom='3rem'
              paddingX='3rem'
              paddingY='3rem'
            >
              <Box marginBottom='2rem'>{renderSaleTitle()}</Box>
              <MintStatus
                quantityMinted={
                  quantityTotal ? quantityTotal - quantityAvailable : '-'
                }
                quantityTotal={quantityTotal ? quantityTotal : '-'}
              />
              <Heading variant='quote'>
                {isLoggedIn ? (
                  renderMintForm()
                ) : (
                  <Text>You need to connect your wallet before minting </Text>
                )}
              </Heading>
            </Box>
          </FadeInWhenVisible>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

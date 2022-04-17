import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Select,
  Spinner,
  Text,
  useToast,
  useTimeout
} from '@chakra-ui/react';

import {
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  useSignTransactions,
  refreshAccount
} from '@elrondnetwork/dapp-core';
import { Balance, GasPrice, GasLimit } from '@elrondnetwork/erdjs';

import { useRouter } from 'next/router';

import React, { useEffect, useState, useCallback } from 'react';

import FadeInWhenVisible from '../animation/fade-in-while-visible';
import config from '../../constants/config';

import { convertToDecimalToHex } from './smartContractUtils/funcs';

const DEFAULT_TIMEOUT = 5 * 60 * 1000;
const mintFunctionName = process.env.NEXT_PUBLIC_MINT_FUNC_NAME || 'mint';

export default function MintNFTForm({ isWhitelist = false }) {
  const { address } = useGetAccountInfo();
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();
  const [quantity, setQuantity] = useState(null);
  const router = useRouter();
  const [attemptingTx, setAttemptingTx] = useState(false);

  const [transactionTimeout, setTransactionTimeout] = useState(null);
  // state for transactionSessionId
  const [transactionSessionId, setTransactionSessionId] = useState(null);

  const [errorString, setErrorString] = useState(null);

  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const { error, onAbort } = useSignTransactions();

  const {
    isPending,
    isSuccessful,
    isFailed,
    isCancelled,
    errorMessage,
    status,
    transactions
  } = transactionServices.useTrackTransactionStatus({
    transactionId: transactionSessionId
  });

  useEffect(() => {
    //  log all transaction statuses
    console.log(
      `isPending ${isPending}`,
      `isSuccessful ${isSuccessful}`,
      `isFailed ${isFailed}`,
      `isCancelled ${isCancelled}`,
      `errorMessage ${errorMessage}`,
      status
    );
  }, [isPending, isSuccessful, isFailed, isCancelled]);

  const cancelTransaction = useCallback(() => {
    setAttemptingTx(false);
    setTransactionTimeout(null);
    onAbort(transactionSessionId);
  }, [onAbort, transactionSessionId]);

  useTimeout(() => {
    cancelTransaction();
  }, transactionTimeout);

  useEffect(() => {
    if (transactionSessionId && isSuccessful && !errorMessage) {
      toast({
        title: 'Successfully sent the transaction.',
        description: 'Please wait for your NFTs.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
      router.push(`/mint-success/${transactions[0].hash}`);
    }
  }, [transactionSessionId, isSuccessful]);

  useEffect(() => {
    if (transactionSessionId && errorMessage) {
      setErrorString(errorMessage);
      debugger;
      setAttemptingTx(false);
      setTransactionTimeout(null);
    }
  }, [transactionSessionId, errorMessage]);

  useEffect(() => {
    if (errorString) {
      console.error(errorString);
      toast({
        title: 'Failed to send the transaction',
        description: errorString,
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
  }, [errorString]);

  function reset() {
    setErrorString(null);
    setAttemptingTx(false);
    setTransactionTimeout(null);

    cancelTransaction();
  }

  async function mint() {
    setAttemptingTx(true);
    setTransactionTimeout(DEFAULT_TIMEOUT);

    const transaction = {
      sender: address,
      receiver: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
      value: Balance.egld(quantity * config.nftPriceInEgld),
      data: `${mintFunctionName}@${convertToDecimalToHex(quantity)}`,
      gasLimit: quantity * 6_500_000
    };

    // await refreshAccount();

    const hash = await transactionServices.sendTransactions({
      transactions: [transaction],
      callbackRoute: '/mint'
    });

    console.log('Hash from tx: ', hash);

    if (hash) {
      if (hash.error) {
        setErrorString(hash.error);
        debugger;
        setAttemptingTx(false);
      } else if (hash.sessionId) {
        setTransactionSessionId(hash.sessionId);
      }
    } else {
      setAttemptingTx(false);
      debugger;
    }
  }

  if (isPending) {
    return (
      <Text>
        <Spinner /> Awaiting pending transaction...
      </Text>
    );
  }
  if (attemptingTx) {
    return (
      <Text>
        <Spinner /> Waiting for signing... Please check your wallet.
      </Text>
    );
  }
  if (error) {
    return (
      <Box>
        <Text marginY='1rem'>
          <Alert status='error' background='rgba(144, 205, 244, 0.16)'>
            <AlertIcon />
            {error.message}
          </Alert>
        </Text>
        <Button
          color='white'
          background='blackAlpha.600'
          _hover={{ background: 'whiteAlpha.300' }}
          onClick={reset}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <>
      <FormControl marginY='2rem' id='quantity'>
        <FormLabel>How many NFTs would you like to mint?</FormLabel>
        <Select
          borderColor='white'
          placeholder='Select quantity'
          textColor='gray.500'
          variant='outline'
          fontWeight='extrabold'
          fontSize='1.2rem'
          boxShadow='xl'
          onChange={input => setQuantity(input.target.value)}
        >
          <option value={1}>1</option>
          {!isWhitelist && (
            <>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </>
          )}
        </Select>
        <Text as='h6' variant='subHeader' marginY='1rem'>
          <Heading as='h5'>
            Cost: {config.nftPriceInEgld * quantity} {egldLabel}{' '}
          </Heading>
          = {config.nftPriceInEgld} {egldLabel} x {quantity ? quantity : 0} NFT
          {quantity > 1 ? 's' : ''}
        </Text>
      </FormControl>

      <FadeInWhenVisible delay={0.2}>
        <Button disabled={!quantity} onClick={mint} marginBottom='1rem'>
          Mint {quantity}
        </Button>
      </FadeInWhenVisible>
      <Text>Your NFTs will be viewable in your wallet once they are sent.</Text>
      {/* <DappUI.TransactionsToastList /> */}
    </>
  );
}

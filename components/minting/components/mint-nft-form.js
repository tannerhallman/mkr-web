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

import { convertToDecimalToHex } from '../smartContractUtils/funcs';
import FadeInWhenVisible from '../../animation/fade-in-while-visible';
import config from '../../../constants/config';

const DEFAULT_TIMEOUT = 5 * 60 * 1000;
const mintFunctionName = process.env.NEXT_PUBLIC_MINT_FUNC_NAME || 'mint';

export default function MintNFTForm({ quantityAllowed = 0, nftPrice }) {
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

  const toast = useToast({
    position: 'bottom',
    variant: 'solid'
  });

  const {
    error,
    onAbort,
    callbackRoute,
    transactions: signTransactions,
    sessionId,
    hasTransactions
  } = useSignTransactions();
  // useGetSignedTransactions

  useEffect(() => {
    //  log all transaction statuses
    console.log(
      'useSignTransactions----',
      `signTransactions: ${signTransactions} \n`,
      `callbackRoute: ${callbackRoute} \n`,
      `transactions: ${signTransactions} \n`,
      `sessionId: ${sessionId} \n`,
      `hasTransactions: ${hasTransactions} \n`,
      `onAbort: ${onAbort} \n`,
      `error: ${error} \n`
    );
  }, [error, onAbort, callbackRoute, transactions, sessionId, hasTransactions]);

  useEffect(() => {
    console.log('transactionSessionId', transactionSessionId);
  }, [transactionSessionId]);

  // This is how we pluck out a signed tx from a web wallet redirect and track the status
  const {
    hasPendingTransactions,
    pendingTransactions,
    pendingTransactionsArray
  } = transactionServices.useGetPendingTransactions();

  useEffect(() => {
    if (pendingTransactionsArray.length > 0) {
      setTransactionSessionId(pendingTransactionsArray[0][0]);
    }
    //  log all pending statuses
    console.log(
      'useGetPendingTransactions----',
      `hasPendingTransactions: ${hasPendingTransactions} \n`,
      `pendingTransactions: ${pendingTransactions} \n`,
      `pendingTransactionsArray: ${pendingTransactionsArray.length} \n`
    );
  }, [
    hasPendingTransactions,
    pendingTransactions,
    pendingTransactionsArray.length
  ]);

  // tracking a particular tx for status changes
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
      'useTrackTransactionStatus---\n',
      `isPending: ${isPending},\n`,
      `isSuccessful: ${isSuccessful},\n`,
      `isFailed: ${isFailed},\n`,
      `isCancelled: ${isCancelled},\n`,
      `errorMessage: ${errorMessage},\n`,
      `status: ${status} \n`,
      `transactions: ${transactions}`
    );
  }, [
    isPending,
    isSuccessful,
    isFailed,
    isCancelled,
    errorMessage,
    status,
    transactions
  ]);

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
      gasLimit: quantity * 60_500_000
    };

    await refreshAccount();

    const hash = await transactionServices.sendTransactions({
      transactions: [transaction],
      callbackRoute: '/mint'
    });

    console.log('Hash from tx: ', hash);

    if (hash) {
      if (hash.error) {
        setErrorString(hash.error);
        setAttemptingTx(false);
      } else if (hash.sessionId) {
        setTransactionSessionId(hash.sessionId);
      }
    } else {
      setAttemptingTx(false);
    }
  }

  function getOptions() {
    // trash
    const arr = [];
    for (var i = 1; i < quantityAllowed + 1; i++) {
      arr.push(i);
    }
    return arr;
  }

  if (isPending) {
    return (
      <Text>
        <Spinner /> Transaction pending...
      </Text>
    );
  }
  if (attemptingTx) {
    return (
      <Text>
        <Spinner /> Waiting for tx signature...Please check your wallet.
      </Text>
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
          {getOptions().map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Select>
        <Text as='h6' variant='subHeader' marginY='1rem'>
          <Heading as='h5' size={'lg'}>
            Cost
          </Heading>
          <Heading as='h5'>
            {nftPrice * quantity} {egldLabel}{' '}
          </Heading>
          = {nftPrice} {egldLabel} x {quantity ? quantity : 0} NFT
          {quantity > 1 ? 's' : ''}
        </Text>
      </FormControl>

      <FadeInWhenVisible delay={0.2}>
        <Button
          disabled={!quantity}
          onClick={mint}
          marginBottom='1rem'
          variant={'solid'}
          backgroundColor='#B13FFF'
        >
          Mint {quantity}
        </Button>
      </FadeInWhenVisible>
    </>
  );
}

import { useToast } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { useQuery } from 'react-query';

import {
  runSCFunction,
  parseSCResponseForBool,
  convertToDecimal
} from '../smartContractUtils/funcs';

// this function will check for either the public status or the whitelist status
// returns true/false
function useIsWhitelisted(address) {
  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const functionName = 'getTotalTokensLeft';
  const intervalMs = 1000 * 5;

  const getQuantityAvailable = async () => {
    const response = await runSCFunction({
      functionName
    });

    if (
      response.isSuccess() &&
      response.returnData &&
      Array.isArray(response.returnData)
    ) {
      return convertToDecimal(response.returnData[0]);
    } else {
      toast({
        title: 'Failure',
        description: 'There was a problem checking for how many NFTs are left.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
  };

  return useQuery(functionName, getQuantityAvailable, {
    // Refetch the data every second
    refetchInterval: intervalMs
  });
}

export default useIsWhitelisted;

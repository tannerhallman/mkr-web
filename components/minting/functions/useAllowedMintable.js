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
function useAllowedMintable() {
  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const functionName = 'getTokensLimitPerAddressTotal';

  const getAllowedQuantityMintable = async () => {
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
        description: 'There was a problem checking how many NFTs you can mint.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
  };

  return useQuery(functionName, getAllowedQuantityMintable);
}

export default useAllowedMintable;

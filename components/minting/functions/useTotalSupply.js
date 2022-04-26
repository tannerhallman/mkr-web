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
function useTotalSupply() {
  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const functionName = 'getTotalTokens';

  const getTotalSupply = async () => {
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
        title: 'Failed Total SupplyCheck',
        description: 'There was a problem checking for total supply of NFTs.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
    }
  };

  return useQuery(functionName, getTotalSupply);
}

export default useTotalSupply;

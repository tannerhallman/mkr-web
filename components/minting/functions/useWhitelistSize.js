import { useToast } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { useQuery } from 'react-query';

import {
  runSCFunction,
  parseSCResponseForBool,
  convertToDecimal
} from '../smartContractUtils/funcs';

// this function will check for the size of the whitelist
// returns a decimal
function useTotalSupply() {
  const toast = useToast({ position: 'bottom', variant: 'solid' });

  const functionName = 'getAllowlistSize';

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
        title: 'Failed to get Whitelist Size',
        description:
          'There was a problem checking for the size of the whitelist.',
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

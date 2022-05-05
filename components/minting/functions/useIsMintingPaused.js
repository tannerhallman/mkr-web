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
function useIsMintingPaused(isWhitelist) {
  const toast = useToast({
    position: 'bottom',
    variant: 'solid'
  });
  const intervalMs = 1000 * 5;
  // check for public sale
  const mintStatus = 'isMintingPaused';

  // check for whitelist sale
  const whitelistSale = 'isAllowlistEnabled';

  const functionName = isWhitelist ? whitelistSale : mintStatus;

  const getIsMintingPaused = async () => {
    const saleStatusResponse = await runSCFunction({
      functionName
    });

    if (
      saleStatusResponse.isSuccess() &&
      saleStatusResponse.returnData &&
      Array.isArray(saleStatusResponse.returnData)
    ) {
      const result = parseSCResponseForBool(
        convertToDecimal(saleStatusResponse.returnData[0])
      );
      // isAllowlistEnabled is positive statement
      // isMintingPaused is a negative statement
      return result;
    } else {
      console.error(saleStatusResponse);
      toast({
        title: `Failed to check for ${
          isWhitelist ? 'Whitelist' : 'Public'
        } Sale`,
        description: 'There was a problem checking for the status of the sale.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
      return false;
    }
  };

  return useQuery(functionName, getIsMintingPaused, {
    // Refetch the data every second
    refetchInterval: intervalMs
  });
}

export default useIsMintingPaused;

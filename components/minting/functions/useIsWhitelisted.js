import { useToast } from '@chakra-ui/react';

import { Address, AddressValue } from '@elrondnetwork/erdjs';

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
  const toast = useToast({
    position: 'bottom',
    variant: 'solid'
  });

  // check for public sale
  const functionName = 'getAllowlistAddressCheck';

  const getIsWhitelisted = async () => {
    const args = [new AddressValue(new Address(address))];
    const response = await runSCFunction({
      functionName,
      args
    });

    if (
      response.isSuccess() &&
      response.returnData &&
      Array.isArray(response.returnData)
    ) {
      return parseSCResponseForBool(convertToDecimal(response.returnData[0]));
    } else {
      console.error(response);
      toast({
        title: `Whitelist Check Failed`,
        description: 'There was a problem checking if you are whitelisted.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'solid'
      });
      return false;
    }
  };

  return useQuery(functionName, getIsWhitelisted, {
    enabled: Boolean(address)
  });
}

export default useIsWhitelisted;

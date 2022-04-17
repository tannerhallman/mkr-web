import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { loginServices } from '@elrondnetwork/dapp-core';
import { useEffect } from 'react';

export default function ElrondLogin() {
  const [initiateLogin] = loginServices.useWebWalletLogin({
    callbackRoute: '/'
  });

  useEffect(() => {
    initiateLogin();
  }, [initiateLogin]);

  return (
    <Flex p={50} justifyContent='center' alignItems='center' marginBottom={20}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  );
}

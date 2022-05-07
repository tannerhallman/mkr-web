import { Flex, Spinner } from '@chakra-ui/react';

import { loginServices } from '@elrondnetwork/dapp-core';

import { useEffect, useState } from 'react';

export default function ExtensionLogin({ onClose, callbackRoute }) {
  const [hasExtension, setHasExtension] = useState(null);

  const [
    initiateLogin,
    { isLoggedIn, error, loginFailed }
  ] = loginServices.useExtensionLogin({
    callbackRoute: callbackRoute,
    redirectAfterLogin: false
  });

  console.log({ error });
  console.log({ loginFailed });

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  useEffect(() => {
    const exists = !!window.elrondWallet;

    setHasExtension(exists);

    if (exists) {
      initiateLogin();
    }
  }, [initiateLogin]);

  return (
    <>
      {(hasExtension === null || hasExtension) && (
        <Flex
          p={50}
          justifyContent='center'
          alignItems='center'
          marginBottom={20}
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      )}
    </>
  );
}

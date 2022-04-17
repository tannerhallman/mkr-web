import { Box, Link, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { loginServices, useGetLoginInfo } from '@elrondnetwork/dapp-core';
import platform from 'platform';
import QRCode from 'qrcode';
import React, { useCallback, useEffect, useState } from 'react';

export default function MaiarLogin({ onClose }) {
  const { isLoggedIn } = useGetLoginInfo();
  const [qrSvg, setQrSvg] = useState('');

  const [
    initiateLogin,
    { error },
    { uriDeepLink, walletConnectUri }
  ] = loginServices.useWalletConnectLogin({
    callbackRoute: window.location.origin,
    logoutRoute: '/',
    shouldLoginUser: true
  });

  const isMobile =
    platform.os.family === 'iOS' || platform.os.family === 'Android';

  const svgQr = {
    dangerouslySetInnerHTML: {
      __html: qrSvg
    },
    style: {
      width: '15rem',
      height: '15rem'
    }
  };

  const buildQrCode = useCallback(async code => {
    const svg = await QRCode.toString(code, {
      type: 'svg'
    });
    setQrSvg(svg);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  useEffect(() => {
    initiateLogin();
  }, [initiateLogin]);

  useEffect(() => {
    if (walletConnectUri) {
      buildQrCode(walletConnectUri);
    }
  }, [buildQrCode, walletConnectUri]);

  return (
    <Box textAlign='center' p={25}>
      {isMobile && (
        <Link
          href={uriDeepLink}
          rel='noopener noreferrer nofollow'
          target='_blank'
        >
          <Box m='0 auto' marginBottom={15} {...svgQr}></Box>
        </Link>
      )}
      {!isMobile && <Box m='0 auto' marginBottom={15} {...svgQr}></Box>}
      <Text marginBottom={15}>
        Scan the QR code using the Maiar App
        {isMobile
          ? ", click the QR code, or click the 'Open on Mobile' button below to open the App."
          : ''}
      </Text>
      <Box marginBottom={15}>
        {isMobile && (
          <Link
            href={uriDeepLink}
            rel='noopener noreferrer nofollow'
            target='_blank'
          >
            <Button
              color='white'
              _active={{ background: 'whiteAlpha.300' }}
              _hover={{ background: 'whiteAlpha.300' }}
              background='blackAlpha.600'
            >
              Open on Mobile
            </Button>
          </Link>
        )}
        {error && (
          <Box>
            <Text>{error}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

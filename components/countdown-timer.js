import {
  Container,
  Stack,
  Text,
  useBreakpointValue,
  useInterval,
  Center
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import config from '../constants/config';

function getCountdown(saleDate) {
  const diff = saleDate - Date.now();
  const isFinished = diff < 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished
  };
}

function CountdownTimerSection(props) {
  const { header, text } = props;

  return (
    <motion.div>
      <Stack flex={1} dir='column' alignItems='center' marginRight='1'>
        <Text
          lineHeight='4.5rem'
          // fontSize={{ base: '6xl', md: '7xl' }}
          fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
          as={'b'}
          position={'relative'}
          color='white'
        >
          {header < 10 ? `0${header}` : header}
        </Text>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          as={'span'}
          position={'relative'}
          color='white'
        >
          {text}
        </Text>
      </Stack>
    </motion.div>
  );
}

export default function CountdownTimer({ onFinish }) {
  const saleDateLabel = 'Whitelist Sale';
  const saleDate = config.whitelistDate;

  const [
    { days, hours, minutes, seconds, isFinished },
    setCountdown
  ] = useState(getCountdown(saleDate));
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    if (isFinished) {
      setDelay(null);
      onFinish();
    }
  }, [isFinished, onFinish]);

  useInterval(() => {
    setCountdown(getCountdown(saleDate));
  }, delay);

  return (
    <Container
      maxW='container.xl'
      display='flex'
      alignItems={{ base: 'end', md: 'center' }}
      paddingBottom={{ base: '5rem' }}
    >
      <Container centerContent={true}>
        <Stack
          flex={1}
          justifyContent='center'
          spacing={{ base: 5, md: 10 }}
          direction={{ base: 'row' }}
        >
          {days > 0 && <CountdownTimerSection header={days} text='days' />}
          <CountdownTimerSection header={hours} text='hours' />
          <CountdownTimerSection header={minutes} text='minutes' />
          <CountdownTimerSection header={seconds} text='seconds' />
        </Stack>
        <Center marginTop={'1rem'}>
          <Text>{saleDateLabel}</Text>
        </Center>
      </Container>
    </Container>
  );
}

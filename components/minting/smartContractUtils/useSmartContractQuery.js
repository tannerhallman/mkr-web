// custom react hook for smart contract query

import { useCallback, useEffect, useState } from 'react';

import { runSCFunction } from './funcs';

function useSmartContractQuery(
  fnParams,
  { delayFetch = false, parseResponse = true }
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const [delay, setDelay] = useState(delayFetch);

  function trigger() {
    setDelay(true);
  }

  useEffect(() => {
    // declare the data fetching function
    if (!delay) {
      setLoading(true);
      // call the function
      runSCFunction(fnParams)
        .then(response => {
          if (response && response.isSuccess() && response.returnData) {
            if (parseResponse) {
              if (Array.isArray(response.returnData)) {
                const parsed = convertToDecimal(response.returnData[0]);
                setResponse(parsed);
              }
            } else {
              setResponse(response);
            }
          } else {
            setError(response);
          }
          setDelay(true);
          setLoading(false);
        })
        // make sure to catch any error
        .catch(err => {
          setError(err);
          setLoading(false);
          setDelay(true);
        });
    }
    return () => {
      setDelay(true);
    };
  }, [delay]);

  return [loading, response, error, trigger];
}
export default useSmartContractQuery;

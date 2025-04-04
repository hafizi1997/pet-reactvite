import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequest = useRef([]);

  const sentRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {},
      useAbort = false
    ) => {
      setIsLoading(true);
      let httpAbortCtrl;

      // Only create an AbortController if useAbort is true
      if (useAbort) {
        httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: useAbort ? httpAbortCtrl.signal : undefined, // Only add signal if useAbort is true
        });
        const responseData = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sentRequest, clearError };
};

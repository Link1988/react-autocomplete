import { useState, useEffect } from 'react';

const useErrorBoundary = () => {
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const errorHandler = (error: any) => {
      setError(error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  console.log('dasdas', error)

  return error;
};

export default useErrorBoundary
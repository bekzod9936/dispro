import { useEffect } from "react";

export const ErrorFallback = ({ error }: any) => {
  // Handle failed lazy loading of a JS/CSS chunk.
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div>
      <p>Something went wrong.</p>
      <pre>{error?.message}</pre>
    </div>
  );
};

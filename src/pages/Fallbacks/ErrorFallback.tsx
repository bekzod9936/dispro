import Spinner from "components/Helpers/Spinner";
import { useEffect } from "react";
import { SpinnerDiv } from "./style";

export const ErrorFallback = ({ error }: any) => {
  // Handle failed lazy loading of a JS/CSS chunk.
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (
      (error?.message && chunkFailedMessage.test(error.message))) {
      window.location.reload();
    }
  }, [error]);

  console.log(error?.message);

  return (
    <SpinnerDiv>
      <Spinner />
    </SpinnerDiv>
  );
};

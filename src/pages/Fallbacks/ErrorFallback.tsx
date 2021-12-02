import Spinner from "components/Helpers/Spinner";
import { useEffect } from "react";
import { SpinnerDiv } from "./style";

export const ErrorFallback = ({ error }: any) => {
  // Handle failed lazy loading of a JS/CSS chunk.
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (
      (error?.message && chunkFailedMessage.test(error.message)) ||
      error?.message ===
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement." ||
      "Rendered more hooks than during the previous render."
    ) {
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

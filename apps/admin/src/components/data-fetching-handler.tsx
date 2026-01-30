"use client";

import React from "react";
import Loading from "./loading";
import Alert from "./alert";
import { CircleAlert } from "lucide-react";
import { brandClientApi } from "../lib/client";

interface Props {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}
const DataFetchingHandler: React.FC<Props> = ({
  isError,
  isPending,
  error,
}) => {
  return (
    <>
      {isPending ? <Loading /> : null}
      {isError && error ? (
        <Alert
          Icon={CircleAlert}
          message={brandClientApi.utils.handleError(error)}
        />
      ) : null}
    </>
  );
};

export default DataFetchingHandler;

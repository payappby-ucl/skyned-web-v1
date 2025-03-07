"use client"; // Error boundaries must be Client Components

import { Exception } from "@workspace/shared";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Exception & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

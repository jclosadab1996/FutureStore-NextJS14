"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    //good place to send error to analytics (observability / monitoring tools)
    console.log(error);
  }, []);

  return (
    <div
      style={{
        padding: "10rem",
      }}
    >
      <h1>🥴</h1>
      <p>Something went wrong!</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

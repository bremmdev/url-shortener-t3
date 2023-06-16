import React from "react";
import { api } from "@/utils/api";

const URLShortener = () => {
  const [inputUrl, setInputUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");

  const {
    mutate: shortenUrl,
    isLoading: isShorting,
    error: shortenError,
  } = api.url.shorten.useMutation();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    shortenUrl(inputUrl, {
      onSuccess: (data) => {
        setShortenedUrl(data as string);
      },
    });
  };

  const showError =
    shortenError?.data?.zodError?.formErrors?.[0] && !isShorting;
  const errors = shortenError?.data?.zodError?.formErrors;
  const showShort = !showError && shortenedUrl && !isShorting;

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <button type="submit">{isShorting ? "Shortening..." : "Shorten"}</button>
      {showShort && <p>Your short url: {`https://short.bremm.dev/go/${shortenedUrl}`}</p>}
      {showError && errors && <p>{errors[0]}</p>}
    </form>
  );
};

export default URLShortener;

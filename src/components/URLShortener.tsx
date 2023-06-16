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
    <div className="w-11/12 max-w-7xl my-16 mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-center gap-4 w-full">
          <input
            type="text"
            placeholder="Enter URL"
            value={inputUrl}
            className="w-full max-w-md rounded-md border border-slate-800 bg-inherit py-2 px-4 focus:border-amber-100 focus:outline-none"
            onChange={(e) => setInputUrl(e.target.value)}
          />

          <button
            className="focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isShorting}
          >
            {isShorting ? "Shortening..." : "Shorten"}
          </button>
        </div>

        {showShort && (
          <p className="text-center">Your short url:<a href={`https://short.bremm.dev/go/${shortenedUrl}`} className="block font-bold border-b selection:bg-amber-100 border-b-amber-100 hover:text-amber-100 my-1">{`https://short.bremm.dev/go/${shortenedUrl}`}</a></p>
        )}
        {showError && errors && <p>{errors[0]}</p>}
      </form>
    </div>
  );
};

export default URLShortener;

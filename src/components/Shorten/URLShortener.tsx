import React from "react";
import Toast from "@/components/UI/Toast";
import { api } from "@/utils/api";
import { TRPCClientError } from "@trpc/client";
import { urlInputSchema } from "@/schema/url-schema";
import ShortenedLink from "./ShortenedLink";

const URLShortener = () => {
  const [inputUrl, setInputUrl] = React.useState("");
  const [customUrl, setCustomUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [shortenSuccess, setShortenSuccess] = React.useState(false);

  const utils = api.useContext();

  const {
    mutate: shortenUrl,
    isLoading: isShorting,
    error: shortenError,
  } = api.url.shorten.useMutation();

  const handleSuccess = (data: unknown) => {
    setShortenedUrl(data as string);
    setInputUrl("");
    setCustomUrl("");
    setShortenSuccess(true);
    void utils.url.getAll.invalidate();
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = {
      url: inputUrl,
      customUrl: customUrl.length > 0 ? customUrl : undefined,
    };
    const result = urlInputSchema.safeParse(input);
    setShortenSuccess(false);
    setErrors({});
    const errors: Record<string, string> = {};

    if (!result.success) {
      //set the errors
      result.error.errors.forEach((error) => {
        errors[String(error.path[0])] = error.message;
      });

      //set the errors
      setErrors(errors);

      return;
    }

    //no validation errors, so we can submit
    shortenUrl(input, {
      onSuccess: handleSuccess,
    });
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [showToast]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShortenSuccess(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [shortenSuccess]);

  const showError = shortenError && !isShorting;

  const error =
    shortenError && shortenError instanceof TRPCClientError
      ? shortenError.message
      : shortenError?.data?.zodError?.fieldErrors[0];
  const showShort =
    !showError &&
    shortenedUrl &&
    !isShorting &&
    !Object.keys(errors).some((key) => errors[key]);

  return (
    <div className="mx-auto my-6 w-11/12 max-w-7xl md:my-12">
      {showToast && (
        <Toast
          message="Short URL copied to clipboard!"
          setShowToast={setShowToast}
        />
      )}

      {shortenSuccess && (
        <Toast
          message="URL successfully shortened!"
          setShowToast={setShowToast}
        />
      )}

      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex w-full max-w-md flex-col justify-center gap-2 ">
          <label htmlFor="url" className="mb-1 font-bold text-slate-300 ">
            URL
          </label>
          <input
            type="text"
            placeholder="Enter URL"
            value={inputUrl}
            id="url"
            className="w-full rounded-md border border-slate-800 bg-inherit px-4 py-2 placeholder:opacity-50 focus:border-amber-100 focus:outline-none"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          {errors.url && (
            <p className="w-full text-center font-semibold text-rose-400">
              {errors.url}
            </p>
          )}

          <label
            htmlFor="customUrl"
            className="mb-1 mt-4 font-bold text-slate-300"
          >
            Custom ending (optional)
          </label>
          <input
            type="text"
            placeholder="Enter custom ending"
            value={customUrl}
            id="customUrl"
            className="w-full max-w-md rounded-md border border-slate-800 bg-inherit px-4 py-2 placeholder:opacity-50 focus:border-amber-100 focus:outline-none"
            onChange={(e) => setCustomUrl(e.target.value)}
          />

          {errors.customUrl && (
            <p className="w-full text-center font-semibold text-rose-400">
              {errors.customUrl}
            </p>
          )}

          <button
            className="focus-visible:ring-ring ring-offset-background my-4 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isShorting || inputUrl.length === 0}
          >
            {isShorting ? "Shortening..." : "Shorten"}
          </button>
        </div>

        {showError && error && <p className="text-rose-400">{error}</p>}
      </form>

      {showShort && !showError && (
        <ShortenedLink
          shortenedUrl={shortenedUrl}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
};

export default URLShortener;

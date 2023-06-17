import React from "react";
import copyIcon from "@public/icons/copy.svg";
import Image from "next/image";
import Toast from "@/components/Toast";
import { api } from "@/utils/api";

const URLShortener = () => {
  const [inputUrl, setInputUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);

  const utils = api.useContext();

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
        void utils.url.getAll.invalidate();
      },
    });
  };

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(`https://sh.bremm.dev/go/${shortenedUrl}`);
    setShowToast(true);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [showToast]);

  const showError =
    shortenError?.data?.zodError?.formErrors?.[0] && !isShorting;
  const errors = shortenError?.data?.zodError?.formErrors;
  const showShort = !showError && shortenedUrl && !isShorting;

  return (
    <div className="mx-auto my-12 w-11/12 max-w-7xl">
      {showToast && <Toast message="Short URL copied to clipboard!" setShowToast={setShowToast}/>}
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex w-full justify-center gap-4">
          <input
            type="text"
            placeholder="Enter URL"
            value={inputUrl}
            className="w-full max-w-md rounded-md border border-slate-800 bg-inherit px-4 py-2 focus:border-amber-100 focus:outline-none"
            onChange={(e) => setInputUrl(e.target.value)}
          />

          <button
            className="focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isShorting || inputUrl.length === 0}
          >
            {isShorting ? "Shortening..." : "Shorten"}
          </button>
        </div>

        {showShort && (
          <div className="text-center">
            Your short url:
            <div className="flex gap-3">
              <a
                href={`https://sh.bremm.dev/go/${shortenedUrl}`}
                className="my-1 block border-b border-b-amber-100 font-bold selection:bg-amber-100 hover:text-amber-100"
                target="_blank"
              >{`https://sh.bremm.dev/go/${shortenedUrl}`}</a>
              <button
                type="button"
                onClick={handleCopyUrl}
              >
                <Image
                  src={copyIcon as string}
                  width={16}
                  height={16}
                  className="transition-transform hover:scale-110"
                  alt="copy icon"
                />
              </button>
            </div>
          </div>
        )}
        {showError && errors && <p>{errors[0]}</p>}
      </form>
    </div>
  );
};

export default URLShortener;

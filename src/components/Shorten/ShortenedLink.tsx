import React from "react";
import copyIcon from "@public/icons/copy.svg";
import Image from "next/image";

type Props = {
  shortenedUrl: string;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShortenedLink = (props: Props) => {
  const { shortenedUrl, setShowToast } = props;

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(
      `https://sh.bremm.dev/go/${shortenedUrl}`
    );
    setShowToast(true);
  };

  return (
    <div className="mx-auto my-12 w-fit text-center">
      Your short url:
      <div className="flex gap-3">
        <a
          href={`https://sh.bremm.dev/go/${shortenedUrl}`}
          className="my-1 block border-b border-b-amber-100 font-bold selection:bg-amber-100 hover:text-amber-100"
          target="_blank"
        >{`https://sh.bremm.dev/go/${shortenedUrl}`}</a>
        <button type="button" onClick={handleCopyUrl}>
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
  );
};

export default ShortenedLink;

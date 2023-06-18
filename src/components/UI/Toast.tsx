import Image from "next/image";
import Close from "@public/icons/close-alert.svg";
import React from "react";

type Props = {
  message: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Toast = (props: Props) => {
  const { message, setToastMessage } = props;

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setToastMessage("");
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [setToastMessage]);

  return (
    <div
      className={`fixed bottom-12 left-6 right-6 z-10 mx-auto flex animate-slideIn items-center gap-4 rounded-md bg-amber-100 px-4 py-3 text-left text-sm text-slate-900 md:max-w-xl md:px-6 md:text-base`}
    >
      <div>
        <p>{message}</p>
      </div>
      <Image
        className="ml-auto cursor-pointer"
        src={Close as string}
        alt="close alert"
        width={28}
        height={28}
        onClick={() => setToastMessage("")}
      />
    </div>
  );
};

export default Toast;

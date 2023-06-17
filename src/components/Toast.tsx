import Image from "next/image";
import Close from "@public/icons/close-alert.svg";

type Props = {
  message: string;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = (props: Props) => {
  const { message, setShowToast } = props;

  return (
    <div
      className={`animate-slideIn fixed bottom-8 left-6 right-6 z-10 mx-auto flex items-center gap-4 rounded-md bg-amber-100 px-4 py-3 text-left text-sm text-slate-900 md:max-w-xl md:px-6 md:text-base`}
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
        onClick={() => setShowToast(false)}
      />
    </div>
  );
};

export default Toast;

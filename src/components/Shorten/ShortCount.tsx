import React from "react";
import { api } from "@/utils/api";
import arrowIcon from "@public/icons/arrow.svg";
import Image from "next/image";

const ShortCount = () => {
  const { data: count, isLoading: countLoading } = api.url.getAll.useQuery();

  return !countLoading ? (
    <div className="animate-fadeIn text-center text-slate-400 md:ml-2">
      <Image
        src={arrowIcon as string}
        width={32}
        height={32}
        alt="arrow"
        className="hidden md:-mt-3 md:inline"
      />
      Already shortened{" "}
      <span className="font extra-bold text-xl text-amber-100">{count}</span>{" "}
      urls<span className="text-amber-100">.</span>
    </div>
  ) : (
    <div className="h-7">&nbsp;</div>
  );
};

export default ShortCount;

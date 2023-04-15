import React, { useState } from "react";
import { Arrow } from "../assets/Arrow";
import ReactOutSideClickHandler from "react-outside-click-handler";

interface PropsType {
  kind?: "outline" | "contained";
  lists: string[];
  value?: string;
  className?: string;
  placeholder: string;
}

const kindColor = {
  outline: "border-2 border-gray-800 bg-gray50",
  contained: "bg-gray100",
};

const scroll = "";

export const Dropdown = ({
  kind = "outline",
  lists,
  value,
  className,
  placeholder,
}: PropsType) => {
  const kindCss = kindColor[kind];
  const [dropdown, setDropDown] = useState(false);
  return (
    <ReactOutSideClickHandler
      display="inline-block"
      onOutsideClick={() => {
        setDropDown(false);
      }}
    >
      <div
        onClick={() => setDropDown(true)}
        className={`${className} relative`}
      >
        <div
          className={`h-[46px] flex items-center justify-between rounded-sm pl-4 pr-3 ${kindCss} cursor-pointer`}
        >
          <div className="text-body6">{placeholder}</div>
          <Arrow direction="bottom" />
        </div>
        {dropdown && (
          <div className="absolute z-50 top-14 bg-gray100 rounded-md shadow-xl w-full max-h-[132px] overflow-y-auto flex flex-col items-center">
            {lists.map((item, idx) => (
              <>
                <div className="w-full hover:bg-gray200 flex pl-4 py-2.5 items-center rounded cursor-pointer">
                  {item}
                </div>
                {idx !== lists.length - 1 && (
                  <div className="w-[95%] h-[1px]  bg-gray50 shrink-0" />
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </ReactOutSideClickHandler>
  );
};

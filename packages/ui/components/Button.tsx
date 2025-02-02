import React from "react";
import { ReactNode } from "react";

interface PropsType {
  className?: string;
  radius?: "normal" | "medium" | "circle";
  kind?:
    | "contained"
    | "containedWhite"
    | "outline"
    | "outlineWhite"
    | "underline"
    | "text"
    | "success"
    | "point"
    | "critical";
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const defaultDisable = "bg-gray200 text-gray50";

const buttonColor = {
  contained: {
    enable:
      "transition-all bg-gray800 text-gray50 hover:bg-gray500 [&_path]:fill-gray50 active:bg-gray400 [&_path]:hover:fill-gray50",
    disable: defaultDisable,
  },
  containedWhite: {
    enable: "transition-all bg-gray50 text-gray900  hover:bg-gray100 :active:bg-gray200",
    disable: "bg-gray600 text-gray500",
  },
  outline: {
    enable:
      "transition-all border-2 text-gray800 hover:text-gray50 hover:border-gray600 hover:bg-gray600 active:text-gray50 [&_path]:hover:fill-gray50 active:bg-gray500 active:border-gray500",
    disable: "border-2 border-gray300 text-gray300",
  },
  outlineWhite: {
    enable:
      "transition-all border-2 text-gray50 hover:text-gray800 hover:border-gray50 hover:bg-gray100 active:text-gray50 active:bg-gray500 active:border-gray500",
    disable: "border-2 border-gray300 text-gray300",
  },
  underline: {
    enable: "transition-all underline bg-gray50 text-gray600 hover:text-gray500",
    disable: "underline text-gray200",
  },
  text: {
    enable: "transition-all hover:bg-gray100 active:bg-gray200",
    disable: "text-gray200",
  },
  success: {
    enable:
      "transition-all text-gray50 bg-green hover:bg-green200 active:bg-green100 active:text-green",
    disable: defaultDisable,
  },
  point: {
    enable:
      "transition-all bg-blue text-gray50 hover:bg-blue200 active:bg-blue100 active:bg-blue [&_path]:fill-gray50",
    disable: defaultDisable,
  },
  critical: {
    enable:
      "transition-all bg-red text-gray50 hover:bg-red200 active:bg-red100 active:text-red",
    disable: defaultDisable,
  },
};

const radiusObj = {
  normal: "rounded-[2px]",
  medium: "rounded-[16px]",
  circle: "rounded-[100px]",
};

export const Button = ({
  className,
  radius = "normal",
  kind = "text",
  onClick,
  children,
  disabled = false,
}: PropsType) => {
  const { enable, disable } = buttonColor[kind];
  const borderRadius = radiusObj[radius];

  return (
    <button
      className={`w-auto box-border pl-[18px] pr-[18px] px-[18px] h-[46px] text-body8 flex items-center justify-center gap-x-[15px] shrink-0 ${borderRadius} ${
        disabled ? disable : enable
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

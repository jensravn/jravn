"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  className,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

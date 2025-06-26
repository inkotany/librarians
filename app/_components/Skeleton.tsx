"use client";
import clsx from "clsx";

const NitSkeleton = ({
  width = "100%",

  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={clsx("animate-pulse rounded bg-gray-200", className)}
      style={{ width, height }}
    />
  );
};

export default NitSkeleton;

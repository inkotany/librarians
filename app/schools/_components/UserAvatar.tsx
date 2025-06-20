"use client";

import { useSession } from "next-auth/react";

type Props = {
  size?: number;
};

export default function UserAvatar({ size = 40 }: Props) {
  const { data: session, status } = useSession();

  const user = session?.user;
  // const profile = user?.profile || null;

  const initials = (user?.firstName || user?.name || "U")
    .slice(0, 2)
    .toUpperCase();

  const dimension = { width: size, height: size };

  if (status === "loading") {
    return (
      <div
        className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }

  // if ( && !imgError) {
  //   return (
  //     <div
  //       className="rounded-full border-2 border-primary overflow-hidden"
  //       style={dimension}
  //     >
  //       <Image
  //         src={""}
  //         alt={name}
  //         width={size}
  //         height={size}
  //         className="object-cover"
  //         onError={() => setImgError(true)}
  //       />
  //     </div>
  //   );
  // }

  // Letter avatar fallback
  return (
    <div
      className="rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center font-bold"
      style={dimension}
    >
      {initials}
    </div>
  );
}

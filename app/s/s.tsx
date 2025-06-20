"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EmailSent = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 max-w-2xl mx-auto">
      <Image
        src="/undraw_mail_sent.svg"
        alt="Email Sent"
        width={300}
        height={300}
        priority
      />
      <h2 className="text-2xl font-bold mt-6 text-gray-800 dark:text-white">
        Check Your Inbox
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        We ve sent a password reset link to . Please{" "}
        <span className="text-indigo-600 underline ">
          <Link href={"https://mail.google.com/"}>
            {" "}
            click here to check your email
          </Link>
        </span>{" "}
        inbox and follow the instructions.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="mt-6 bg-primary hover:opacity-80 text-white font-md px-6 py-1 rounded-md transition"
      >
        Back to Login
      </button>
    </div>
  );
};

export default EmailSent;

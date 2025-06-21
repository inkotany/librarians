"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@radix-ui/themes";
import { LockKeyholeOpen, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./_components/FormError";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import login from "./login";
import Spinner from "./_components/Spinner";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LibrarianCredentials = z.infer<typeof loginSchema>;

// ✅ Form Component
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LibrarianCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LibrarianCredentials) => {
    const response = await login(data);
    if (response.success) {
      toast.success(
        typeof response.message === "string"
          ? response.message
          : "Login successful"
      );
      redirect("/schools/dashboard");
    } else {
      toast.error(
        typeof response?.message === "string"
          ? response.message
          : "Invalid email or password"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Email Field */}
      <div className="relative">
        <Mail
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={20}
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full py-3 pl-12 pr-5 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition duration-300 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>
      <FormError error={errors.email?.message} />

      {/* Password Field */}
      <div className="relative">
        <LockKeyholeOpen
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={20}
        />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full py-3 pl-12 pr-12 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition duration-300 dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <FormError error={errors.password?.message} />

      {/* Signup Links */}
      <div className="text-center flex gap-2 flex-col w-full">
        <Text size="2">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary underline"
            href="/signup"
          >
            Sign up
          </Link>
        </Text>
        <Link className="text-primary underline" href="/login/forgot">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full mt-4 py-3 rounded-lg flex justify-center items-center gap-4 bg-primary text-xl text-white font-semibold hover:bg-primary-dark transition duration-300 dark:bg-primary-dark"
      >
        {!isSubmitting && "Login"}
        {isSubmitting && <Spinner />}
      </button>
    </form>
  );
};

export default LoginForm;

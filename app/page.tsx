import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { APP_NAME } from "./constants";
import { auth } from "./auth";

export const metadata = {
  title: `Login | ${APP_NAME}`,
  description: "Login to access a tone of features and tools we present",
};

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/schools/dashboard");
  }

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md p-8 shadow-lg rounded-2xl bg-white dark:bg-gray-900 dark:text-white">
        <h2 className="text-3xl text-primary font-semibold text-center mb-6">
          Login
          <div className="absolute left-0 bottom-0 w-full h-1 bg-primary mt-2"></div>
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

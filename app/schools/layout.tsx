import { ReactNode } from "react";
import Sidebar from "./SideBar";
import React from "react";
import Greetings from "./Greetings";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import AddBookModal from "./_components/AddBookModal";
import AddStudentModal from "./_components/AddStudentModal";
import AddBookCopyModal from "./_components/AddBookCopyModal";
import IssueBookModal from "./_components/IssueBookModal";
import ReturnBookModal from "./_components/ReturnBookModal";
import { ThemeProvider } from "next-themes";
import RenewCirculationModal from "./_components/RenewCirculationModal";
import AquireBookModal from "./_components/AquireBookModal";

const SchoolsDashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const session = await auth();
  if (
    !session ||
    (session.user &&
      (session.user as { userType?: string }).userType !== "Librarian")
  )
    redirect("/login");
  return (
    <ThemeProvider attribute={"class"} enableSystem defaultTheme="dark">
      <div className="flex gap-4 h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <Greetings />
          <AddBookModal />
          <AquireBookModal />
          <IssueBookModal />
          <AddBookCopyModal />
          <AddStudentModal />
          <ReturnBookModal />
          <RenewCirculationModal />
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SchoolsDashboardLayout;

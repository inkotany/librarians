import StudentsOverview from "./StudentsOverview";
import StudentsContainer from "./Students";
import AddStudentButton from "../dashboard/_components/AddStudentButton";

export const metadata = {
  title: "Students",
  description: "Manage your students and their activities",
};

const StudentsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="library-title">Students</h1>
        <AddStudentButton />
      </div>
      <StudentsOverview />
      <div className="mt-6">
        <StudentsContainer />
      </div>
    </>
  );
};

export default StudentsPage;

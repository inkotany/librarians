import React from "react";
import Tabs from "./Tab";
import AllStudents from "./AllStudents";
import StudentsBorrowedBooksTable from "./StudentsWhoBorrowedBooks";
import StudentsLostBooksTable from "./StudentsWhoLostBooks";
import StudentsReturnedBooksTable from "./StudentsWhoReturnedBooks";

const StudentsContainer = () => {
  return (
    <Tabs
      tabLabels={["All students", "Borrowed Books", "Unreturned", "Returned books"]}
      tabComponents={[<AllStudents key={1} />, <StudentsBorrowedBooksTable key={2} />, <StudentsLostBooksTable key={3} />, <StudentsReturnedBooksTable key={4} />]}
    />
  );
};

export default StudentsContainer;

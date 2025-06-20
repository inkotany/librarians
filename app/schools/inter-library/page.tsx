import InterLibraryOverview from "./InterLibraryOverview";
import InterLibraryTable from "./InterLibraryTable";
import RequestBookButton from "./RequestBookButton";

export const metadata = {
  title: "Inter library",
  description: "Organize inter-library activities",
};

const InterLibraryPage = () => {
  return (
    <>
      <div className="flex justify-between max-md:flex-col max-md:gap-4 items-center mb-6">
        <h1 className="library-title">Inter Library Activities</h1>
        <RequestBookButton />
      </div>
      <InterLibraryOverview />
      <InterLibraryTable />
    </>
  );
};

export default InterLibraryPage;

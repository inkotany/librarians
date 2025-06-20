import GenerateReport from "./GenerateReport";
import RecentReportsTable from "./RecentReports";

export const metadata = {
  title: "Reports",
  description: "Manage and create reports",
};

const ReportsPage = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-gray-900 dark:text-white">
        Generate Report
      </h1>
      <p className="text-gray-800 font-light text-lg dark:text-white text-center mt-4">
        To generate a report, you’ll need to pick a time frame first. Just
        choose a start and end date and you’re good to go!
      </p>
      <GenerateReport />
      <RecentReportsTable />
    </>
  );
};

export default ReportsPage;

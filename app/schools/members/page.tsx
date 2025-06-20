import MemberOfTheWeek from "./MemberOfTheWeek";
import MembersOverview from "./MembersOverview";
import MembersTable from "./MembersTable";

export const metadata = {
  title: "Members and Teachers",
  description: "Manage the members of your library",
};

const MembersPage = () => {
  return (
    <>
      <h1 className="library-title">Members</h1>
      <MembersOverview />
      <MemberOfTheWeek />
      <h1 className="library-subtitle mt-4">List of members</h1>
      <MembersTable />
    </>
  );
};

export default MembersPage;

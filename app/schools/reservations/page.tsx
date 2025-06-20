import ReservationsOverview from "./ReservationsOverview";
import ReservationsTable from "./ReservationsTable";

export const metadata = {
  title: "Reservations",
  description: "Approve and reject reservations",
};

const ReservationsPage = () => {
  return (
    <>
      <h1 className="library-title">Reservations</h1>
      <ReservationsOverview />
      <ReservationsTable />
    </>
  );
};

export default ReservationsPage;

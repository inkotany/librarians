import ActionButtons from "./ActionButtons";
import Analytics from "./Analytics";
import Overview from "./Overview";
import { getApiClient } from "../axios";
import { auth } from "@/app/auth";
import { APP_NAME } from "@/app/constants";

export async function generateMetadata() {
  const { user } = await auth();
  const api = await getApiClient();
  const institutionId = (user as { institutionId?: string })?.institutionId;
  const res = await api.get(`/institutions/${institutionId}`);
  const { name } = res.data;

  return {
    title: `${name} Dashboard | ${APP_NAME}`,
    description: `The overview of ${name} library`,
  };
}

const SchoolsDashboard = async () => {
  const api = await getApiClient();
  const res = await api.get("/librarians/analytics");

  const { topBooksData, borrowingTrendsData } = res.data;
  return (
    <>
      <ActionButtons />
      <h1 className="library-title">Overview</h1>
      <Overview />
      <Analytics
        borrowingTrendsData={borrowingTrendsData}
        topBooksData={topBooksData}
      />
    </>
  );
};

export default SchoolsDashboard;

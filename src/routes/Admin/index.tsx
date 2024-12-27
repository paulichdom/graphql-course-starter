import { useMemo } from "react";
import Admin from "./Admin";
import { useAdminQuery } from "./queries.generated";

const AdminRoute = () => {
  const {data} = useAdminQuery();

  const jobs = useMemo(() => data?.me?.ownedJobs ?? [], [data]);

  return <Admin jobs={jobs} />;
};

export default AdminRoute;

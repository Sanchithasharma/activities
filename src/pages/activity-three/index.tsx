import { useQuery } from "@tanstack/react-query";
import "./styles.css";
import { getLocations } from './api';

const FETCH_LOCATIONS = "FETCH_LOCATIONS";

export const ActivityThree = () => {

  const { data, error, isLoading } = useQuery({
    // ? can be reused using refetch()
    queryKey: [FETCH_LOCATIONS],
    queryFn: getLocations,
  });

  if (error) return <h3 className="error">Request Failed!</h3>;
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="container">
      <h2>Activity three</h2>

      <div className="data">
        <h3>Successful API Call!</h3>
        {JSON.stringify(data)}
      </div>
    </div>
  );
};

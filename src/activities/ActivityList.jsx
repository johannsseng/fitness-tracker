import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
import { useState } from "react";
import { getActivities } from "../api/activities";

export default function ActivityList({ activities, setActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

 async function handleDelete(activityId) {
  try {
    await deleteActivity(token, activityId);

    //  refetch from server
    const updated = await getActivities();
    setActivities(updated);

  } catch (err) {
    setError(err.message);
  }
}

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}

            {/*  only show if logged in */}
            {token && (
              <button onClick={() => handleDelete(activity.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
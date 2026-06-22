import { useEffect, useState } from 'react';
import { fetchResource } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResource('activities')
      .then((records) => {
        setActivities(records);
        setStatus('ready');
      })
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return <p className="text-muted">Loading activities...</p>;
  }

  if (status === 'error') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <h1>Activities</h1>
        <span className="badge text-bg-primary">{activities.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
                <td>{activity.username}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && <p className="text-muted">No activities found.</p>}
    </section>
  );
}

export default Activities;

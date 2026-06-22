import { useEffect, useState } from 'react';

const workoutsApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function getWorkoutsRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.workouts)) {
    return payload.workouts;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.workouts)) {
    return payload.data.workouts;
  }

  return [];
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(workoutsApiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for workouts: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        setWorkouts(getWorkoutsRecords(payload));
        setStatus('ready');
      })
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return <p className="text-muted">Loading workouts...</p>;
  }

  if (status === 'error') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <h1>Workouts</h1>
        <span className="badge text-bg-primary">{workouts.length}</span>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-6" key={workout._id ?? workout.title}>
            <article className="card h-100 workout-card">
              <div className="card-body">
                <div className="d-flex justify-content-between gap-3 align-items-start">
                  <h2 className="card-title h5">{workout.title}</h2>
                  <span className="badge text-bg-secondary text-capitalize">{workout.difficulty}</span>
                </div>
                <p className="card-text text-muted">{workout.category} · {workout.durationMinutes} min</p>
                <p className="goal-text">{workout.suggestedForGoal}</p>
                <ul className="exercise-list">
                  {(workout.exercises ?? []).map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="text-muted">No workouts found.</p>}
    </section>
  );
}

export default Workouts;

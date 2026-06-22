import { useEffect, useState } from 'react';
import { fetchResource } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResource('teams')
      .then((records) => {
        setTeams(records);
        setStatus('ready');
      })
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return <p className="text-muted">Loading teams...</p>;
  }

  if (status === 'error') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <h1>Teams</h1>
        <span className="badge text-bg-primary">{teams.length}</span>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6 col-xl-4" key={team._id ?? team.name}>
            <article className="card h-100 team-card">
              <div className="card-body">
                <h2 className="card-title h5">{team.name}</h2>
                <p className="card-text text-muted">{team.city}</p>
                <dl className="metric-list">
                  <div>
                    <dt>Members</dt>
                    <dd>{team.memberCount}</dd>
                  </div>
                  <div>
                    <dt>Weekly Goal</dt>
                    <dd>{team.weeklyGoalMinutes} min</dd>
                  </div>
                  <div>
                    <dt>Captain</dt>
                    <dd>{team.captainUsername}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="text-muted">No teams found.</p>}
    </section>
  );
}

export default Teams;

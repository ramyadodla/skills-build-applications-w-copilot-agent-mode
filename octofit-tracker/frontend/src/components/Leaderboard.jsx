import { useEffect, useState } from 'react';
import { fetchResource } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResource('leaderboard')
      .then((records) => {
        setLeaderboard(records);
        setStatus('ready');
      })
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return <p className="text-muted">Loading leaderboard...</p>;
  }

  if (status === 'error') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <h1>Leaderboard</h1>
        <span className="badge text-bg-primary">{leaderboard.length}</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Athlete</th>
              <th>Team</th>
              <th>Points</th>
              <th>Weekly Minutes</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry._id ?? entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.teamName}</td>
                <td>{entry.points}</td>
                <td>{entry.weeklyMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && <p className="text-muted">No leaderboard entries found.</p>}
    </section>
  );
}

export default Leaderboard;

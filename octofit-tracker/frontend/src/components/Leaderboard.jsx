import { useEffect, useState } from 'react';

const leaderboardApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function getLeaderboardRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.leaderboard)) {
    return payload.leaderboard;
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

  if (Array.isArray(payload?.data?.leaderboard)) {
    return payload.data.leaderboard;
  }

  return [];
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(leaderboardApiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for leaderboard: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        setLeaderboard(getLeaderboardRecords(payload));
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

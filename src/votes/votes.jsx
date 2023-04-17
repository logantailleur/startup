import React from 'react';

export function Votes() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/getUserVotes')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('userVotes', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('userVotes');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  let scoreRows = [];
  if (scores.length > 0) {
    var count = 0;
    for (const [i, score] of scores.entries()) {
      if (score.Restaurant !== 'restaurant') {
        scoreRows.push(
          <tr key={i}>
            <td>{score.User}</td>
            <td>{score.Restaurant}</td>
          </tr>
        );
        count = count + 1;
        if (count === 10) {
          break;
        }
      }
    }
  } else {
    scoreRows.push(
      <tr>
        <td>No votes yet</td>
        <td>Enter a vote</td>
      </tr>
    );
  }

  return (
    <main className="container-fluid secondary text-center">
      <div className="vertical-center">
        <div>
          <h1>Invididual Votes</h1>
        </div>

        <table className="table table-dark table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Restaurant</th>
            </tr>
          </thead>
          <tbody id="voteResults">{scoreRows}</tbody>
        </table>
      </div>
    </main>
  );
}

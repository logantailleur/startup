import React from 'react';

export function Results() {
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

  function updateRestResults(votes) {
    let newResults = [];
    newResults.push(getVotes(votes, "McDonald's"));
    newResults.push(getVotes(votes, "Zaxby's"));
    newResults.push(getVotes(votes, "KFC"));
    newResults.push(getVotes(votes, "Sonic"));
    newResults.push(getVotes(votes, "JCW's"));
    newResults.push(getVotes(votes, "Popeye's"));
    newResults.push(getVotes(votes, "Raising Cane's"));
    newResults.push(getVotes(votes, "Chick-fil-a"));
    return newResults;
  }

  function getVotes(votes, restName) {
    var total = 0;
    for (const [i] of votes.entries()) {
      if (votes[i].Restaurant === restName) {
        total = total + 1;
      }
    }
    return total;
  }

  let restResults = [];
  restResults = updateRestResults(scores);
  const scoreRows = [];
  const names = ["McDonald's", "Zaxby's", "KFC", "Sonic", "JCW's", "Popeye's", "Raising Cane's", "Chick-fil-a"];
  for (const[i, score] of restResults.entries()) {
    scoreRows.push(
      <tr key={i}>
        <td>{names[i]}</td>
        <td>{score}</td>
      </tr>
    )
  }

  return (
    <main className="container-fluid secondary text-center">
      <div className="vertical-center">
        <div>
          <h1>Checkout the results!</h1>
        </div>

        <table className="table table-dark table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Restaurant</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody id="userVotes">{scoreRows}</tbody>
        </table>
      </div>
    </main>
  );
}
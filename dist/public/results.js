function updateRestResults(votes) {
    let newResults = [];
    var newLine = { Restaurant: "McDonald's", Votes: getVotes(votes, "McDonald's") };
    newResults.push(newLine);

    newLine = { Restaurant: "Zaxby's", Votes: getVotes(votes, "Zaxby's") };
    newResults.push(newLine);

    newLine = { Restaurant: "KFC", Votes: getVotes(votes, "KFC") };
    newResults.push(newLine);

    newLine = { Restaurant: "Sonic", Votes: getVotes(votes, "Sonic") };
    newResults.push(newLine);

    newLine = { Restaurant: "JCW's", Votes: getVotes(votes, "JCW's") };
    newResults.push(newLine);

    newLine = { Restaurant: "Popeye's", Votes: getVotes(votes, "Popeye's") };
    newResults.push(newLine);

    newLine = { Restaurant: "Raising Cane's", Votes: getVotes(votes, "Raising Cane's") };
    newResults.push(newLine);

    newLine = { Restaurant: "Chick-fil-a", Votes: getVotes(votes, "Chick-fil-a") };
    newResults.push(newLine);

    // console.log("rest results");
    // console.log(newResults);
    return newResults;
}

function getVotes(votes, restName) {
    var total = 0;
    for (const [i, prev] of votes.entries()) {
        if (prev.Restaurant === restName) {
            total = total + 1;
        }
    }
    return total;
}

async function loadResults() {
    let scores = [];

    try {
        const response = await fetch('/api/getUserVotes');
        scores = await response.json();
        localStorage.setItem('userVotes', JSON.stringify(scores));
    } catch {
        console.log("caught at get");
        const votesText = localStorage.getItem('userVotes');
        if (votesText) {
            scores = JSON.parse(votesText);
        }
    }
    let restResults = [];
    restResults = updateRestResults(scores);

    const tableBodyEl = document.querySelector('#voteResults');

    for(const [i, score] of restResults.entries()) {
        const rest = document.createElement('td');
        const voteTotal = document.createElement('td');

        rest.textContent = score.Restaurant;
        voteTotal.textContent = score.Votes;

        const rowEl = document.createElement('tr');
        rowEl.appendChild(rest);
        rowEl.appendChild(voteTotal);

        tableBodyEl.appendChild(rowEl);
    }
}

loadResults();
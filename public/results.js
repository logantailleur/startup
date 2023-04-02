function loadResults() {
    let scores = [];
    const scoresText = localStorage.getItem('resResults');
    if (scoresText) {
        scores = JSON.parse(scoresText);
    }

    const tableBodyEl = document.querySelector('#voteResults');

    for(const [i, score] of scores.entries()) {
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
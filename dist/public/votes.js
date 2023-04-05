async function loadScores(){
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

    const tableBodyEl = document.querySelector('#userVotes');

    if (scores.length > 0) {
    var count = 0;
        for (const [i, score] of scores.entries()) {
            const user = document.createElement('td');
            const restaurant = document.createElement('td');
      
            user.textContent = score.User;
            restaurant.textContent = score.Restaurant;
      
            const rowEl = document.createElement('tr');
            rowEl.appendChild(user);
            rowEl.appendChild(restaurant);
      
            tableBodyEl.appendChild(rowEl);
            count = count + 1;
            if (count == 10) {
                break;
            }
        }
    } else {
        tableBodyEl.innerHTML = '<tr><td colSpan=2>No votes yet</td></tr>';
    }
}

loadScores();
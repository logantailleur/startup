const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

function vote() {
    var nameEl = localStorage.getItem('userName');
    var restaurant = null;
    document.getElementsByName('voteButton')
        .forEach(radio => {
            if (radio.checked) {
                restaurant = radio.value;
            }
        });
    if (nameEl.value != "" && restaurant != null && passwordEl != "") {
        saveUserVotes(nameEl.value, restaurant, passwordEl);
        updateResults();

        window.location.href = "results.html";
    }
}

function updateResults() {
    let results = [];
    let votes = [];
    const voteResults = localStorage.getItem('userVotes');
    if (voteResults) {
        votes = JSON.parse(voteResults);
    }
    restResults = this.updateRestResults(votes);
    localStorage.setItem('resResults', JSON.stringify(restResults));
}

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

async function saveUserVotes(userName, restaurant) {
    let results = [];

    //First get the results so the user can be overwritten
    try {
        const response = await fetch('api/userVotes');
        results = await response.json();
        localStorage.setItem('userVotes', JSON.stringify(results));
    } catch {
        const votesText = localStorage.getItem('userVotes');
        if (votesText) {
            results = JSON.parse(votesText);
        }
    }

    //Second update the results with the user's new vote
    results = updateUserVotes(userName, restaurant, results);

    //Third post the results
    try {
        const response = await fetch('api/userVotes', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(results),
        });
        const results = await response.json();
        localStorage.setItem('userVotes', JSON.stringify(results));
    } catch {
        localStorage.setItem('userVotes', JSON.stringify(results));
    }
}

function updateUserVotes(userName, restaurant, results) {
    const newResult = { User: userName, Restaurant: restaurant };
    const newTable = [];

    let found = false;
    if (results != null) {
        for (const [i, prevResult] of results.entries()) {
            if (userName === prevResult.User) {
                newTable.push(newResult);
                found = true;
            } else {
                newTable.push(prevResult);
            }
        }
    }
    if (!found) {
        newTable.push(newResult);
    }

    return newTable;
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
        this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
        this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === GameEndEvent) {
            this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        } else if (msg.type === GameStartEvent) {
            this.displayMsg('player', msg.from, `started a new game`);
        }
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
        `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
    const event = {
        from: from,
        type: type,
        value: value,
    };
    this.socket.send(JSON.stringify(event));
}
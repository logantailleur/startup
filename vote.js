function vote() {
    var nameEl = document.querySelector("#inputName");
    var restaurant = null;
    document.getElementsByName('voteButton')
        .forEach(radio => {
            if (radio.checked) {
                restaurant = radio.value;
            }
        });
    if (nameEl.value != ""){
        saveUserVotes(nameEl.value, restaurant);
        updateResults();
    
        window.location.href = "results.html";
    }
}

function updateResults() {
    let results = [];
    const resultsText = localStorage.getItem('results');
    if (resultsText) {
        results = JSON.parse(resultsText);
    }
    let votes = [];
    const voteResults = localStorage.getItem('userVotes');
    if (voteResults) {
        votes = JSON.parse(voteResults);
    }
    results = this.updateRestResults(results, votes);
    localStorage.setItem('resResults', JSON.stringify(results));
}

function updateRestResults(results, votes) {
    let newResults = [];
    var newLine = {Restaurant: "McDonald's", Votes: getVotes(votes, "McDonald's")};
    newResults.push(newLine);

    newLine = {Restaurant: "Zaxby's", Votes: getVotes(votes, "Zaxby's")};
    newResults.push(newLine);

    newLine = {Restaurant: "KFC", Votes: getVotes(votes, "KFC")};
    newResults.push(newLine);

    newLine = {Restaurant: "Sonic", Votes: getVotes(votes, "Sonic")};
    newResults.push(newLine);

    newLine = {Restaurant: "JCW's", Votes: getVotes(votes, "JCW's")};
    newResults.push(newLine);

    newLine = {Restaurant: "Popeye's", Votes: getVotes(votes, "Popeye's")};
    newResults.push(newLine);

    newLine = {Restaurant: "Raising Cane's", Votes: getVotes(votes, "Raising Cane's")};
    newResults.push(newLine);

    newLine = {Restaurant: "Chick-fil-a", Votes: getVotes(votes, "Chick-fil-a")};
    newResults.push(newLine);

    return newResults;
}

function getVotes(votes, restName){
    var total = 0;
    for(const [i, prev] of votes.entries()) {
        if (prev.Restaurant === restName) {
            total = total + 1;
        }
    }
    return total;
}

function saveUserVotes(userName, restaurant) {
    let results = [];
    const resultsText = localStorage.getItem('userVotes');
    if (resultsText) {
        results = JSON.parse(resultsText);
    }
    results = this.updateUserVotes(userName, restaurant, results);
    // results = null;
    localStorage.setItem('userVotes', JSON.stringify(results));
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
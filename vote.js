function vote() {
    var nameEl = document.querySelector("#inputName");
    var restaurant = null;
    document.getElementsByName('voteButton')
        .forEach(radio => {
            if (radio.checked) {
                restaurant = radio.value;
            }
        });

    updateResults(restaurant);
    saveUserVotes(nameEl.value, restaurant);

    // window.location.href = "results.html";
}

function updateResults(restaurant) {

}

function saveUserVotes(userName, restaurant) {
    let results = [];
    const resultsText = localStorage.getItem('userVotes');
    if (resultsText) {
        results = JSON.parse(resultsText);
    }
    results = this.updateUserVotes(userName, restaurant, results);
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

    if (newTable.length > 10) {
        newTable.length = 10;
    }

    return newTable;
}
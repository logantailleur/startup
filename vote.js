function vote() {
    const nameEl = document.querySelector("#name");
    if (nameEl.value != null) {
        localStorage.setItem("userName", nameEl.value);
    } else {
        localStorage.setItem("userName", "anonymous");
    }
    const restaurant = document.querySelector('.checkbox').checked;

    updateResults(nameEl, restaurant);
    updateUserVotes(nameEl, restaurant);

    window.location.href = "results.html";
}

function updateResults(nameEl, restaurant){

}

function updateUserVotes(nameEl, restaurant) {
    
}
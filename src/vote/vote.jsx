import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { VoteEvent, VoteNotifier } from "./voteNotifier";
import { Voters } from './voters';

class Voter {

  async vote(restaurant, user) {
    if (user !== "" && restaurant !== null) {
      //Save votes
      await this.saveUserVotes(user, restaurant);
      await this.updateDB(user, restaurant);
    }
  }


  updateResults() {
    let votes = [];
    const voteResults = localStorage.getItem('userVotes');
    if (voteResults) {
      votes = JSON.parse(voteResults);
    }
    let restResults = this.updateRestResults(votes);
    localStorage.setItem('resResults', JSON.stringify(restResults));
  }

  async saveUserVotes(userName, restaurant) {
    let results = [];

    //First get the results so the user can be overwritten
    try {
      const response = await fetch('/api/getUserVotes');
      results = await response.json();
      localStorage.setItem('userVotes', JSON.stringify(results));
    } catch {
      console.log("caught at get");
      const votesText = localStorage.getItem('userVotes');
      if (votesText) {
        results = JSON.parse(votesText);
      }
    }

    //Second update the results with the user's new vote
    results = this.updateUserVotes(userName, restaurant, results);
    return results;

  }

  async updateDB(nameEl, restaurant) {
    //Third post the results
    const newResult = { User: nameEl, Restaurant: restaurant };
    try {
      await fetch('/api/updateUserVotes', {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newResult),
      });
    } catch {
      console.log("caught at post");
    }
  }

  updateUserVotes(userName, restaurant, results) {
    const newResult = { User: userName, Restaurant: restaurant };
    const newTable = [];

    let found = false;
    if (results != null) {
      for (const [prevResult] of results.entries()) {
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

    localStorage.setItem('userVotes', JSON.stringify(newTable));
    return newTable;
  }
}

export function Vote(props) {
  const [restaurantChoice, setRest] = useState(props.restaurant);

  const voter = new Voter();

  async function sendVote() {
    const user = props.userName;
    if (user) {
      voter.vote(restaurantChoice, user);
    }
  }

  VoteNotifier.broadcastEvent(props.userName, VoteEvent.Start, {});

  return (
    <main className="container-fluid secondary">
      <div className="vertical-center text-center">
        <div>
          <h1>Welcome</h1>
          <p>Vote for your favorite!</p>
        </div>

        <div>
          <form action="vote" className="checkbox">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="McDonald's"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant1"> McDonald's </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="Zaxby's"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant2"> Zaxby's </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="KFC"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant3"> KFC </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="Sonic"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant4"> Sonic </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="JCW's"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant5"> JCW's </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="Popeye's"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant6"> Popeye's</label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="Raising Cane's"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant7"> Raising Cane's </label><br />
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="voteButton"
                value="Chick-fil-a"
                onChange={(e) => setRest(e.target.value)}
              />
              <label className="form-check-label" for="restaurant8"> Chick-fil-a </label><br />
            </div>
            <Button className="btn" onClick={() => sendVote()}>
              <span className="btn-text-one">Submit</span>
              <span className="btn-text-two">Great!</span>
            </Button>
          </form>
          <div className="voters">
            {/* <h2>Recent Votes</h2> */}
            <Voters userName={props.userName}/>
          </div>
        </div>
      </div>
    </main>
  );
}
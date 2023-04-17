import React from 'react';

import { VoteEvent, VoteNotifier } from './voteNotifier';

export function Voters(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        VoteNotifier.addHandler(handleVoteEvent);

        return () => {
            VoteNotifier.removeHandler(handleVoteEvent);
        };
    });

    function handleVoteEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === VoteEvent.End) {
                message = ` left pollroom`;
            } else if (event.type === VoteEvent.Start) {
                message = ` entered voting room`;
            } else if (event.type === VoteEvent.System) {
                message = event.value.msg;
            }

            messageArray.push(
                <div key={i} className='event'>
                    <span className={'player-event'}>{event.from.split('@')[0]}</span>
                    {message}
                </div>
            );
            return messageArray;
        }
    }

    return (
        <div className='players'>
            Current User:
            <span className='player-name'>{" " + userName}</span>
            <div id='player-messages'>{createMessageArray()}</div>
        </div>
    );
}
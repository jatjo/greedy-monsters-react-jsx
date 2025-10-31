const GameDescription = () => {
    return (
        <div>
            <p>
                Greedy Monsters is a zero-player game in which a set number of monsters compete for
                calories.
            </p>
            <p>
                When a monster has no calories left, it is dead.
                The last monster left is the winner of the game.
            </p>
            <p>
                Each monster get 5 calories at the start of the game.
                The monsters will take turns in a round competing for calories.
                For each round, the following steps will be performed for each monster:
            </p>

            <ul>
                <li>A monster awakens and consumes one calorie.</li>
                <li>It is fed with an arbitrary number of calories between 1 and 3.</li>
                <li>There is a 20% chance that these calories are toxic.
                    If so, they are subtracted from the monster's calories.
                </li>
                <li>There is a 50% chance that this monster will steal half the calories of
                    another sleeping monster. Only one monster can steal for in each round.
                </li>
                <li>The monster goes back to sleep.</li>
            </ul>

            <p>
                When a new round starts, the monster with the least calories will wake up first.
            </p>
        </div>
    )
};

export default GameDescription;
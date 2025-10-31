import {useState, useRef, useContext} from "react";
import {MonsterConfigurationContext} from "../contexts/MonsterConfigurationContext.jsx";

const useMonsters = () => {
    const [monsters, setMonsters] = useState([]);
    const hasStealed = useRef(false);

    const {monsterConfig} = useContext(MonsterConfigurationContext);

    const gameStart = () => {
        const newMonsters = [];
        for (let monsterNo = 0; monsterNo < monsterConfig; monsterNo++) {
            newMonsters[monsterNo] = {
                id: monsterNo + 1,
                round: 0,
                consumed: 0,
                fed: 0,
                poisonous: 0,
                stole: 0,
                stolenFrom: 0,
                calories: 5,
                dead: false
            }
        }

        setMonsters(newMonsters);
    };

    const nextRound = (currentRound) => {
        hasStealed.current = false;

        const modifiedMonsters = monsters
            .sort((a, b) => a.calories - b.calories)
            .map(monster => {
                if (monster.dead) {
                    return monster;
                }
                return {...wakeUp(monster, currentRound)};
            })
            .sort((a, b) => b.round - a.round)
            .sort((a, b) => b.calories - a.calories);

        setMonsters(modifiedMonsters);
    };

    const gameOver = () => {
        return monsters.filter(monster => monster.dead === false).length === 1;
    }

    const wakeUp = (monster, currentRound) => {
        monster.round = currentRound;

        if (monster.calories <= 0) {
            monster.calories = 0;
            monster.dead = true;

            return monster;
        }

        // Burn one calorie due to wakeup
        monster.calories--;
        monster.consumed += 1;

        let caloriesToBeFed = Math.floor(Math.random() * 4)

        // 20% chance of calories to be poisonous
        if (caloriesToBeFed > 0 && Math.floor(Math.random() * 100) < 20) {
            // poisonous
            monster.poisonous += caloriesToBeFed;
            caloriesToBeFed = caloriesToBeFed * -1;
        }

        monster.fed += caloriesToBeFed;
        monster.calories = monster.calories + caloriesToBeFed;

        // unless a monster has already stolen from another monster in the current round,
        // the chance of stealing from another monster is 50-50
        if (!hasStealed.current && Math.floor(Math.random() * 100) < 50) {
            // select a random monster
            var monsterToStealFrom = monsters[Math.floor(Math.random() * monsters.length)];

            // if selected monster to steal from is not the same monster as is trying to steal, and it has more than 0
            // calories and is not dead it can be stealed from
            if (monsterToStealFrom.id !== monster.id && monsterToStealFrom.calories > 0 && !monsterToStealFrom.dead) {
                hasStealed.current = true;
                // Only half of the calories can be stoled
                var caloriesToSteal = Math.floor(monsterToStealFrom.calories / 2);
                monster.calories += caloriesToSteal;
                monster.stole += caloriesToSteal;
                monsterToStealFrom.calories -= caloriesToSteal;
                monsterToStealFrom.stolenFrom += caloriesToSteal;
            }
        }

        if (monster.calories <= 0) {
            monster.calories = 0;
            monster.dead = true;
        }

        return monster;
    }

    return {monsters, gameStart, nextRound, gameOver};
}

export default useMonsters;
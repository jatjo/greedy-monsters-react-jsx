import styles from "./MonsterRow.module.css";

import monster_1 from "/images/monster-1.png";
import monster_1_dead from "/images/monster-1-dead.png";
import monster_2 from "/images/monster-2.png";
import monster_2_dead from "/images/monster-2-dead.png";
import monster_3 from "/images/monster-3.png";
import monster_3_dead from "/images/monster-3-dead.png";
import monster_4 from "/images/monster-4.png";
import monster_4_dead from "/images/monster-4-dead.png";
import monster_5 from "/images/monster-5.png";
import monster_5_dead from "/images/monster-5-dead.png";
import monster_6 from "/images/monster-6.png";
import monster_6_dead from "/images/monster-6-dead.png";
import monster_7 from "/images/monster-7.png";
import monster_7_dead from "/images/monster-7-dead.png";
import monster_8 from "/images/monster-8.png";
import monster_8_dead from "/images/monster-8-dead.png";

const MonsterRow = ({monster}) => {
    let monsterImage;

    switch (monster.id) {
        case 1:
            monsterImage = monster.dead ? monster_1_dead : monster_1;
            break;
        case 2:
            monsterImage = monster.dead ? monster_2_dead : monster_2;
            break;
        case 3:
            monsterImage = monster.dead ? monster_3_dead : monster_3;
            break;
        case 4:
            monsterImage = monster.dead ? monster_4_dead : monster_4;
            break;
        case 5:
            monsterImage = monster.dead ? monster_5_dead : monster_5;
            break;
        case 6:
            monsterImage = monster.dead ? monster_6_dead : monster_6;
            break;
        case 7:
            monsterImage = monster.dead ? monster_7_dead : monster_7;
            break;
        case 8:
            monsterImage = monster.dead ? monster_8_dead : monster_8;
            break;
    }

    return (<tr className={monster.dead ? 'table-danger' : ''}>
            <td><img src={monsterImage} className={styles.row}/></td>
            <td>{monster.round}</td>
            <td>{monster.fed}</td>
            <td>{monster.stole - monster.stolenFrom}</td>
            <td>{monster.calories}</td>
        </tr>);
}

export default MonsterRow;
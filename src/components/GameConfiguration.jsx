import {useState, useContext} from "react";
import Form from 'react-bootstrap/Form';
import {MonsterConfigurationContext} from "../contexts/MonsterConfigurationContext.jsx";

const GameConfiguration = ({delayChangeHandler, defaultDelay}) => {
    const { monsterConfig, handleMonsterConfigChange } = useContext(MonsterConfigurationContext);

    const [delay, setDelay] = useState(defaultDelay);

    const handleMonsterNumChange = (e) => {
        handleMonsterConfigChange(e.target.value);
    };

    const handleMonsterDelayChange = (e) => {
        setDelay(e.target.value);
        delayChangeHandler(e.target.value);
    };

    return (
        <div>
            <Form.Label>
                Number of monsters {monsterConfig}
            </Form.Label>
            <Form.Range
                value={monsterConfig}
                min="3"
                max="8"
                step="1"
                onChange={handleMonsterNumChange}/>
            <Form.Label>
                Delay in ms: {delay}
            </Form.Label>
            <Form.Range
                value={delay}
                min="0"
                max="1000"
                step="100"
                onChange={handleMonsterDelayChange}/>
        </div>
    )
};

export default GameConfiguration;
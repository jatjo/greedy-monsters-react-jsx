import {useContext} from "react";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import {MonsterConfigurationContext} from "../../contexts/MonsterConfigurationContext.jsx";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

const MonsterConfiguration = () => {
    const {monsterConfig, handleMonsterConfigChange} = useContext(MonsterConfigurationContext);

    const handleMonsterNumChange = (e) => {
        handleMonsterConfigChange(e.target.value);
    };

    return (<Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Monster Configuration</Accordion.Header>
            <Accordion.Body>
                By default 5 monsters will play. This value can be changed by modifying the slider below.
                <Form>
                    <Form.Group as={Row} controlId="config">
                        <Form.Label column sm="4">
                            Number of monsters {monsterConfig}
                        </Form.Label>
                        <Col sm="5" className="pt-2">
                            <Form.Range
                                value={monsterConfig}
                                min="3"
                                max="8"
                                step="1"
                                onChange={handleMonsterNumChange}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>)
};

export default MonsterConfiguration;
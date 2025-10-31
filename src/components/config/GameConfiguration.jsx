import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Accordion from "react-bootstrap/Accordion";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GameConfiguration = ({delayChangeHandler, defaultDelay}) => {
    const [delay, setDelay] = useState(defaultDelay);

    const handleMonsterDelayChange = (e) => {
        setDelay(e.target.value);
        delayChangeHandler(e.target.value);
    };

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Game Configuration</Accordion.Header>
                <Accordion.Body>
                    Between each round there is a 100ms delay. This value can be changed runtime by modifying the
                    slider below.
                    <Form>
                        <Form.Group as={Row} controlId="delay">
                            <Form.Label column sm="4">
                                Delay in ms: {delay}
                            </Form.Label>
                            <Col sm="5" className="pt-2">
                                <Form.Range
                                    value={delay}
                                    min="0"
                                    max="1000"
                                    step="100"
                                    onChange={handleMonsterDelayChange}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
};

export default GameConfiguration;
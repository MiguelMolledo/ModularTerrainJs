import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
    const nav = useNavigate();
    const navigate = () => (nav('/dashboard'));

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow" style={{ width: '400px' }}>
                {/* Row 1: Title */}
                <Row className="mb-4">
                    <Col className="text-center">
                        <h2>Login</h2>
                    </Col>
                </Row>

                {/* Row 2: Username Input */}
                <Row className="mb-3">
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-person"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {/* Row 3: Password Input */}
                <Row className="mb-3">
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-lock"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {/* Row 4: Login Button */}
                <Row>
                    <Col className="text-center">
                        <Button onClick={navigate} className="w-100" variant="primary">Login</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default LoginPage;

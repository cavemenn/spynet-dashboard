import { Button, Container, Form } from "react-bootstrap";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const isUsernameCorrect = username === "john@mail.com";
        const isPasswordCorrect = password === "admin";

        if (isUsernameCorrect && isPasswordCorrect) {
            authContext.setToken("1234");
            navigate("/dashboard");
        }
    }

    return (
        <Container>
        <h1 className="my-3">Login Page</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll share ALL your privacy data with everyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={login}>
                Submit
            </Button>
        </Form>
        </Container>
  );
}

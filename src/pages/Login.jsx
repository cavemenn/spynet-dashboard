import { Button, Container, Form } from "react-bootstrap";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const users = [
    {
        username: "john@mail.com",
        password: "admin",
        role: "admin"
    },
    {
        username: "guest@mail.com",
        password: "guest",
        role: "guest"
    }
];

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const findWhichUser = users.find((user) => user.username === username && user.password === password);

        if (findWhichUser) {
            authContext.setToken("1234");
            localStorage.setItem("role", findWhichUser.role);
            navigate("/dashboard");
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="position-relative w-100" style={{ maxWidth: "600px" }}>

                <div className="text-center position-absolute w-100" style={{ bottom: "90%", left: 0 }}>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ width: "300px", height: "auto" }}
                    />
                </div>

                <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "600px" }}>
                    <h1 className="mb-3 text-center">Login Credentials</h1>
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

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" size="lg" onClick={login}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>

            </div>
            
        </Container>
  );
}

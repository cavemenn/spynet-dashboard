import { Container, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <img
        src="/errorNotFound.webp"
        alt="Error"
        style={{ width: "auto", height: "auto" }}
      />
      <Button 
        variant="danger" 
        className="mt-3" 
        onClick={() => navigate('/')}>
        Go Back to Login
      </Button>
    </Container>
  );
}
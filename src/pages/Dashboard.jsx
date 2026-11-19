import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  }

  return (
    <Container>
      <h1 className="my-3">Dashboard Page</h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
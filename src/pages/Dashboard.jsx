import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import devices from "../data/devices.json";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  }

  return (
    <Container>
      <h1 className="my-3" style={{ color: "white" }}>
        Dashboard Page
      </h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>

      <div
        className="af-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
          color: "white",
        }}
      >
        {devices.map((device) => (
          <div key={device.id} className="af-grid-item">
            <img
              src={device.image}
              alt={device.location}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{device.location}</h3>
            <p>Status: {device.status}</p>
            <p>Message: {device.message}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
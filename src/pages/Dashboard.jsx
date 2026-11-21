import { Container, Button, Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthContext } from "../AuthContext";

import devices from "../data/devices.json";

export default function Dashboard() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [deviceList, setDeviceList] = useLocalStorage("deviceList", devices);

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin"; // Check if the user is an admin

  const handleLogout = () => {
    authContext.setToken(null);
    localStorage.removeItem("role");
    navigate("/"); 
  }

  const handleDeviceToggle = (deviceId) => {
    // Implementation for toggling device status

    if (!isAdmin) {
      alert("You do not have permission to perform this action.");
      return;
    }

    const updatedDevices = deviceList.map((device) => {
      if (device.id === deviceId) {
        if (device.status === "Online") {
          return { ...device, status: "Offline", message: "Turned off" };
        } else {
          return { ...device, status: "Online", message: "Recording" };
        }
      }
      return device;
    });
    setDeviceList(updatedDevices);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="my-3" style={{ color: "white" }}>
          Welcome to SpyNet, You have the power of a {role.toUpperCase()}
        </h1>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

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
        {deviceList.map((device) => (
          <Card key={device.id} className="af-grid-item">
            <Card.Img
              variant="top"
              src={device.image}
              alt={device.location}
              style={{height: "180px", objectFit: "cover"}}
            />
            <CardBody className="d-flex flex-column">
              <Card.Title>{device.location}</Card.Title>
              <Card.Text className="mb-1">Status: {device.status}</Card.Text>
              <Card.Text>Message: {device.message}</Card.Text>
              <Button 
                variant={device.status === "Online" ? "danger" : "success"}
                onClick={() => handleDeviceToggle(device.id)}
                >
                  {device.status === "Online" ? "Turn Off" : "Turn On"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
}
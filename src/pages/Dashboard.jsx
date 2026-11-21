import { Container, Button } from "react-bootstrap";
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
          return { ...device, status: "Online", message: "Turned on" };
        }
      }
      return device;
    });
    setDeviceList(updatedDevices);
  };

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
        {deviceList.map((device) => (
          <div key={device.id} className="af-grid-item">
            <img
              src={device.image}
              alt={device.location}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{device.location}</h3>
            <p>Status: {device.status}</p>
            <p>Message: {device.message}</p>
            <Button onClick={() => handleDeviceToggle(device.id)}>
              {device.status === "Online" ? "Turn Off" : "Turn On"}
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
}
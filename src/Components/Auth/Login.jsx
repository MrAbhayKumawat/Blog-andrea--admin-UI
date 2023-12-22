import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../Auth/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formdata, setFormdata] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [Loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://andrea-moore-2ec77-default-rtdb.firebaseio.com/andrea-moore.json"
        );
        const data = await response.json();
        setFormdata(Object.values(data));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setShowError(true);
      return;
    }

    setLoader(true);

    try {
      const user = formdata.find(
        (userData) => userData.user === username && userData.pass === password
      );

      if (user) {
        setLoggedIn(true);
        console.log("Login successful");
        setLoader(true);
        setTimeout(() => {
          navigate("/Posts", { state: { adminLogin: true } });
        }, 1000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle other errors if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login-form">
      {loggedIn ? (
        Loader ? (
          <div className="loader"></div>
        ) : (
          false
        )
      ) : (
        <form className="form-sec" onSubmit={handleLogin}>
          <h1 style={{ fontWeight: "700" }}>Admin Panel</h1>
          <br />
          <div className="input-container">
            <input
              type="text"
              id="name"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            {/* Loader */}
          </div>
          <div>
            {showError && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  {loading
                    ? "Logging in..."
                    : "Invalid username or password. Please try again."}
                </Alert>
              </Stack>
            )}
          </div>
          <br />
          <button type="submit" className="submit" style={{ margin: "auto" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;

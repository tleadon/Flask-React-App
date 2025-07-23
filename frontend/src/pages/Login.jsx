import { useContext, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";

const Login = () => {
  const [apiKey, setApiKey] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        setApiKey(data.api_key);
        console.log("API Key:", apiKey);
      } else {
        // Safely try to parse JSON error message
        let errorData = { message: "Unknown error occurred" };
        try {
          errorData = await response.json();
        } catch (err) {
          console.error("Error parsing JSON response:", err);
          const fallbackText = await response.text();
          console.warn("Fallback error text:", fallbackText);
          errorData.message = fallbackText || "No error message provided.";
        }
        setError(errorData.message);
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Enter your username
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Enter your password
          </FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {apiKey && (
        <p>
          API Key:
          <br />
          <span style={{ color: "green" }}>{apiKey}</span>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;

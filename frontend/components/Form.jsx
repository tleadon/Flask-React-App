import { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";

export default function Form() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted value:", inputValue);
    setLoading(true);
    fetch(`http://localhost:5000/nib_num/${inputValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        setResult(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl style={{ width: "100%", paddingBottom: "1em" }}>
          <InputLabel htmlFor="my-input">API Key</InputLabel>
          <Input
            id="my-input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor="my-input">NIB Number</InputLabel>
          <Input
            id="my-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Enter NIB Number for information about a particular person.
          </FormHelperText>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1em" }}
          >
            Submit
          </Button>
        </FormControl>
      </form>
      {loading && <p style={{ color: "blue" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <table
          style={{
            marginTop: "2em",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              {Object.keys(result).map((key) => (
                <th
                  key={key}
                  style={{ border: "1px solid #ccc", padding: "0.5em" }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(result).map((value, idx) => (
                <td
                  key={idx}
                  style={{ border: "1px solid #ccc", padding: "0.5em" }}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

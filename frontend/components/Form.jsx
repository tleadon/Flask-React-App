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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Submitted value:", inputValue);
    fetch(`http://localhost:8000/nib_num/${inputValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer c929a88edb9ad6a7c00bd839dcaf115906b3ce531a59802e628efcd446a2f09f`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        setResult(data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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

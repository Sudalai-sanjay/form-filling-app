
import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "", department: "", className: "", year: "",
    college: "", gmail: "", regNo: "", address: ""
  });

  const [generatedId, setGeneratedId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/submit", formData);
    setGeneratedId(res.data.id);
  };

  const retrieve = async () => {
    try {
      const res = await axios.get("http://localhost:5000/retrieve/" + searchId);
      setResult(res.data);
    } catch {
      setResult("ID not found");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Student Form Filling Application</h1>

        {Object.keys(formData).map((key) => (
          <input key={key} name={key} placeholder={key} onChange={handleChange} />
        ))}

        <button onClick={submit}>Submit</button>
        {generatedId && <p className="success">Generated ID: {generatedId}</p>}

        <hr />

        <h2>Retrieve Data</h2>
        <input placeholder="Enter ID" onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={retrieve}>Retrieve</button>

        {typeof result === "string" ? (
          <p className="error">{result}</p>
        ) : (
          result && Object.entries(result).map(([k, v]) => (
            <p key={k}><strong>{k}:</strong> {v}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

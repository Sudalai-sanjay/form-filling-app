
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Sudalai:Sanjay@cluster0.bbpa5kd.mongodb.net/studentFormDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

const formSchema = new mongoose.Schema({
  customId: { type: String, unique: true },
  name: String,
  department: String,
  className: String,
  year: String,
  college: String,
  gmail: String,
  regNo: String,
  address: String,
});

const Form = mongoose.model("Form", formSchema);

app.post("/submit", async (req, res) => {
  try {
    const cleanName = req.body.name.toLowerCase().replace(/\s+/g, "");
    let customId;
    let exists = true;

    while (exists) {
      const randomNumber = Math.floor(100 + Math.random() * 900);
      customId = cleanName + randomNumber;
      const existing = await Form.findOne({ customId });
      if (!existing) exists = false;
    }

    const form = new Form({ ...req.body, customId });
    await form.save();

    res.json({ id: customId });
  } catch {
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/retrieve/:id", async (req, res) => {
  const data = await Form.findOne({ customId: req.params.id });
  if (!data) return res.status(404).json({ message: "ID not found" });
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));

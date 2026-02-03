const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const DATA_FILE = process.env.DATA_FILE || "issues.json";
const dataPath = path.resolve(__dirname, DATA_FILE);

const app = express();
app.use(cors());
app.use(express.json());

function readData() {
  try {
    if (!fs.existsSync(dataPath)) return [];
    const raw = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    console.error("readData error", e);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("writeData error", e);
  }
}

app.get("/issues", (req, res) => {
  res.json(readData());
});

app.post("/issues", (req, res) => {
  const issues = readData();
  const { title, description, status } = req.body;
  const id = Date.now().toString();
  const issue = {
    id,
    title: title || "Untitled",
    description: description || "",
    status: status || "open",
    createdAt: new Date().toISOString(),
  };
  issues.unshift(issue);
  writeData(issues);
  res.status(201).json(issue);
});

app.put("/issues/:id", (req, res) => {
  const issues = readData();
  const idx = issues.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const updated = { ...issues[idx], ...req.body, id: issues[idx].id };
  issues[idx] = updated;
  writeData(issues);
  res.json(updated);
});

app.delete("/issues/:id", (req, res) => {
  const issues = readData();
  const idx = issues.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  issues.splice(idx, 1);
  writeData(issues);
  res.json({ deleted: true });
});

app.listen(PORT, () =>
  console.log(`Issue-tracker server listening on ${PORT}`),
);

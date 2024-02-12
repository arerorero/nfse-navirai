import express from "express";
import { baixaPDF } from "./baixaPDF.js";

const app = express();
const port = 3000;
app.use(express.json());

app.post("/baixarPDF", async (req, res) => {
  const { user, password, nf } = req.body;
  const resposta = await baixaPDF(user, password, nf);
  res.json({ link: resposta });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

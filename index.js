import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// 👇 caminho correto do HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 ISSO RESOLVE A PÁGINA EM BRANCO
app.use(express.static(__dirname));

// 🔑 TELEGRAM
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// 📤 enviar mensagem
app.post("/enviar", async (req,res)=>{

  const { mensagem } = req.body;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: mensagem
    })
  });

  res.json({ ok:true });
});

// 🚀 IMPORTANTE PRA CELULAR
app.listen(3000, "0.0.0.0", ()=>{
  console.log("APP rodando em http://localhost:3000");
});
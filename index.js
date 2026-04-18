import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// 🔑 TELEGRAM
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// =======================
// 📊 ANALISE SIMPLES
// =======================
function analisar(casa, fora){

  const fCasa = casa.length % 5 + 1;
  const fFora = fora.length % 5 + 1;

  const total = fCasa + fFora;

  let texto = `🔥 ENTRADA IA\n\n⚽ ${casa} vs ${fora}\n\n`;

  if(total >= 6) texto += "💣 Over 2.5 gols\n";
  if(fCasa >= 3 && fFora >= 3) texto += "🤝 Ambas marcam\n";

  if(total >= 6) texto += "🚩 +8.5 escanteios\n";
  if(total >= 5) texto += "🟨 +3.5 cartões\n";

  if(fCasa > fFora) texto += `🏆 Vitória ${casa}\n`;
  else if(fFora > fCasa) texto += `🏆 Vitória ${fora}\n`;
  else texto += "⚖️ Jogo equilibrado\n";

  return texto;
}

// =======================
// 📤 ENVIAR TELEGRAM
// =======================
async function enviar(msg){
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg
    })
  });
}

// =======================
// 🌐 ROTA APP
// =======================
app.get("/", (req,res)=>{

  res.send(`
  <html>
  <head>
  <title>IA Futebol</title>
  <style>
    body { font-family: Arial; background:#0f172a; color:white; text-align:center; padding:20px;}
    input { width:90%; padding:10px; margin:5px; border-radius:8px; border:none;}
    button { width:90%; padding:12px; margin:5px; border-radius:8px; border:none; font-weight:bold;}
    .btn { background:#22c55e; color:black;}
  </style>
  </head>
  <body>

  <h1>🔥 IA Futebol</h1>

  <input id="casa" placeholder="Time da casa">
  <input id="fora" placeholder="Time visitante">

  <button class="btn" onclick="enviar()">📤 Enviar</button>

  <script>
    async function enviar(){
      const casa = document.getElementById("casa").value;
      const fora = document.getElementById("fora").value;

      await fetch("/api", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ casa, fora })
      });

      alert("Enviado pro Telegram!");
    }
  </script>

  </body>
  </html>
  `);
});

// =======================
// 🔥 API
// =======================
app.post("/api", async (req,res)=>{
  const { casa, fora } = req.body;

  const msg = analisar(casa, fora);

  await enviar(msg);

  res.json({ ok:true });
});

// =======================
// 🚀 START
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Rodando 🚀");
});
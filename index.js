app.get("/", (req,res)=>{
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>IA Futebol</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      body {
        margin:0;
        font-family: Arial;
        background: #0f172a;
        color: white;
        text-align:center;
      }

      h1 {
        margin-top: 20px;
        color: #22c55e;
      }

      .container {
        padding:20px;
      }

      input {
        width: 90%;
        padding: 15px;
        margin:10px;
        border-radius: 10px;
        border: none;
        font-size:16px;
      }

      button {
        width: 90%;
        padding: 15px;
        margin:10px;
        border-radius: 10px;
        border: none;
        font-size:18px;
        font-weight: bold;
        background: #22c55e;
        color: black;
      }

      .resultado {
        margin-top:20px;
        background:#1e293b;
        padding:15px;
        border-radius:10px;
      }
    </style>
  </head>

  <body>

    <h1>🔥 IA Futebol</h1>

    <div class="container">
      <input id="casa" placeholder="Time da casa">
      <input id="fora" placeholder="Time visitante">

      <button onclick="enviar()">📤 Enviar para Telegram</button>

      <div id="res" class="resultado"></div>
    </div>

    <script>
      async function enviar(){
        const casa = document.getElementById("casa").value;
        const fora = document.getElementById("fora").value;

        document.getElementById("res").innerHTML = "⏳ Enviando...";

        const r = await fetch("/enviar", {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({ casa, fora })
        });

        document.getElementById("res").innerHTML = "✅ Enviado com sucesso!";
      }
    </script>

  </body>
  </html>
  `);
});
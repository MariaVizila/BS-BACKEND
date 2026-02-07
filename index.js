import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  const msg = req.body.message;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a Roblox Lua scripting expert who helps users write clean and optimized Roblox Lua code." },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "⚠️ No response" });
  } catch {
    res.json({ reply: "❌ Error connecting to AI." });
  }
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));

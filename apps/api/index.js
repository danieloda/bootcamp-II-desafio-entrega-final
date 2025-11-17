import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());

const API_URL = "https://api.football-data.org/v4/competitions/BSA";

async function fetchAPI(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_API_KEY,
    },
  });
  return response.json();
}

// ==============================
// LISTAR COMPETIÇÕES
// ==============================
app.get("/api/competitions", async (req, res) => {
  try {
    const data = await fetchAPI("/matches");
    res.json(data);
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});

// ==============================
// PARTIDAS DA RODADA ATUAL
// ==============================
app.get("/api/matches", async (req, res) => {
  try {
    const comp = await fetchAPI(""); // dados da competição
    const round = comp.currentSeason.currentMatchday;

    const allMatches = await fetchAPI("/matches");

    const matchesToday = allMatches.matches.filter(
      (m) => m.matchday === round
    );

    res.json({
      ok: true,
      round,
      total: matchesToday.length,
      matches: matchesToday,
    });
  } catch (error) {
    res.json({ ok: false, error: error.message });
  }
});

export default app;

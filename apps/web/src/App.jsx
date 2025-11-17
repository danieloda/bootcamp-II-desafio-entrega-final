import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/matches`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) throw new Error(json.error);
        setData(json);
      })
      .catch((err) => setError(err.message));
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      background: "#f5f5f5",
      minHeight: "100vh",
    },
    title: {
      fontSize: "32px",
      fontWeight: 700,
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "18px",
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "white",
      padding: "15px",
      borderRadius: "12px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    vs: {
      fontSize: "20px",
      fontWeight: 600,
      margin: "10px 0",
    },
    crest: {
      width: "60px",
      height: "60px",
      objectFit: "contain",
    },
    teamName: {
      fontSize: "16px",
      fontWeight: 600,
      textAlign: "center",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Brasileirão Série A</h1>

      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {!data && !error && <p>Carregando rodada atual...</p>}

      {data?.ok && (
        <>
          <p style={styles.subtitle}>Rodada atual: {data.round}</p>

          <div style={styles.grid}>
            {data.matches.map((m) => (
              <div key={m.id} style={styles.card}>
                <img src={m.homeTeam.crest} style={styles.crest} />
                <div style={styles.teamName}>{m.homeTeam.name}</div>

                <div style={styles.vs}>vs</div>

                <img src={m.awayTeam.crest} style={styles.crest} />
                <div style={styles.teamName}>{m.awayTeam.name}</div>

                <p style={{ marginTop: "10px", opacity: 0.7 }}>
                  Rodada {m.matchday} • {new Date(m.utcDate).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

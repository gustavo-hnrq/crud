const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(
  "../banco/database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
      console.log("Conectado ao banco de dados SQLite");
    }
  }
);

// Rota de login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM professor WHERE email = ? AND senha = ?",
    [email, senha],
    (err, row) => {
      if (err) {
        console.error("Erro ao buscar professor:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      if (row) {
        res.json({ message: "Login bem-sucedido" });
      } else {
        res.status(401).json({ error: "Credenciais inválidas" });
      }
    }
  );
});

// Rotas CRUD para turmas
app.get("/api/turmas", (req, res) => {
  db.all("SELECT * FROM turmas", (err, rows) => {
    if (err) {
      console.error("Erro ao buscar turmas:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.delete("/api/turmas/:id", (req, res) => {
  const { id } = req.params;

  // Verificar se existem tarefas associadas a essa turma
  db.get(
    "SELECT COUNT(*) AS count FROM tarefas WHERE turma_id = ?",
    id,
    (err, row) => {
      if (err) {
        console.error("Erro ao verificar tarefas da turma:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }

      // Se houver tarefas associadas, retornar erro
      if (row.count > 0) {
        res
          .status(400)
          .json({
            error:
              "Não é possível excluir a turma pois há tarefas associadas a ela.",
          });
        return;
      }

      // Se não houver tarefas associadas, deletar a turma normalmente
      db.run("DELETE FROM turmas WHERE id = ?", id, function (err) {
        if (err) {
          console.error("Erro ao deletar turma:", err.message);
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ changes: this.changes });
      });
    }
  );
});

app.post("/api/turmas", (req, res) => {
  const { nome, professor_id } = req.body;
  db.run(
    "INSERT INTO turmas (nome, professor_id) VALUES (?, ?)",
    [nome, professor_id],
    function (err) {
      if (err) {
        console.error("Erro ao inserir turma:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Rotas CRUD para tarefas
app.get("/api/tarefas", (req, res) => {
  db.all("SELECT * FROM tarefas", (err, rows) => {
    if (err) {
      console.error("Erro ao buscar tarefas:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/tarefas", (req, res) => {
  const { descricao, turma_id } = req.body;
  db.run(
    "INSERT INTO tarefas (descricao, turma_id) VALUES (?, ?)",
    [descricao, turma_id],
    function (err) {
      if (err) {
        console.error("Erro ao inserir tarefa:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Rota para obter as tarefas de uma turma específica
app.get("/api/turmas/:id/tarefas", (req, res) => {
  const { id } = req.params;
  db.all("SELECT * FROM tarefas WHERE turma_id = ?", id, (err, rows) => {
    if (err) {
      console.error("Erro ao buscar tarefas da turma:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar uma tarefa a uma turma específica
app.post("/api/turmas/:id/tarefas", (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;
  db.run(
    "INSERT INTO tarefas (descricao, turma_id) VALUES (?, ?)",
    [descricao, id],
    function (err) {
      if (err) {
        console.error("Erro ao inserir tarefa:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Rota para deletar uma tarefa específica de uma turma
app.delete("/api/turmas/:turmaId/tarefas/:tarefaId", (req, res) => {
  const { turmaId, tarefaId } = req.params;
  db.run(
    "DELETE FROM tarefas WHERE id = ? AND turma_id = ?",
    [tarefaId, turmaId],
    function (err) {
      if (err) {
        console.error("Erro ao deletar tarefa:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});

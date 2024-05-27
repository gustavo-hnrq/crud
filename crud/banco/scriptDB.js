const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite");
  }
});

const createTables = `
  CREATE TABLE IF NOT EXISTS professor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    professor_id INTEGER,
    FOREIGN KEY(professor_id) REFERENCES professor(id)
  );

  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    turma_id INTEGER,
    FOREIGN KEY(turma_id) REFERENCES turmas(id)
  );
`;

const insertData = `
  INSERT INTO professor (nome, email, senha) VALUES
  ('Professor', 'professor@gmail.com', 'senha');

  INSERT INTO turmas (nome, professor_id) VALUES
  ('Turma 1', 1),
  ('Turma 2', 1),
  ('Turma 3', 1),
  ('Turma 4', 1),
  ('Turma 5', 1);

  INSERT INTO tarefas (descricao, turma_id) VALUES
  ('Tarefa 1', 1),
  ('Tarefa 2', 2),
  ('Tarefa 3', 3),
  ('Tarefa 4', 4),
  ('Tarefa 5', 5);
`;

db.serialize(() => {
  db.exec(createTables, (err) => {
    if (err) {
      console.error("Erro ao criar tabelas:", err.message);
    } else {
      console.log("Tabelas criadas com sucesso");
    }
  });

  db.exec(insertData, (err) => {
    if (err) {
      console.error("Erro ao inserir dados:", err.message);
    } else {
      console.log("Dados inseridos com sucesso");
    }
  });
});

// Fechar a conexão com o banco de dados
db.close();

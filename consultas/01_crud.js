// CRUD básico na coleção alunos (documento embutido)
// Antes, povoe a coleção com dados/alunos.json (veja o README).

use sistemaEnsino

db.createCollection("alunos")

// Inserir um novo aluno
db.alunos.insertOne({
  "matricula": "2026007",
  "nome": "Robson Fidalgo",
  "curso": "Ciência da Computação",
  "semestre": 4,
  "disciplinas": [
    { "codigo": "BD01", "nome": "Banco de Dados", "nota": 10.0, "status": "Aprovado" }
  ]
})

// Procurar o aluno com a matrícula 2026007
db.alunos.find({ matricula: "2026007" })

// Procurar só o nome do aluno com a matrícula 2026007
db.alunos.find({ matricula: "2026007" }, { _id: 0, nome: 1 })

// Alterar o nome do aluno com a matrícula 2026007
db.alunos.updateOne(
  { matricula: "2026007" },
  { $set: { nome: "Robson do Nascimento Fidalgo" } }
)

// Deletar o aluno com a matrícula 2026007
db.alunos.deleteOne({ matricula: "2026007" })

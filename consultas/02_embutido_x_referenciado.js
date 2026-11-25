// Mesma pergunta nas duas modelagens:
// qual o nome das disciplinas que Beatriz Almeida cursa?

use sistemaEnsino

// Documento embutido (coleção alunos): um find resolve
db.alunos.find(
  { nome: "Beatriz Almeida" },
  { _id: 0, "disciplinas.nome": 1 }
)

// Documento referenciado (coleções alunos_r e disciplinas): precisa de $lookup
db.alunos_r.aggregate([
  { $match: { nome: "Beatriz Almeida" } },
  { $unwind: "$disciplinas" },
  { $lookup: {
      from: "disciplinas",
      localField: "disciplinas.disciplina_id",
      foreignField: "_id",
      as: "info_disciplina"
  } },
  { $unwind: "$info_disciplina" },
  { $project: {
      _id: 0,
      nome: "$info_disciplina.nome"
  } }
])

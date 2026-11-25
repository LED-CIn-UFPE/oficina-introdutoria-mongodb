# Oficina Introdutória MongoDB

Material da oficina introdutória de MongoDB da [LED](https://github.com/LED-CIn-UFPE), a Liga Acadêmica de Engenharia de Dados do CIn-UFPE. Tem os arquivos JSON para povoar o banco `sistemaEnsino` e as consultas mostradas nos slides (`slides/aula-mongodb.pdf`), do CRUD básico até a comparação entre documento embutido e documento referenciado.

## Estrutura

```
slides/      apresentação da oficina
dados/       arquivos JSON de povoamento
consultas/   consultas da oficina, para rodar no mongosh
```

| Arquivo | Coleção | Conteúdo |
|---|---|---|
| `dados/alunos.json` | `alunos` | Alunos com as disciplinas embutidas no próprio documento |
| `dados/alunos_r.json` | `alunos_r` | Os mesmos alunos, com as disciplinas referenciadas por código |
| `dados/disciplinas.json` | `disciplinas` | Código e nome de cada disciplina, usada pela `alunos_r` |

| Consulta | Assuntos |
|---|---|
| `consultas/01_crud.js` | `use`, `createCollection`, `insertOne`, `find` com filtro e projeção, `updateOne` com `$set`, `deleteOne` |
| `consultas/02_embutido_x_referenciado.js` | a mesma pergunta respondida com `find` no modelo embutido e com `aggregate` + `$lookup` no referenciado |

## Modelo

Embutido, tudo em um documento:

```json
{
  "matricula": "2026001",
  "nome": "Mariana Costa",
  "disciplinas": [
    { "codigo": "BD01", "nome": "Banco de Dados", "nota": 9.2, "status": "Aprovado" }
  ]
}
```

Referenciado, em duas coleções ligadas por `disciplina_id`:

```json
// alunos_r
{ "_id": "2026001", "nome": "Mariana Costa",
  "disciplinas": [ { "disciplina_id": "BD01", "nota": 9.2, "status": "Aprovado" } ] }

// disciplinas
{ "_id": "BD01", "nome": "Banco de Dados" }
```

O embutido é bom quando os dados são sempre lidos juntos. O referenciado é melhor quando as partes são consultadas separadamente, ao custo de precisar de `$lookup` para juntar.

## Como usar

### MongoDB Compass

1. Instale o MongoDB Community Server e o MongoDB Compass pelo site oficial e conecte em `mongodb://localhost:27017`.
2. Crie o banco `sistemaEnsino` com a coleção `alunos`.
3. Na coleção, use **Add Data > Import JSON or CSV file** e escolha `dados/alunos.json`.
4. Repita para `alunos_r` e `disciplinas`.
5. Abra o terminal do Compass (mongosh) e rode as consultas de `consultas/`.

### Docker

```bash
docker run -d --name aula-mongo -p 27017:27017 -v "$PWD":/aula mongo:7

for c in alunos alunos_r disciplinas; do
  docker exec aula-mongo mongoimport --db sistemaEnsino --collection $c \
    --jsonArray --drop --file /aula/dados/$c.json
done

docker exec -it aula-mongo mongosh sistemaEnsino
```

Dentro do `mongosh`, cole as consultas ou carregue um arquivo inteiro com `load("/aula/consultas/02_embutido_x_referenciado.js")`. A linha `use sistemaEnsino` só funciona no modo interativo; ao usar `load`, apague essa linha ou entre já no banco, como no comando acima.

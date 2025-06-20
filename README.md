Claro! Aqui está um README completo para o seu projeto, contendo as informações da tarefa, detalhes técnicos, instruções de uso, e referências:

---

# Projeto Avaliação 10 – Sincronização de Dados

## Descrição

Este projeto consiste em uma aplicação full stack que inclui:

* **Backend:** API Gateway integrada a uma função AWS Lambda que acessa uma tabela DynamoDB para persistência de dados.
* **Frontend:** Interface em React com Tailwind CSS que consome a API para realizar operações CRUD (Create, Read, Update, Delete).

A aplicação gerencia uma lista de itens contendo os campos:

* `id` (string, obrigatório)
* `telefone` (string, opcional)
* `alunos` (array de strings)

---

## Funcionalidades

* Criar ou atualizar um item via operação `PUT` na API.
* Listar todos os itens (`GET`).
* Excluir um item pelo seu `id` (`DELETE`).
* Interface limpa, responsiva e estilizada com Tailwind CSS.
* Feedback para o usuário sobre operações realizadas.

---

## Arquitetura

* **AWS Lambda:** Função escrita em Node.js utilizando AWS SDK para DynamoDB, processa as requisições HTTP encaminhadas pelo API Gateway.
* **API Gateway:** Configurado como HTTP API que roteia as requisições REST para a função Lambda.
* **DynamoDB:** Banco NoSQL da AWS onde os itens são armazenados.
* **Frontend:** Aplicação React que consome a API usando a biblioteca Axios para realizar as operações.

---

## Endpoints da API

| Método | Endpoint      | Descrição                |
| ------ | ------------- | ------------------------ |
| GET    | `/items`      | Retorna todos os itens   |
| GET    | `/items/{id}` | Retorna um item pelo id  |
| PUT    | `/items`      | Cria ou atualiza um item |
| DELETE | `/items/{id}` | Remove um item pelo id   |

---

## Tecnologias utilizadas

* React
* Tailwind CSS
* Axios
* AWS Lambda (Node.js)
* API Gateway (HTTP API)
* DynamoDB
* AWS SDK v3

---

## Como rodar o frontend localmente

1. Clone este repositório.

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Acesse a aplicação em:

```
http://localhost:3000
```

---

## Configurações importantes

* No código do frontend, configure a variável `apiUrl` com o endpoint da sua API Gateway:

```js
const apiUrl = "https://SEU_ENDPOINT.execute-api.REGIAO.amazonaws.com/dev";
```

* A API deve permitir requisições CORS do frontend, adicionando o header:

```
Access-Control-Allow-Origin: *
```

* Para publicar o frontend no domínio:

```
www.SEUNOME.grupo-0???.distribuidos.ufersa.dev.br
```

configure um serviço de hospedagem (S3 + CloudFront, Vercel, Netlify, etc) apontando para este domínio.

---

## Prints obrigatórios para entrega

Para a avaliação, é necessário enviar prints de:

* Criação de item (POST ou PUT) no navegador mostrando o domínio correto.
* Alteração de item (PUT).
* Leitura de item (GET).
* Exclusão de item (DELETE).

---

## Referências

* [Tutorial AWS API Gateway + DynamoDB](https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/http-api-dynamo-db.html)
* [Axios - Documentação](https://axios-http.com/docs/intro)
* [Tailwind CSS - Documentação](https://tailwindcss.com/docs)
* [React - Documentação](https://reactjs.org/docs/getting-started.html)




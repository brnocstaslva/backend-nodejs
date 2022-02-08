# Backend

## Express e Typescript

---

### Passo 1.1

Criar pasta ```backend``` para o projeto.

### Passo 1.2

Dentro da pasta do projeto criar um arquivo ```package.json``` respondendo com sim para todas as perguntas:

```bash
npm init -y
```

### Passo 1.3

Instalar o ```typescript``` e o ```ts-node-dev``` como dependencias de desenvolvimento:

```bash
npm install typescript ts-node-dev -d
```

### Passo 1.4

Criar a pasta ```src``` e o arquivo ```server.ts```.

### Passo 1.5

Editar o arquivo ```package.json```, adicionando o ```ts-node-dev``` com as flags ```--quiet``` (silencia os avisos de linha de comando) e ```--clear``` (limpa a llinha de comando sempre que é utilizada). Adicionar também o arquivo de entrada ```server.ts```:

```bash
"scripts": {
    "dev": "ts-node-dev --quiet --clear ./src/server.ts"
}
```

### Passo 1.6

Criar o arquivo ```tsconfig.json``` de configuração do Typescript com o comando:

```bash
npx tsc --init
```

### Passo 1.7

Alterar o arquivo ```tsconfig.json```, habilitando as opções para o diretório de entrada ```rootDir``` e o diretório de saída ```outDir```:

```bash
"rootDir": "./src",
"outDir": "./dist"
```

### Passo 1.8

Instalar o micro famework ```Express``` para a criação do servidor backend com o ```Node.js```:

```bash
npm install express
```

### Passo 1.9

Como estamos trabalhando com ```Typescript``` é necessário instalar as tipagens para o ```Express``` como dependencia de desenvolvimento:

```bash
npm install @types/express -d
```

### Passo 1.10

Editar o arquivo ```server.ts``` importando o ```express``` e criando um server com ele:

```ts
import express from 'express'

const app = express()

app.listen('3333', () => {
    console.log('Backend stardet!');
})
```

### Passo 1.11

Iniciar o servidor:

```bash
npm run dev
```

## Métodos HTTP

---

### Passo 2

Adicionar rotas ao arquivo ```server.ts``` com os métodos ```GET```, ```POST```, ```PUT``` e ```DELETE```, lembrando que estamos em ambiente de desenvlvimento, logo o domínio para acesso as rotas é ```http://localhost:3333"```:

```ts
app.get('/users', (request, response) => {
    return response.json(['user 1', 'user 2', 'user 3', 'user 4'])
})

app.post('/users', (request, reponse) => {
    return response.json({ message: 'Criando usuário...' })
})

app.put('/users', (request, response) => {
    return response.json({ message: 'Atualizando usuário...' })
})

app.delete('/users', (request, response) => {
    return response.json({ message: 'Deletando usuário...' })
})
```

## Insominia

---

### Passo 3.1

Para que seja possível realizar requisições ```HTTP``` sem o auxílio de um ```frontend```, podemos utilizar um programa criado para esse propósito chamado ```Insominia``` em <https://insomnia.rest/download>.

### Passo 3.2

No ```Insominia```, crie um novo projeto com o nome de ```API REST```.

### Passo 3.3

Crie um novo documento e o nomeie como ```Users```.

### Passo 3.4

Em ```No Enviroment / Manage Enviroments / Sub Enviroment / Enviroment```, adicione um novo ambiente de desenvolvimento e o nomeie como ```Dev```.

### Passo 3.5

Adicione uma propriedade com o domínio da API.

```json
{
    "baseUrl": "http://localhost:3333"
}
```

### Passo 3.6

Na aba ```DEBUG```, adicione uma rota em ```New Request``` para cada tipo de requisição criada no servidor criado no backend.

- Get do tipo ```Get```
- Post do tipo ```Post```
- Put do tipo ```Put```
- Delete do tipo ```Delete```

### Passo 3.7

Na parte central, no topo existe um campo específico para a inserção de ```URL's```. Adicione a variável criada, ```baseUrl``` + ```/users``` para direcionar as requisições ao serviço que está disponível no backend.

```bash
_.baseUrl/users
```

### Passo 3.8

Com o servidor já iniciado, é possível fazer as requisições com o botão ```Send```. O resultado com a resposta do servidor estão ao lado direito.

## Parâmetros

---

### Passo 4.1

O parâmetro ```Query Params``` é utilzado quando precisamos filtrar as informações durante a requisição de um recurso.

No ```Insominia``` exite uma função própria para isso. Com o tipo de requisição selecionado, na parte central em ```Query``` é possível adicionar parâmetros para a filtragem dos dados.

Exemplo: Para exibir apenas 10 usuários da página 1, podemos iserir os parâmentros:

```bash
?perPage=10&currentPage=1
```

### Passo 4.2

No arquivo ```server.ts``` podemos capturar os parâmetros de busca, com:

```ts
app.get('/users', (request, response) => {
    const query = request.query
    return response.json({ query })
})

// Desestruturando o objeto query quando se sabe os parâmetros da pesquisa / filtro
app.get('/users', (request, response) => {
    const { perPage, currentPage } = request.query

    return response.json({ perPage, currentPage })
})
```

### Passo 4.3

Com o parâmetro ```Route Params``` podemos localizar uma informação no backend.

No ```Insominia``` selecionamos a rota criada ```Put``` e simulamos uma requisição para o ```id 1``` ao recurso ```/users``` em ```_.baseUrl/users/1```.

```ts
// Quando se sabe o parâmetro para a busca da informação no backend, podemos definir uma variável como complemento da rota

app.put('/users/:id', (request, response) => {
    const { id } = request.params

    resturn response.json({ id })
})
```

### Passo 4.4

O parâmetro ```Request Body``` podemos enviar ao servidor um volume maior de informações em comparação com o ```Route Params```.

Podemos smular uma requisição de cadastro de um novo usuário no ```Insominia```. Com o método ```Post``` selecionado criamos uma nova querisição em ```Body / JSON```, como:

```json
{
    "userName": "Bruno Silva",
    "userEmail": "brunosilva@email.com"
}
```

Por padrão o express não entende que o formato da comunicação das requisições está em JSON, então precisamos informar isso antes da criação das rotas no arquivo ```server.ts```.

```ts
app.use(express.json())

app.post('/users', (request, response) => {
    const body = request.body

    return response.json({ body })
})
```

## CRUD Backend

---

### Passo 5.1

Como estamos utiliazndo o ```Typescript``` para programar o servidor, criaremos uma ```interface User```, editando o arquivo ```server.ts```:

```ts
interface User {
    id: string
    name: string
    email: string
}
```

### Passo 5.2

Para simular um banco de dados, criaremos uma lista de usuários vazia para realizar as operações de alteração utilizando os métodos ```HTTP```.

Lembrando que as informações criadas durante as operações existirá durante a execução da aplicação.

```ts
const users: Users[] = []
```

### Passo 5.3

Para a rota de listagem precisamos criar para acessar todos os usuários de ```users```, é:

```ts
app.get('/users/', (request, response) => {
    // retornar os usuários
    return response.json({ users })
})
```

### Passo 5.4

Já para a rota de criação, precisamos receber os dados do novo usuário por meio do corpo da requisição.

Precisamos gerar um identificador único para cada usuário criado, e para isso instalaremos um módulo / biblioteca chamado ```uuid``` e seu pacote de tipagem como dependencia de desenvolvimento.

bash / cmd

```bash
npm install uuid

npm install @types/uuid -d
```

server.ts

```ts
// importar a função v4 como uuid
import { v4 as uuid } from 'uuid'

get post('/users', (request, response) => {
    // receber os dados do novo usuário
    const { name, email } = request.body

    // criar um novo usuário
    const user = { id: uuid(), name, email }

    // registrar esse novo usuário na base de dados (users)
    users.push(user)

    // retornar os dados do usuário criado
    return response.json(user)
})
```

### Passo 5.5

Para a rota de atualização:

```ts
get.put('/users/:id', (request, response) => {
    // receber os dados do usuário
    const { id } = request.params
    const { name, email } = request.body

    // localizar o usuário
    const userIndex = users.findIndex(user => user.id === id)

    // se o usuário não existir, retornar o erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found.' })
    }

    // atualizar o usuário na dase de dados (users)
    const user = { id, name, email }
    users[userIndex] = user

    // retornar os dados do usuário atualizado
    return response.json(user)
})
```

### Passo 5.6

Rota de exclusão podemos localizar um usuário e fazer a exclusão deste da base de dados / ```users```

```ts
get.delete('/users/:id', (request, response) => {
    // receber id do usuário
    const { id } = request.params

    // localizar o usuário na base de dados / users
    const userIndex = users.findIndex(user => user.id === id)

    // se o usuário não existir, retornar um erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found.' })
    }

    // excluir usuário da base de dados
    users.splice(userIndex, 1)

    // retornar status de sucesso
    return response.status(204).send()
})
```

### Passo 5.7

Vamos testar nossas rotas e suas operações no ```Insominia```.

#### Post

Selecione a rota ```Create``` com o método ```Post``` e adicione um novo usuário:

```json
{
    "name": "Bruno Silva",
    "email": "bruno@email.com"
}
```

Como resposta recebemos o valor do usuário criado com um ```id``` maluco criado pela biblioteca ```uuid```:

```json
{
    "id": "074c6e9f-211c-4ca3-9d63-02e34f9bb6f9",
    "name": "Bruno Silva",
    "email": "bruno@email.com"
}
```

#### Put

Para atualizar os dados de um usuário podemos copiar o seu ```id``` e adicioná-lo como parâmetro a rota do recurso ```/users/074c6e9f-211c-4ca3-9d63-02e34f9bb6f9```.

Passando as informações para atualização no corpo da requisição em ```body``` com o tipo ```JSON```:

```json
{
    "name": "Renata Silva",
    "email": "renata@email.com"
}
```

#### Delete

Podemos deletar um usuário informando como parâmetro da rota o ```id``` do usuário, por exemplo ```/users/074c6e9f-211c-4ca3-9d63-02e34f9bb6f9```.

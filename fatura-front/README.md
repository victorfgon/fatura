## Descrição do Projeto
Nós iremos fornecer algumas faturas de energia elétrica. Seu objetivo será desenvolver um
código que seja capaz de:

● Extrair os dados relevantes dessas faturas.

● Organizar esses dados de maneira estruturada em um banco de dados PostgreSQL.

● Apresentar esses dados em uma aplicação web, criada a partir de protótipos elaborados
pelo candidato no Figma.

Para este desafio, você deverá utilizar as seguintes tecnologias: JavaScript/Typescript, Node e
React.

## Frontend

1 - Acesse o diretório do frontend: cd frontend.

2 - Instale as dependências: npm install.

3 - Execute o aplicativo frontend: npm start.

4 - O aplicativo estará disponível em http://localhost:3001(Pode ser preciso rodar o back primeiro para o front rodar na 3001).

5 - Para rodar os testes: npm test. 

## Backend

1 - Acesse o diretório do backend: cd backend.

2 - Instale as dependências: npm install.

3 - Para rodar o banco através do docker-compose certifique de estár com o daemon do Docker inicializado e use o comando: docker-compose up -d e o adminer do banco de dados PostgreSQL configurado no docker-compose estará disponível em http://localhost:8080/ .
  servidor/container_name: 'pgsql_fatura' 
  username: 'pguser',
  password: 'pgpassword',
  database: 'nestjs',

4 - Execute o servidor backend: npm run start:dev.

5 - O servidor estará disponível em http://localhost:3000.

6 - A documentação da API estará disponível em http://localhost:3000/api#/.

7 - Para rodar os testes: npm run test.

## Implementação

Use o swagger para fazer o upload das 6 faturas para alimentar o banco. A página inicial é o Histórico de Faturas que irá dispor estas faturas por número do cliente e mês de
referência, onde será possível clicar nos mês de referência para mostrar todos os dados detalhados daquele mês. O número do cliente é um link para a página de Dashboard onde irá mostrar o gráfico dos 3 valores de energia mais o valor total variando com o passar dos meses. É possível também passar o mouse em cada ponto do gráfico para saber o valor exato daquele mês.
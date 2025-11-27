1) Utilizei o Express-Generator para gerar a estrutura do projeto.

Ficou assim:

\bin                 : contem o root da aplicação
\controllers         : contem as funções em javascript que efetuarm o crud da tabela animais
\db                  : contem a conexão com o banco atravpes de knex
\public              : contém página principal da aplicação, que é o arquivo index.html
\public\font         : fonte Ubuntu
\public\javascripts  : contem o script da página principal
\public\stylesheets  : contem os css da página principal.

\routes              : contem os arquivos de roteamento para \ e \user

.env                 : arquivo de configuração de conexão com o BD
app.js               : arquivo de configuração da aplicação
knexfile.js          : arquivo che chama o dotenv e retorna a configuração da aplicação.

2) Para executar a aplicação.

a) Crie o squem boizinho e a tabela animais no mysql. O script de criação está em \bancoDados

b) Altere o arquivo .env, fornecendo os dados de conexão ao mysql

c) Na raiz do projeto execute 

     npm start



Feliz Natal e até o ano que vem.


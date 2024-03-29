# Music Controller

## Introdução
Este projeto foi desenvolvido como parte de um estudo para melhor integração entre as stacks Django + React. Minha ideia principal era apenas entender como integrar as stacks, mas como é relacionado a uma área de interesse, resolvi seguir adiante todo o projeto (Refatorando quase tudo para os padrões atuais). Em grande resumo, a aplicação é um "controle remoto" de uma house party

## Funcionalidades
- Criar salas para House Partys
- Controlar as músicas do host (caso ele deseje)

## ANTES DE TUDO
É necessário ter acesso a API do spotify, para isso siga os passos abaixo:

- Acesse: https://developer.spotify.com/documentation/web-api
- Logue com sua conta spotify
- Clique em "dashboard" ou acesse: https://developer.spotify.com/dashboard
- Clique em Create App ou acesse: https://developer.spotify.com/dashboard/create
- Preencha o formulário como bem entender, é recomendado que o Redirect URI seja: "http://127.0.0.1:8000/spotify/redirect"
- Vá para as configurações e copie seu client ID e Secret do spotify para utilizar na instalação

## Instalação
Para simplificar a instalação, o projeto está dockerizado. Basta executar o comando `docker-compose up` para criar os containers. Antes disso, é necessário criar um arquivo `.env` com os seguintes valores:

```.env
CLIENT_SECRET=seusecretdospotifyaqui
CLIENT_ID=seuIDdospotifyaqui
REDIRECT_URI=http://127.0.0.1:8000/spotify/redirect
ALLOWED_HOSTS=0.0.0.0,0.0.0.0:8000,localhost,localhost:8000,acrescentemaisaqui
```

Para facilitação, na pasta raiz do projeto está criado um model `.envmodel`, basta acrescentar suas credencias e renomear o arquivo.

***   
Caso queira utilizar sem o docker, apenas inicar a aplicação django com o `python manage.py runserver` após setar o `.env`

## Utilização
O Host dono das chaves do spotify cria uma sala e disponibiliza o código para seus amigos acessarem. Ao iniciar a musica no ambiente, todos controlam.

---

Este readme fornece uma visão geral do projeto, incluindo suas funcionalidades, instruções de instalação e utilização. Se precisar de mais alguma informação específica, por favor me avise!


# backend-auth

### ABOUT
  ##### br
  > Sistema de autenticação: cadastro, entrar, desconectar, ver perfil, editar perfil; Feito com NodeJs e MongoDB, esse sistema permite cadastrar e gerenciar o perfil de usuários; os pacotes no package.json contam com bibliotecas de envio de e-mail e requisisões HTTPS.  

  ##### en
  > Authentication System: Sign Up, Sign In, Sing Out View Profile, Edit Profile; Built with Node.js and MongoDB, this system allows users to register and manage their profiles. The packages in the package.json include libraries for sending emails and making HTTPS requests.


### Requirements
Make sure you have the following software installed on your system:

  -Node.js: https://nodejs.org
  
  -MongoDB: https://www.mongodb.com
  
  -Insomnia: https://insomnia.rest
  
#
### ROUTES
`localhost:port/`

`localhost:port/register`

`localhost:port/login`

`localhost:port/disconnect/:email/:token`

`localhost:port/user/perfil/:id/:token`

`localhost:port/user/perfil/edit`


### ENV
`MAIL_HOST=`

`MAIL_PORT=`

`MAIL_USER=`

`MAIL_PASS=`

`SECRET=""`

`PORT_TYPE=`

`API_URL=mongodb://127.0.0.1:27017/backend`

` SITE_URL=http://127.0.0.1:`


#

![by Patrick Lucas Martins](image.png)
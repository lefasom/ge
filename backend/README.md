### instalar nest.js de forma global
- [x] npm i @nestjs/cli -g
### creando  proyecto con nest.js
- [x] nest new backend
- [x] elijo un gestor de paquetes
#### instalar module
- [x] nest generate module tasks
#### instalar controller
- [x] nest generate controller tasks --no-spec
#### instalar service
- [x] nest generate service tasks --no-spec
##### si no tienes los permisos para usar nest en tu terminal
- [x] Set-ExecutionPolicy RemoteSigned 
##### creart validaciones
- [x] npm i --save class-validator class-transformer


# PRISMA
- [x] npm install prisma -D
- [x] npx prisma init -datasource-provider sqlite
- [x] npx prisma migrate dev --name init

# configuro mongoose (variable de entorno) 
- [x] MONGO_DB = 'mongodb+srv://lefasomriverplate:Cpjxz4pngzX5esTA@cluster0.q0nom.mongodb.net/items?retryWrites=true&w=majority&appName=Cluster0'
#### tuve problemas conla connecion y para solucionarlo tuve que generar un nuevo password y se soluciona y es importante poner bien el nombre de la colleccion


# comandos para mejorar la seguridad y el manejo de datos de sesiones
- [] npm install --save @nestjs/jwt passport-jwt
- [] npm install --save-dev @types/passport-jwt
- [] npm install --save bcrypt
- [] npm i --save-dev @types/bcrypt
# genero los resource de un componente 
- [] nest g resource items
# instalaccion de swagger
- [] npm install --save @nestjs/swagger

# class validator
- [] npm i --save class-validator class-transformer


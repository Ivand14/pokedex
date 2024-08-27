<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


#Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar

```
npm install
```
3. Tener el Nest CLI intalado
 ```
npm i -g @nestjs/cli
```
4. Levantar base de datos

```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrarlo como __.env__

6. Llenar las variables de entornos definidas en el __.env__

7. Ejecutar la aplicacion con
```
npm run start:dev
```


1. Recargar / Reconstruir los datos en la Base de datos de MongoDB
```
http://localhost:3000/api/v2/seed
```

 
## STACK USADO

* MongoDB
* NestJs
* Docker

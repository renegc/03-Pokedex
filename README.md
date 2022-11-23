<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en desarrollo

1. clonar el repositorio
2. ejecutar 
```
yarn install
```
3. tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a a __.env__

6. llenar las variables de entorno definidasd en el __.env__

7. ejecutar la aplicacion en dev:
```
yarn start:dev
```

8. Reeconstruir la BD si en dado caso ha sido borrada, Solo ejecutar una vez por fa xd
```
http://localhost:3000/api/seed
```


## Stack usado
* MongoDB
* Nest

# Notas 
keroku redeploy sin cambios:
```
git commit --allow-empty -m "tigger heroku deploy"
git push heroku <master|main>
```

# production build
1. crear el archivo ``` .env ```
2. llenar las variables de entorno de produccion
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

```

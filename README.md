# products-service

A REST and GraphQL API to fetch products.

# Project setup

## Install dependencies

```
npm i
```

## Start the server

```
npm test
```

## Database setup

Tf you don't have mysql setup, below is a guide on how to setup the database locally

### Install docker

If you don't have docker installed on your machine, [use these instructions.](https://docs.docker.com/engine/install/). Make sure to start docker in order to run the commands below.

### Pull the latest MySQL server release

```
docker pull mysql/mysql-server:latest
```

### Verify the image is stored locally

```
docker images mysql/mysql-server
```

### Once the image is stored, run it as a docker container

```
docker run -p 3306:3306 --name products_database -e MYSQL_ROOT_PASSWORD='<YOUR_PASSWORD>' -d mysql/mysql-server:latest
```

### Check if the container is running

```
docker ps
```

### Access the bash shell of the MySQL container:

```
docker exec -it miles_core_database bash
```

### Access the database as root

```
mysql -u root -p
```

### Create and switch to the miles database

```
CREATE DATABASE products;
USE products;
```

### Set-up a user for the database

```
CREATE USER 'products_api_user'@'172.17.0.1' IDENTIFIED BY '<YOUR_PASSWORD>';
```

### Assign privileges to newly created user

```
GRANT ALL PRIVILEGES ON products.* TO ‘products_api_user’@‘172.17.0.1’;
```

### Review permissons for your new user

```
SHOW GRANTS FOR 'products_api_user'@'172.17.0.1';
```

## Migration setup

Navigate to `config/config.json` in the root directory. Add the database details for migrations using the newly configured credentials

```
  "development": {
    "username": "products_api_user",
    "password": "<YOUR_PASSWORD>r",
    "database": "products",
    "host": "localhost",
    "dialect": "mysql"
  },
```

### Run migrations

```
npx sequelize-cli db:migrate
```

### Run seeds

```
npx sequelize-cli db:seed:all
```

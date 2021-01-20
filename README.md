# sa-backend-nodejs

##### Routing         : Express
##### ORM Database    : Sequelize

## Installation

#### Donwload Code | Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
yarn
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application


#### migrate
```
npx sequelize-cli db:migrate --config "config/config.json" --env "local" up
```

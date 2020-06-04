# Todo-List App
實作 Laravel API 並搭配 Vue 及 Vuex，使用者可註冊、登入，CRUD 專屬該 User 的待辦事項。

# Get it up and running.

```
# create a .env file
cp .env.example .env

# install composer dependencies
composer update

# install npm dependencies
npm install

# generate a key for your application
php artisan key:generate

# create a local MySQL database (make sure you have MySQL up and running)
mysql -u root

> create database todo_db;
> exit;

# add the database connection config to your .env file
DB_CONNECTION=mysql
DB_DATABASE=csm_db
DB_USERNAME=root
DB_PASSWORD=

# run the migration files to generate the schema
php artisan migrate

# run webpack and watch for changes
npm run watch

# run it on local host
php artisan serve
```

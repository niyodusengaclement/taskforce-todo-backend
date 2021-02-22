<h1 align="center">Welcome to Awesomity Taskforce  Backend Challenge 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://taskforce-todo.herokuapp.com/api/doc" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/niyodusengaclement/taskforce-todo-backend#license--copyright" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/clementmistico" target="_blank">
    <img alt="Twitter: clementmistico" src="https://img.shields.io/twitter/follow/clementmistico.svg?style=social" />
  </a>

[![Build Status](https://travis-ci.com/niyodusengaclement/taskforce-todo-backend.svg?branch=develop)](https://travis-ci.com/niyodusengaclement/taskforce-todo-backend) [![Coverage Status](https://coveralls.io/repos/github/niyodusengaclement/taskforce-todo-backend/badge.svg?branch=develop)](https://coveralls.io/github/niyodusengaclement/taskforce-todo-backend?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6c26f5a03d74c8fe7514/maintainability)](https://codeclimate.com/github/niyodusengaclement/taskforce-todo-backend/maintainability)

</p>

> To-do list app that can help you plan, track, and get more tasks done.
> This app is hosted on Heroku, you can find its documentation on (documentation) link below

### 🏠 [Homepage](https://github.com/niyodusengaclement/taskforce-todo-backend#welcome-to-awesomity-taskforce--backend-challenge-)

### ✨ [Documentation](https://taskforce-todo.herokuapp.com/api/doc)

## Busness rules

- In order to use this todo app, you must first create an account and login with your credentials.
- User should only get access to S/he is todos.

## API ENDPOINTS

| Ressource URL       | Methods | Description                                     | Authentication required |
| ------------------- | ------- | ----------------------------------------------- | ----------------------- |
| /api/auth/register  | POST    | Create user account                             | No                      |
| /api/auth/login     | POST    | Login                                           | No                      |
| /api/todos          | POST    | Create a todo                                   | Yes                     |
| /api/todos          | GET     | List of all todos                               | Yes                     |
| /api/todos/:todo_id | GET     | Get a specific todo                             | Yes                     |
| /api/todos/:todo_id | PUT     | Modify/Edit a specific todo                     | Yes                     |
| /api/todos          | PUT     | Modify/Edit all todos' status                   | Yes                     |
| /api/todos/:todo_id | DELETE  | Delete a specific todo                          | Yes                     |
| /api/todos          | DELETE  | Delete all todos                                | Yes                     |
| /api/todos/search   | GET     | Search a todo by title, description or priority | Yes                     |
| /api/todos/export   | GET     | Export a list of todos in a csv file            | Yes                     |

## Features

- Create an account
- Login to the created account
- Create a todo
- Read one or all todos (Created by you)
- Update a specific todo (Created by you)
- Update all todos' status (Created by you)
- Delete a Delete a specific todo (Created by you)
- Delete all todos (Created by you)
- Search a todo by title, description or priority (Created by you)
- Export to csv a list of todos (Created by you)
- Validate all required fields by using joi
- Authenticate by using JSON Web Token (JWT)

### Language

```
 Javascript
```

### Server Environment

```
 NodeJS (run time Environment for running JS codes)
```

### Framework

```
 Express JS
```

### Testing Framework and Assertion library

```
 Mocha and Chai
```

### Continuous Integration

```
Travis CI
```

### Test Coverage

```
nyc
```

### Test Coverage badge

```
coveralls
```

### Code maintainability badge

```
Code climate
```

## Getting started

These instructions will get you a copy of this project up and running on your local machine for development and testing purposes.

## Prerequisites

I assume you already have NodeJS, npm and PostgreSQL installed.
To install this project on your local machine, you need first to clone the repository `https://github.com/niyodusengaclement/taskforce-todo-backend.git` and set up the env variable file by filling in the required environment variables (Refer to the env.example file)

## Install

```sh
npm install
```

## Usage

This project built on top of expressJS and postgreSQL as database. So, to make things easy, you need to setup your env variable properly by by refering to the `.env.example` file and then run`npm start` to migrate and start the server accordingly or if you want to run in development mode you can just run the following commands

```sh
npm run migrate
```

```sh
npm run dev
```

## Run tests

```sh
npm run test
```

### Build Docker Image

```
docker build .
```

### Start App with Docker

```
docker-compose up
```

After running `docker-compose up` app should be running on port 9000

## Author

👤 **NIYODUSENGA Clement**

- Website: www.linkedin.com/in/niyodusenga-clement
- Twitter: [@clementmistico](https://twitter.com/clementmistico)
- Github: [@niyodusengaclement](https://github.com/niyodusengaclement)
- LinkedIn: [@niyodusenga-clement](http://www.linkedin.com/in/niyodusenga-clement)

---

## License & copyright

ISC License (ISC)

Copyright (c) 2021 NIYODUSENGA Clement

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Show your support

Give a ⭐️ if this project helped you!

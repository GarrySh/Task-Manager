# Task manager

[![Build Status](https://travis-ci.org/GarrySh/project-lvl4-s195.svg?branch=master)](https://travis-ci.org/GarrySh/project-lvl4-s195)
[![Maintainability](https://api.codeclimate.com/v1/badges/e87247d473f588c60589/maintainability)](https://codeclimate.com/github/GarrySh/project-lvl4-s195/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e87247d473f588c60589/test_coverage)](https://codeclimate.com/github/GarrySh/project-lvl4-s195/test_coverage)

Online demo version: https://task-manager-garrysh.herokuapp.com/

## Описание

Task manager - четверый учебный проект профессии backend javascript разработчик на hexlet.io

Доступна функциональность:

- чтение, создание, редактирование, удаление пользователей (users CRUD)
- чтение, создание, редактирование, удаление задач (tesks CRUD)
- авторизация
- фильтрация задач

Все действия выполняются на стороне сервера.

## Стек

- Backend: Node.JS with KoaJS web framework, pug, rollbar, postgerSQL in prod and sqlite in dev via sequelise ORM
- Frontend: bootstrap
- Tests: jest, supertest, faker
- Bundler: webpack
- Deploy: heroku

## Requirements

- Node.JS
- Yarn

## Setup

```console
git clone git@github.com:GarrySh/project-lvl4-s195.git
cd project-lvl4-s195
make install
```

## Run

```console
make db.init
make start
```

open page localhost:5000

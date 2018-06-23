# Task manager

[![Build Status](https://travis-ci.org/GarrySh/project-lvl4-s195.svg?branch=master)](https://travis-ci.org/GarrySh/project-lvl4-s195)
[![Maintainability](https://api.codeclimate.com/v1/badges/e87247d473f588c60589/maintainability)](https://codeclimate.com/github/GarrySh/project-lvl4-s195/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e87247d473f588c60589/test_coverage)](https://codeclimate.com/github/GarrySh/project-lvl4-s195/test_coverage)

Online demo version: https://task-manager-garrysh.herokuapp.com/

## Description

Simple task manager - fourth backend project on hexlet.io

All visitors can view the list of tasks and users. Authenticated users can create and edit tasks. Users deleting is available only for themselves.

* Backend: Node.JS with koaJs web framework, pug, rollbar, sequelise ORM, postgerSQL in prod and sqlite in dev
* Frontend: bootstrap, webpack
* Tests: jest, supertest, faker
* Deploy: heroku

## Requirements

* Node.JS
* Yarn

## Setup

```console
git clone git@github.com:GarrySh/project-lvl4-s195.git
cd project-lvl4-s195
make install
```

## Run

```console
make start
```

open page localhost:5000

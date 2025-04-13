#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

# pipenv shell  # Agregado por Alexis para generar automáticamente administradores en la BD

pipenv run upgrade
# flask insert-users  # Agregado por Alexis para generar automáticamente administradores en la BD

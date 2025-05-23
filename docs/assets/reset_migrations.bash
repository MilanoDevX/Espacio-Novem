rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c "DROP DATABASE IF EXISTS novem";
psql -U postgres -c "CREATE DATABASE novem";
psql -U postgres -c "CREATE EXTENSION unaccent" -d novem;
pipenv run migrate &&
pipenv run upgrade

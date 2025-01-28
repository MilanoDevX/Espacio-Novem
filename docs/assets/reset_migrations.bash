rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c "DROP DATABASE IF EXIST example";
psql -U postgres -c "CREATE DATABASE example";
psql -U postgres -c "CREATE EXTENSION unaccent" -d example;
pipenv run migrate &&
pipenv run upgrade

#pipenv run reset_db
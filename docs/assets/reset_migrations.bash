rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c "DROP DATABASE IF EXISTS example";
psql -U postgres -c "CREATE DATABASE example";
psql -U postgres -c "CREATE EXTENSION unaccent" -d nexample;
pipenv run migrate &&
pipenv run upgrade

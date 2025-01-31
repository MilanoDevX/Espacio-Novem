rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U postgres example || true &&
createdb -h localhost -U postgres example || true &&
psql -h localhost example -U postgres -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade

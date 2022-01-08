import-mongo-data:
	bash importDB.sh

# MacOs commands

start-m:
	make mongo-start-m
	node server.js

mongo-start-m:
	brew services start mongodb-community@5.0
	make services-list-m

mongo-stop-m:
	brew services stop mongodb-community@5.0
	make services-list-m


services-list-m:
	brew services list

# Ubuntu server commands

mongo-start-u:
	sudo systemctl start mongod
	make services-list-u

mongo-stop-u:
	sudo systemctl stop mongod
	make services-list-u

mongo-restart-u:
	sudo systemctl restart mongod
	make services-list-u

services-list-u:
	sudo systemctl status mongod


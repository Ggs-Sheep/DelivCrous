# MacOs commands

start:
	make mongo-start
	node server.js

mongo-start:
	brew services start mongodb-community@5.0
	make services-list

mongo-stop:
	brew services stop mongodb-community@5.0
	make services-list


services-list:
	brew services list
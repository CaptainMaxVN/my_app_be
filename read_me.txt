mongod --port 27017 --dbpath path_database

mongo --port 27017
use database_name
db.createUser({
	user: "user_name",
	pwd: "password",
	roles: ["readWrite", "dbAdmin", "dbOwner"]
})

mongo --port 27017 -u "user_name", -p "password", --authenticationDatabase database_name
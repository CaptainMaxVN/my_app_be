mongod --port 27017 --dbpath path_database

mongo --port 27017
use dev
db.createUser({
	user: "max",
	pwd: "12345",
	roles: ["readWrite", "dbAdmin", "dbOwner"]
})

mongo --port 27017 -u "max" -p "12345" --authenticationDatabase dev
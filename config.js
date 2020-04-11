function Config() {
	this.mongoConnection = 'mongodb://localhost/authentication';
	this.mongoDBName = 'mongodb://localhost:27017/authentication';
}
module.exports = new Config();
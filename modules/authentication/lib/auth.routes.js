
const Roles = require('./../enums/roles')

function AuthRoutes () {
	this.routes = [
    {
      path: '/users/',
      roles: [Roles.admin]
    }
  ]
}
module.exports = new AuthRoutes();
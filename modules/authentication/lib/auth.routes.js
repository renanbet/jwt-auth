
const Roles = require('./../enums/roles')

function AuthRoutes () {
	this.routes = [
    {
      path: '/users/',
      roles: [Roles.admin, Roles.user]
    }
  ]
}
module.exports = new AuthRoutes();
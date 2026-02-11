const { Router } = require("express")
const { updateRole, deleteUser } = require("../controller/superAdmin.controller")
const superAdminMiddleware = require("../middleware/superAdmin")

const superAdminRoute = Router()

superAdminRoute.put("/update_role/:id", superAdminMiddleware, updateRole)
superAdminRoute.delete("/delete_user/:id", superAdminMiddleware, deleteUser)

module.exports = superAdminRoute
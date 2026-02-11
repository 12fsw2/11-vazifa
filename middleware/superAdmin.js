const jwt = require("jsonwebtoken")

const superAdminMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).json({
                message: "Oldin ro'yxatdan o'ting"
            })
        }
        const token = authorization.split(" ")[1]

        const decode = jwt.verify(token, process.env.SEKRET_KEY)
        req.user = decode

        if (req.user.role !== "superadmin") {
            return res.status(401).json({
                message: "You are not superAdmin"
            })
        }

        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = superAdminMiddleware
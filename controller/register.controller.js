const { read_file, write_file } = require("../api/file-system")
const {v4} = require("uuid")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const data = read_file("register.json")

        if (!username || !email || !password) {
            return res.status(500).json({
                message: "Fill the all area please."
            })
        }

        const foundedEmail = data.find((item) => item.email === email)
        if (foundedEmail) {
            return res.status(500).json({
                message: "oldin ro'yxatdan o'tgansiz"
            })
        }

        const hash = await bcrypt.hash(password, 12)
        data.push({
            id: v4(),
            username,
            email,
            password: hash,
            role: "user"
        })

        write_file("register.json", data)
        res.status(200).json({
            message: "Success"
        })

    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = read_file("register.json")

        if (!email || !password) {
            return res.status(500).json({
                message: "Fill the all area please."
            })
        }

        const foundedEmail = data.find((item) => item.email === email)
        if (!foundedEmail) {
            return res.status(500).json({
                message: "Email xato yoki oldin ro'yxatdan o'tmagansiz"
            })
        }

        const check = await bcrypt.compare(password, foundedEmail.password)

        if (check) {
            const payload = {id: foundedEmail.id, email: foundedEmail.email, role: foundedEmail.role}
            const token = jwt.sign(payload, process.env.SEKRET_KEY, {expiresIn: "1h"})
            return res.status(200).json({
            message: "Login",
            token
        })
        }else{
            return res.status(500).json({
            message: "Parol noto'g'ri"
        })
        }


    }catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
    register,
    login
}
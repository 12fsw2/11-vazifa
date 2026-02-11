const { read_file, write_file } = require("../api/file-system")

const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("register.json")
        const { role } = req.body

        const founded = data.find((item) => item.id === id)
        if (!founded) {
            return res.status(500).json({
                message: "Role not found, check the id"
            })
        }

        data.forEach((item) => {
            if (item.id === id) {
                item.role = role ? role : item.role
            }
        })

        write_file("register.json", data)
        res.status(200).json({
            message: "success!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const data = read_file("register.json")
        const { id } = req.params

        const founded = data.find((item) => item.id === id)
        if (!founded) {
            return res.status(404).json({
                message: "Role not found, check the id"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })

        write_file("register.json", data)
        res.status(200).json({
            message: "Sucess!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    updateRole,
    deleteUser
}
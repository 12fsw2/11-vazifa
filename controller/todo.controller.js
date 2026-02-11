const { read_file, write_file } = require("../api/file-system")
const { v4 } = require("uuid")

const getAllItems = async (req, res) => {
    try {
        const data = read_file("todo.json")


        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const get_one_item = async (req, res) => {
    try {
        const data = read_file("todo.json")
        const { id } = req.params

        const founded = data.find((item) => item.id === id)

        if (!founded) {
            return res.status(404).json({
                message: "Id not found, check the id"
            })
        }

        res.status(200).json(founded)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const addItem = async (req, res) => {
    try {
        const data = read_file("todo.json")
        const { title } = req.body

        data.push({
            id: v4(),
            title,
            addedBy: req.user.id,
            completed: false
        })

        write_file("todo.json", data)
        res.status(200).json({
            message: "Success!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("todo.json")
        const { title } = req.body

        const founded = data.find((item) => item.id === id)

        if (!founded) {
            return res.status(500).json({
                message: "Todo not found, check the id"
            })
        }

        if (founded.addedBy !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                item.title = title ? title : item.title
            }
        })

        write_file("todo.json", data)
        res.status(200).json({
            message: "sucess!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteItem = async (req, res) => {
    try {
        const data = read_file("todo.json")
        const { id } = req.params
        const founded = data.find((item) => item.id === id)
        if (!founded) {
            return res.status(404).json({
                message: "To do not found, check the id"
            })
        }

        if (founded.addedBy !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })


        write_file("todo.json", data)
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
    getAllItems,
    get_one_item,
    addItem,
    updateItem,
    deleteItem
}
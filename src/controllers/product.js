import Product from '../models/product'
import joi from 'joi'

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().required(),
    status: joi.boolean().required()

})

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        if (product.length == 0) {
            return res.status(404).json({
                message: "Them san pham that bai"
            })
        }
        return res.status(200).json({
            message: 'Them san pham thanh cong',
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const get = async (req, res) => {
    try {
        if (req.params.id) {
            const product = await Product.findById(req.params.id)
            if (!product) {
                return res.status(404).json({
                    message: "Khong tim thay san pham"
                })
            }
            return res.status(200).json({ product })

        } else {
            const products = await Product.find()
            if (!products) {
                return res.status(404).json({
                    message: "Load san pham that bai"
                })
            }
            return res.status(200).json({ products })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (product.length == 0) {
            return res.status(404).json({
                message: "Sua san pham that bai"
            })
        }
        return res.status(200).json({
            message: 'Sua san pham thanh cong',
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: 'Xoa san pham thanh cong',
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
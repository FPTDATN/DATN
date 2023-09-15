import Products from "../models/products";


export const getAll = async(req,res)=>{
    try {
        const products = await Products.find()
        return res.status(200).json({
            products
        })
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }
}



export const create = async(req,res)=>{
    try {
        const products = await Products.create(req.body)
        return res.status(200).json({
            message:"thêm sản phẩm thành công",
            products
        })
    } catch ({errors}) {
        return res.status(500).json({
            message:errors
        })
    }
}



export const getById = async(req,res)=>{
    try {
        const products = await Products.findById(req.params.id)
        return res.status(200).json({
            products
        })
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }
}


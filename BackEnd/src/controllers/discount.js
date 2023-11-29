import { discountSchema } from "../Schemas/discount.js";
import Discount from "../models/discount.js";
export const createDiscount = async (req, res) => {
    try {
        const { error } = discountSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const discount = await Discount.create(req.body);
        if (discount.length === 0) {
            return res.status(200).json({
                message: "Không thêm được mã giảm giá",
            });
        }
        return res.json(discount);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const getAllDiscount = async (req, res) => {
    const {
        _limit = 999,
        _sort = "createAt",
        _order = "asc",
        _page = 1,
    } = req.query;

    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === 1,
        },
    };

    try {
        const data = await Discount.paginate({}, options);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
export const removeDiscount = async (req, res) => {
    try {
        const discount = await Discount.findOneAndDelete({ _id: req.params.id });
        return res.json({
            message: "Xóa mã giảm giá thành công",
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const getByIdDiscount = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (discount.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(discount);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
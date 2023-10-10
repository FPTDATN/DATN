import Favourite from '../models/favourite.js';
import Auth from '../models/auth.js';

export const getAll = async (req, res) => {
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;

    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const favourite = await Favourite.paginate({}, options);
        if (favourite.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(favourite);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
export const create = async (req, res) => {
    try {
        // const { error } = productSchema.validate(req.body);

        // if (error) {
        //     return res.status(400).json({
        //         message: error.details.map((err) => err.message),
        //     });
        // }
        const favourite = await Favourite.create(req.body);

        // Thêm ObjectId vào thuộc tính products trong model Category
        await Auth.findByIdAndUpdate(favourite.userId, {
            $addToSet: {
                userId: favourite._id,
            },
        });
        if (favourite.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm yeu thich",
            });
        }
        return res.json(favourite);
    } catch (error) {
        return res.status(404).json({
            message: "Them thanh cong",
        });
    }
};
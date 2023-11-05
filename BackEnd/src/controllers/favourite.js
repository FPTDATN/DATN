import Favourite from '../models/favourite.js'

export const favouriteCreat = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        const wishlistItem = {
            product_id,
        };

        const wishlist = await Favourite.findOneAndUpdate(
            { user_id },
            { $addToSet: { wishlist_items: wishlistItem } },
            { upsert: true, new: true }
        );
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getFavourites = async (req, res) => {
    let {
        _limit = 8,
        _sort = "createAt",
        _order = "asc",
        _page = 1,
    } = req.query;

    // Chuyển đổi giá trị _limit và _page từ chuỗi sang số nguyên
    _limit = parseInt(_limit);
    _page = parseInt(_page);

    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };

    try {
        const wishlist = await Favourite.findOne({ user_id: req.params.user_id })
            .populate('wishlist_items.product_id')
            .limit(options.limit)
            .skip((options.page - 1) * options.limit);

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getAllFavourites = async (req, res) => {
    try {
        const wishlist = await Favourite.find()
            .populate('wishlist_items.product_id');
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const removeFavourite = async (req, res) => {
    const { product_id } = req.body;
    try {
        // Kiểm tra xem người dùng có danh sách yêu thích hay không
        const wishlist = await Favourite.findOne({ user_id: req.params.user_id });
        if (!wishlist) {
            return res.status(404).json({ message: 'Không tìm thấy danh sách yêu thích cho người dùng này' });
        }
        console.log(wishlist);

        // Tìm kiếm sản phẩm trong danh sách yêu thích
        const index = wishlist.wishlist_items.findIndex(item => item.product_id === product_id);


        // Xóa sản phẩm khỏi danh sách yêu thích
        wishlist.wishlist_items.splice(index, 1);
        await wishlist.save();

        res.status(200).json({ message: 'Xóa sản phẩm khỏi danh sách yêu thích thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
}

export const checkfavourite = async (req, res) => {
    const productId = req.params.product_id;
    // const userId = req.params.user_id;
    try {
        const data = await Favourite.findOne({
            // user_id: userId,
            product_id: productId,
        });

        return res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};
// export const checkfavourite = async (req, res) => {
//     const productId = req.params.product_id;
//     const userId = req.params.user_id;

//     const data = await Favourite.findOne({
//         $and: [{ user_id: userId }, { product_id: { $in: [productId] } }]
//     }, (error, result) => {
//         if (error) {
//             console.error(error);
//             res.status(500).json({ error });
//         } else {
//             const isProductInWishlist = result !== null;
//             res.json({ is_in_wishlist: isProductInWishlist });
//         }
//     });
// }
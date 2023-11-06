import Favourite from '../models/favourite.js'

// export const favouriteCreat = async (req, res) => {
//     try {
//         const { user_id, product_id } = req.body;
//         const wishlistItem = {
//             product_id,
//         };

//         const wishlist = await Favourite.findOneAndUpdate(
//             { user_id },
//             { $addToSet: { wishlist_items: wishlistItem } },
//             { upsert: true, new: true }
//         );
//         res.json(wishlist);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
export const favouriteCreat = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích hay chưa
        const wishlist = await Favourite.findOne({ user_id });

        if (wishlist && wishlist.wishlist_items.some(item => item.product_id === product_id)) {
            // Sản phẩm đã tồn tại trong danh sách yêu thích
            return res.status(400).json({ message: 'Sản phẩm đã tồn tại trong danh sách yêu thích' });
        }

        const wishlistItem = { product_id };

        const updatedWishlist = await Favourite.findOneAndUpdate(
            { user_id },
            { $addToSet: { wishlist_items: wishlistItem } },
            { upsert: true, new: true }
        );

        res.json(updatedWishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getFavourites = async (req, res) => {
    try {
        const wishlist = await Favourite.findOne({ user_id: req.params.user_id })
            .populate('wishlist_items.product_id')

        // Kiểm tra và loại bỏ các sản phẩm không tồn tại trong danh sách yêu thích
        wishlist.wishlist_items = wishlist.wishlist_items.filter(item => item.product_id !== null);

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


export const checkFavourite = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;

        // Tìm kiếm wishlist của id_user
        const wishlist = await Favourite.findOne({ user_id });

        // Kiểm tra sự tồn tại của id_product trong wishlist_items của id_user
        const productExists = wishlist.wishlist_items.some(item => item.product_id.toString() === product_id);

        if (productExists) {
            res.json({ message: 'Sản phẩm đã tồn tại trong danh sách yêu thích' });
        } else {
            res.json({ message: 'Sản phẩm không tồn tại trong danh sách yêu thích' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
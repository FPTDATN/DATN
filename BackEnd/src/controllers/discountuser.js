import Discount from '../models/discount.js';
import Discountuser from '../models/discountuser.js';
export const saveDiscountToAnotherTable = async (req, res) => {
    const { discountId } = req.params;
    try {
        // Tìm xem mã giảm giá đã tồn tại trong bảng Discountuser chưa
        const existingDiscount = await Discountuser.findOne({ code: discountId });
        
        if (existingDiscount) {
            return res.status(400).json({ message: 'Mã giảm giá đã được lưu', existingDiscount });
        }

        // Lấy thông tin mã giảm giá từ bảng Discount
        const discount = await Discount.findById(discountId);

        if (!discount) {
            return res.status(404).json({ message: 'Mã giảm giá không tồn tại' });
        }

        // Tạo mới bản ghi trong bảng Discountuser
        const {
            code,
            discount: discountValue,
            count,
            startDate,
            endDate,
            maxAmount
        } = discount;

        const newDiscountUser = new Discountuser({
            code,
            discount: discountValue,
            count: 1, 
            startDate,
            endDate,
            maxAmount
        });        

        await newDiscountUser.save();
        return res.status(200).json({ message: 'Đã lưu mã giảm giá vào bảng khác', newDiscountUser });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lưu mã giảm giá vào bảng khác', error: error.message });
    }
};


// hiển thị các mã đã được lưu vào trong countuser
export const getAllDiscountUsers = async (req, res) => {
    const {
        _limit = 999,
        _sort = "createAt",
        _order = "asc",
        _page = 1,
        startDate,
        endDate,
    } = req.query;

    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === 1,
        },
    };
    const filter = {};
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    try {
        const data = await Discountuser.paginate(filter, options);
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
export const deleteDiscountUsers = async (req, res) => {
    const { discountId } = req.params; 
    try {
        const deletedDiscount = await Discountuser.findByIdAndDelete(discountId);
        if (!deletedDiscount) {
            return res.status(404).json({ message: 'Mã giảm giá trong bảng khác không tồn tại' });
        }
        
        return res.status(200).json({ message: 'xóa mã giảm giá thành công ' });
    } catch (error) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa mã giảm giá từ bảng khác', error: error.message });
    }
};
import Breadcrumbs from '@/components/breadcrumbs';
import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
// import { Modal } from 'antd';
// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import UpdateAccount from './update-account';
import { useGetWishlistQuery } from '@/services/favourite';
import { checkAuth } from '@/utils/checkAuth';
// import UploadAvatar from './UploadAvatar';
import './style.css';
// import OrderSumeries from '../orders/OrderSumeries';
// import ListYourFavourite from '@/components/products/list-favourite';

const AccountDetail: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [openAddModal, setOpenAddModal] = useState(false);

    // const handleAddCategory = () => {
    //     setOpenAddModal(true);
    // };
    // const handleModalClose = () => {
    //     setOpenAddModal(false);
    // };
    const { data, isLoading } = checkAuth();
    const { data: authData } = useMeQuery();
    const user_id = authData?._id || '';
    const { data: wishlist } = useGetWishlistQuery(user_id);
    const wishlistItems = wishlist?.wishlist_items || [];
    return (
        <>
            {!data || isLoading ? (
                <Loading />
            ) : (
                <div>
                    <Breadcrumbs>
                        <Outlet />
                    </Breadcrumbs>
                </div>
            )}
        </>
    );
};
export default AccountDetail;

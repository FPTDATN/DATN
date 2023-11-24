import Breadcrumbs from '@/components/breadcrumbs';
import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
import { Modal } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateAccount from './update-account';
import { useGetWishlistQuery } from '@/services/favourite';
import { checkAuth } from '@/utils/checkAuth';
import UploadAvatar from './UploadAvatar';
import './style.css'
import OrderSumeries from '../orders/OrderSumeries';
import ListYourFavourite from '@/components/products/list-favourite';

const AccountDetail: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleAddCategory = () => {
        setOpenAddModal(true);
    };
    const handleModalClose = () => {
        setOpenAddModal(false);
    };

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
                    <Breadcrumbs />

                    <div className="container mb-4 main-container">
                        <Modal
                            title="Cập nhật tài khoản "
                            centered
                            open={openAddModal}
                            onCancel={handleModalClose}
                            footer={null}
                        >
                            <UpdateAccount setOpenAddModal={setOpenAddModal} />
                        </Modal>
                        <div className="row d-flex">
                            <div className="col-lg-4 pb-5">
                                {/* <!-- Account Sidebar--> */}
                                <div className="list-group-item" ><div className="d-flex justify-content-between align-items-center">

                                    <div className="d-inline-block font-weight-medium text-uppercase">Trang cá nhân</div>

                                </div>
                                </div>
                                <div className="author-card d-flex flex-column align-items-center text-center">
                                    <div className="author-card-cover" ><a className="btn btn-style-1 btn-white btn-sm" href="#" data-toggle="tooltip" title="" data-original-title="You currently have 290 Reward points to spend"><i className="fa fa-award text-md"></i>&nbsp;</a></div>
                                    <div className="author-card-profile ">
                                        <div className="author-card-avatar">
                                            <img
                                                src={
                                                    authData?.avatar ||
                                                    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                                                }
                                                alt="avatar"
                                                className="rounded-circle p-1 bg-gray"
                                            />

                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <h4>{authData?.username}</h4>
                                        <p className="text-secondary mb-1">Khách hàng mới</p>
                                        <UploadAvatar />
                                    </div>
                                </div>
                                <div className="wizard">
                                    <nav className="list-group list-group-flush">





                                    </nav>
                                </div>
                            </div>
                            {/* <!-- Orders Table--> */}
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Họ tên</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.username} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.email} disabled />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.phone} disabled />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={authData?.address} disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary">

                                                <button className="btn btn-primary" onClick={handleAddCategory} value="Cập nhật" >Cập nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive card  h-[500px]">
                                    <OrderSumeries />
                                </div>
                            </div>

                            <div>
                                <Link to={'/your-favorite'} className="list-group-item w-[500px] ">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div>
                                            <div className="d-inline-block font-weight-medium text-uppercase">Danh sách yêu thích</div>

                                        </div>
                                    </div>
                                </Link>
                                <ListYourFavourite />
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountDetail;

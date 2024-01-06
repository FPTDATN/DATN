import { calculatePagination } from "@/components/modal/pagination";
import { useMeQuery } from "@/services/auth";
import { useGetAllOrderCommentsQuery, useRemoveOrderCommentMutation } from "@/services/ordercomments";
import { Button, DatePicker, Image, Modal, Popconfirm, Rate, Skeleton, Space } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';

const ListComment = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const { RangePicker } = DatePicker;

  const { data: commentData, isLoading } = useGetAllOrderCommentsQuery(
    {
      startDate: dateRange && dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : '',
      endDate: dateRange && dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',

    }
  );
  const handleDateRangeChange = (dates: any, dateStrings: any) => {

    setDateRange(dates);
  };
  const [mutate] = useRemoveOrderCommentMutation();
  const { data: authData } = useMeQuery();
  // Lọc comments với productId trùng khớp với useParams()
  const handleDeleteComment = async (id: string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };

  // limit
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 8; // Số sản phẩm hiển thị trên mỗi trang
  const paginationOptions = {
    currentPage,
    perPage,
    totalCount: commentData?.length || 0,
    data: commentData || [],
  };

  const { pageCount, currentPageItems } = calculatePagination(paginationOptions);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [searchValue, setSearchValue] = useState('');

  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      {/* <div className="pr-4 p-3">
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
        </Space>
      </div> */}
      <div className="flex-grow text-right">
        <RangePicker onChange={handleDateRangeChange} />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="pl-6 text-xs font-medium py-3">
              Tên người dùng
            </th>
            <th scope="col" className="pl-6 text-xs font-medium py-3">
              Bình Luận
            </th>
            <th scope="col" className="text-center text-xs font-medium py-3">
              Thời Gian
            </th>
            <th scope="col" className="text-center text-xs font-medium py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <Skeleton className="h-[98px]" />
              </td>
            </tr>
          ) : currentPageItems?.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <p className="ml-5">Không có bình luận</p>
              </td>
            </tr>
          ) : (
            currentPageItems?.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white pl-6">
                  {item.userId.username}
                </td>
                <td className="py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white pl-6">
                  {item.text}
                </td>
                <td className="py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white text-center">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="py-4 flex items-center justify-center">
                  <Space size="small">
                    <Popconfirm
                      placement="topRight"
                      title="Bạn Muốn Xóa ?"
                      okText="OK"
                      cancelText="Cancel"
                      okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                      onConfirm={() => handleDeleteComment(item._id!)}
                    >
                      <Button type="link" className="bg-reds text-layer mr-3">Delete</Button>
                    </Popconfirm>
                  </Space>

                  <Space>
                    <Button type="primary" className="bg-primary" onClick={showModal}>
                      Chi tiết
                    </Button>
                    <Modal
                      open={open}
                      title="Chi tiết comment"
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={(_, { CancelBtn }) => (
                        <>
                          <CancelBtn />

                        </>
                      )}
                    >
                      <article
                        key={item?._id}
                        className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                      >
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold p-2">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                // src={
                                //   authData?.avatar
                                // }
                                alt="Michael Gough"
                              />
                              {item?.userId?.username}

                            </p>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time title="February 8th, 2022">
                                {/* {formatTimeToNow(new Date(item?.createdAt))} */}
                              </time>
                            </p>

                          </div>
                          {!authData || authData?._id !== item.userId?._id ? undefined : (


                            <div
                              id={`dropdownComment_${item?._id}`}
                              data-dropdown-toggle={`dropdownComment_${item?._id}`}
                              className="relative inline-block"
                            >
                              <button
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"

                              >
                                <svg
                                  className={`w-4 h-4  transition-all`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 16 3"
                                >
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                              </button>
                              {openAbsolute[item?._id || ''] && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                  <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby={`dropdownComment_${item?._id}_button`}
                                  >





                                  </div>
                                </div>
                              )}

                            </div>
                          )}
                        </footer>
                        <div className="p-3">
                          <Rate disabled allowHalf value={item.rating} character={<span style={{ fontSize: '20px' }}>★</span>} />
                        </div>
                        <div className='flex p-3'>
                          <p className="text-gray-800 dark:text-white text-sm py-2" style={{ opacity: 0.6 }}>Mô tả sản phẩm:


                          </p>
                          <a className='px-1 py-1'> {item.text}</a>
                        </div>
                        <div className="flex">
                          <div>

                            {item.videos.map((video, index) => (
                              <div key={index} className="py-1">
                                <video width={220} height={200} controls>
                                  <source src={video} type="video/mp4" />

                                </video>
                              </div>
                            ))}
                          </div>
                          <div className="py-1 px-2">
                            {item.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt={`image_${index}`}
                                width={150}
                                height={170}
                                className="p-1"
                              />
                            ))}

                          </div>

                        </div>
                      </article>
                    </Modal>
                  </Space>
                </td>

              </tr>

            ))
          )}
        </tbody>

        <div className='mt-4 d-flex justify-content-start align-items-start'>
          <ReactPaginate
            previousLabel={'Quay lại'}
            nextLabel={'Tiếp theo'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination flex justify-center gap-1 text-xs font-medium'}
            activeClassName={'block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-blue-500'}
            pageClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
            previousClassName={'inline-flex  w-[60px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
            nextClassName={'inline-flex  w-[70px] h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'}
            previousLinkClassName={'h-8 p-1 leading-6 '}
            nextLinkClassName={'h-8 p-1 leading-6 '}
            breakClassName={'block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'}
          />
        </div>
      </table>
    </div>
  );
};

export default ListComment;
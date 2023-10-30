import { useGetAllCommentsQuery, useRemoveCommentMutation } from "@/services/comment";
import { Button, Popconfirm, Skeleton, Space } from "antd";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const ListComment = () => {
  const { id: productId } = useParams();
  const { data: commentData, isLoading } = useGetAllCommentsQuery();
  const [mutate] = useRemoveCommentMutation();

  const filteredComments = commentData?.filter((comment) => comment.productId === productId);

  const handleDeleteComment = async (id:string) => {
    try {
      await mutate(id);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa không thành công');
    }
  };

  return (
    <div>
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
                <Skeleton count={3} className="h-[98px]" />
              </td>
            </tr>
          )  : (
            filteredComments?.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-6">
                  {item.userId.username}
                </td>
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-6">
                  {item.text}
                </td>
                <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
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
                      <Button type="link">Delete</Button>
                    </Popconfirm>
                  </Space>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListComment;
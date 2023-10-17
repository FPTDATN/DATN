import { useAddCommentMutation, useGetAllCommentsQuery, useRemoveCommentMutation } from "@/services/comment";
import { Button, Input, Popconfirm, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

interface comment {
    userId?: string;
    productId?: string;
    comments: [
        {
            text: string;
            userId: string;
            productId: string;
            parentCommentId: null,
            _id: string;
            createdAt: Date;
            updatedAt: Date;
        }
    ]
}



console.log();


const Comment = ({ userId, productId, comments }: comment) => {
    // console.log(comments);
    const { data } = useGetAllCommentsQuery()
    const [createComment, { isError, isLoading: isCreatingComment, error }] = useAddCommentMutation();
    const [mutate] = useRemoveCommentMutation();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState<string>('');
    const { TextArea } = Input;
    const [openAbsolute, setOpenAbsolute] = useState(false);

    const handleUpdateComment = () => {
        console.log('Update comment');
    };


    const handleCommentSubmit = async (event: any) => {
        event.preventDefault();
        if (text.trim() === '') {
            console.error('Comment text is required');
            return;
        }
        try {
            setLoading(true);
            await createComment({
                text,
                userId,
                productId
            });
        } catch (error) {
            console.error('Error creating comment:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleDeleteComment = async (id: string) => {
        try {
            await mutate(id)
            toast.success('Xóa thành công');
        } catch (error) {
            toast.error('Xóa không thành công');
        }
    };


    return <>
        <Spin spinning={loading}>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Bình Luận ({data?.length}) </h2>
                    </div>
                    <form className="mb-6" onSubmit={handleCommentSubmit}>
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <TextArea
                            className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700' rows={4}
                            onChange={(e) => setText(e.target.value)}
                            size="large"
                            status={isError || text.trim() === 'bạn phải ghi bình luận' ? 'error' : ''} />
                        <button
                            className="inline-flex items-center  mr-4 py-2 px-4 bg-blue-600 text-white rounded-md focus:ring-4 focus:ring-blue-200"
                            disabled={isCreatingComment || text.trim() === ''} >
                            {isCreatingComment ? 'Đang đăng...' : 'Đăng Bình Luận'}
                        </button>
                    </form>
                    {data && data.length > 0 && data?.map((item) => (
                        <article key={item._id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                        <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />
                                        Michael Gough
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <time title="February 8th, 2022">{new Date(item.createdAt).toLocaleString()}</time>
                                    </p>
                                </div>
                                <div className="relative inline-block">
                                    <button
                                        id="dropdownComment1Button"
                                        data-dropdown-toggle="dropdownComment1"
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button"
                                        onClick={() => setOpenAbsolute(!openAbsolute)}
                                    >
                                        <svg
                                            className={`w-4 h-4 ${openAbsolute ? 'rotate-180' : ''} transition-all`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                        >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>
                                    {openAbsolute && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="dropdownComment1Button"
                                            >
                                                <button
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                    onClick={handleUpdateComment}
                                                >
                                                    Update Comment
                                                </button>
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="Bạn Muốn Xóa ?"
                                                    okText="OK"
                                                    cancelText="Cancel"
                                                    okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
                                                    onConfirm={() => handleDeleteComment(item._id)}
                                                >
                                                    <Button type="link">Delete</Button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                        </li>
                                    </ul>
                                </div>
                            </footer>
                            <div>
                                <p className="text-gray-800 dark:text-white">{item.text}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400"
                                    type="button"
                                >
                                    Reply
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </Spin>
    </>
}
export default Comment
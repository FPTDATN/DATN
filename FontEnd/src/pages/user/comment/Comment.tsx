import { useAddCommentMutation } from "@/services/comment";
import { Input, message } from "antd";
import { useState } from "react";

interface comment{
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


const Comment = ({userId, productId, comments}:comment) => {
    console.log(comments);

    const [createComment, { isError, isLoading: isCreatingComment }] = useAddCommentMutation();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState<string>('');

    const { TextArea } = Input;

    

    const handleCommentSubmit = async (event: any) => {
        event.preventDefault();
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
    
    return <>
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Bình Luận (10)</h2>
                </div>
                <form className="mb-6" onSubmit={handleCommentSubmit}>
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <TextArea
                            className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700' rows={4}
                            onChange={(e) => setText(e.target.value)}
                            size="large"
                            status={isError ? 'error' : ''} />
                        <button
                            className="inline-flex items-center  mr-4 py-2 px-4 bg-blue-600 text-white rounded-md focus:ring-4 focus:ring-blue-200" disabled={isCreatingComment} >
                            {isCreatingComment ? 'Đang đăng...' : 'Đăng Bình Luận'}
                        </button>
                    </form>
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough" />Michael Gough</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                title="February 8th, 2022">Feb. 8, 2022</time></p>
                        </div>
                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                        </button>
                        <div id="dropdownComment1"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.</p>
                    <div className="flex items-center mt-4 space-x-4">
                        <button type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                            <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                            </svg>
                            Reply
                        </button>
                    </div>
                </article>
            </div>
        </section>
    </>
}
export default Comment
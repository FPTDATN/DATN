import { Avatar, Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { RiMoreLine, RiEditLine, RiDeleteBackLine, RiReplyLine } from 'react-icons/ri'

type Props = {};

const CommentSection = ({ }: Props) => {

    const [reply, setReply] = useState<boolean>(false)

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-8 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Bình luận của bạn...
                        </label>
                        <textarea
                            id="comment"
                            rows={2}
                            cols={2}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Bình luận..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-zinc-800 rounded-lg hover:bg-zinc-700"
                    >
                        Bình luận
                    </button>
                </form>
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-x-2 items-center">
                            <Avatar
                                alt="avatar of Jese"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />

                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                JOJO
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time title="February 8th, 2022">Feb. 8, 2022</time>
                            </p>
                        </div>


                        <Dropdown label="Dropdown" trigger='click' renderTrigger={() => <div>
                            <RiMoreLine />
                        </div>}>


                            <Dropdown.Item icon={RiEditLine}>
                                Sửa
                            </Dropdown.Item>
                            <Dropdown.Item icon={RiDeleteBackLine}>
                                Xóa
                            </Dropdown.Item>
                            <Dropdown.Divider />

                        </Dropdown>


                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Very straight-to-point article. Really worth time reading. Thank
                        you! But tools are just the instruments for the UX designers. The
                        knowledge of the design tools are as important as the creation of
                        the design strategy.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                        <button
                            onClick={() => setReply(!reply)}
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >

                            <RiReplyLine /> Reply
                        </button>


                    </div>

                    {/* reply */}
                    {reply && <div className='mt-2'>
                        <form className="mb-6 ">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">
                                    Bình luận của bạn...
                                </label>
                                <textarea
                                    id="comment"
                                    rows={2}
                                    cols={2}
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Bình luận..."
                                    required
                                ></textarea>
                            </div>
                            <div className='flex gap-x-2'>
                                <button
                                    type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-zinc-800 rounded-lg hover:bg-zinc-700"
                                >
                                    Bình luận
                                </button>
                                
                                <button
                                    onClick={() => setReply(false)}
                                    type="button"
                                    className="flex px-4 rounded bg-gray-200 text-black items-center text-sm hover:underline dark:text-gray-400 font-medium"
                                >
                                
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>}
                </article>
                <article className="border-l pl-6 mb-3 lg:ml-8 text-base bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-x-2 items-center">
                            <Avatar
                                alt="avatar of Jese"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />

                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                JOJO
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time title="February 8th, 2022">Feb. 8, 2022</time>
                            </p>
                        </div>
                        <Dropdown label="Dropdown" trigger='click' renderTrigger={() => <div>
                            <RiMoreLine />
                        </div>}>


                            <Dropdown.Item icon={RiEditLine}>
                                Sửa
                            </Dropdown.Item>
                            <Dropdown.Item icon={RiDeleteBackLine}>
                                Xóa
                            </Dropdown.Item>
                            <Dropdown.Divider />

                        </Dropdown>


                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Much appreciated! Glad you liked it ☺️
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                        <button

                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >

                            <RiReplyLine /> Reply
                        </button>
                    </div>



                </article>
            </div>
        </section>
    );
};

export default CommentSection;

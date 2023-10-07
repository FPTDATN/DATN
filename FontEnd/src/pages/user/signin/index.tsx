import { Link } from "react-router-dom"

export const Signin = () => {
    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img alt="Pattern"
                            src="https://bizweb.dktcdn.net/100/399/392/files/nhung-thuong-hieu-quan-ao-viet-nam-7.jpg?v=1615448760018"
                            className="absolute inset-0 h-full w-full object-cover" />
                    </aside>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <a className="block text-blue-600" href="/">
                                <span className="sr-only">Home</span>

                            </a>

                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Đăng nhập
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Tại đây chúng tôi cung cấp các mẫu áo thời trang nam hiện đại và đang hot nhất hiện nay.

                            </p>
                            <hr />
                            <form action="#" className="mt-8 grid grid-cols-6 gap-6">


                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input type="email" id="email" name="email" required className="mt-1 px-2 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-gray-500 invalid:text-gray-600
                                focus:invalid:border-gray-500 focus:invalid:ring-gray-500" />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mật khẩu
                                    </label>

                                    <input type="password" id="password" name="password" required className="mt-1 px-2 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-gray-500 invalid:text-gray-600
                                focus:invalid:border-gray-500 focus:invalid:ring-gray-500" />
                                </div>

                                <div className="col-span-6">
                                    <label className="flex gap-4">
                                        <input type="checkbox" id="MarketingAccept" name="marketing_accept"
                                            className=" h-5 w-5 rounded-md border-gray-200 bg-gray-100 shadow-sm" />

                                        <span className="text-sm text-gray-700">
                                            I want to receive emails about events, product updates and
                                            company announcements.
                                        </span>
                                    </label>
                                </div>



                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link to="/account/signup" className="text-gray-700 underline">Register</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>

        </>
    )
}
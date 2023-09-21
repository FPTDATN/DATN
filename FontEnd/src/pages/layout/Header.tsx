import {
    Collapse,
    Dropdown,
    initTE,
} from "tw-elements";

initTE({ Collapse, Dropdown });

import Logo from '../images/Logo.png'

const Header = () => {
    const divStyle: React.CSSProperties = {
        backgroundPosition: '50%',
        backgroundImage: `url('https://tecdn.b-cdn.net/img/new/slides/146.webp')`,
        height: '450px',
    };

    const color_1: React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Đổi tên thành color_1
    };


    const h_2: React.CSSProperties = {
        height: '50px',
        width: '50px',
        borderRadius: '50%'
    }

    const h_1: React.CSSProperties = {
        height: '35px',
        width: '35px'
    }



    return (

        <header>
            <nav
                className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3 ">
                    <button
                        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>
                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto leading-50"
                        id="navbarSupportedContent1"
                        data-te-collapse-item>
                        <a
                            className="mb-2 ml-10 mr-8 mt-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                            href="#">
                            <img
                                src={Logo}
                                style={h_2}
                                alt="TE Logo"
                                loading="lazy" />

                        </a>


                        <ul
                            className="mr-auto flex flex-col lg:flex-row mt-2"
                            data-te-navbar-nav-ref>
                            <li className="mb-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >Home</a
                                >
                            </li>
                            <li className="mb-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >Features</a
                                >
                            </li>
                            <li className="mb-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >Pricing</a
                                >
                            </li>
                            <li className="mb-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                                    href="#!"
                                    data-te-nav-link-ref
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >About</a
                                >
                            </li>
                        </ul>
                    </div>

                    <div className="relative flex items-center">
                        <a
                            className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            href="#">
                            <span className="[&>svg]:w-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                            </span>
                        </a>

                        <div
                            className="relative"
                            data-te-dropdown-ref
                            data-te-dropdown-alignment="end">
                            <a
                                className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                href="#"
                                id="dropdownMenuButton1"
                                role="button"
                                data-te-dropdown-toggle-ref
                                aria-expanded="false">
                                <span className="[&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span
                                    className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                                >2</span
                                >
                            </a>
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                aria-labelledby="dropdownMenuButton1"
                                data-te-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Another action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Something else here</a
                                    >
                                </li>
                            </ul>
                        </div>


                        {/* avt */}
                        <div
                            className="relative"
                            data-te-dropdown-ref
                            data-te-dropdown-alignment="end">
                            <a
                                className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none mr-8"
                                href="#"
                                id="dropdownMenuButton2"
                                role="button"
                                data-te-dropdown-toggle-ref
                                aria-expanded="false">
                                <img
                                    src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/371860211_1569118947159428_3041477155559823698_n.jpg?stp=dst-jpg_p843x403&_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=aTm2UKtXQgwAX9WtyqN&_nc_ht=scontent.fhan14-1.fna&_nc_e2o=f&oh=00_AfDOp9tKrZx5mklSCtrxMiNtftWp5gzhZN936u_sAlpfAw&oe=65121300"
                                    className="rounded-full"
                                    style={h_1}
                                    alt=""
                                    loading="lazy" />
                            </a>
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                aria-labelledby="dropdownMenuButton2"
                                data-te-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="/signup"
                                        data-te-dropdown-item-ref
                                    >Signup</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="/login"
                                        data-te-dropdown-item-ref
                                    >Login</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Logout</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                style={divStyle}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={color_1}>
                    <div className="flex h-full items-center justify-center">
                        <div className="px-6 text-center text-white md:px-12">
                            <h1 className="mb-6 text-5xl font-bold">Heading</h1>
                            <h3 className="mb-8 text-3xl font-bold">Subeading</h3>
                            <button
                                type="button"
                                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </header>
    )
}

export default Header
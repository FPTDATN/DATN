import { FunctionComponent, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import Notification from "../ui/Notification";
import CartModal from "../modal/CartModal";
import MobileMenuModal from "../modal/MobileMenuModal";
interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="relative  h-[95px]">
            <section className="absolute left-0 right-0 top-0 bottom-0 font-poppins dark:bg-gray-800 bg-gray-800 text-layer">
                <div className="max-w-6xl px-4 mx-auto">
                    <nav className="relative flex items-center justify-between py-4 ">
                        <a href="" className="text-3xl font-semibold leading-none dark:text-gray-400">Logo</a>
                        <div className="flex items-center lg:hidden ">
                            <div className="mr-5 text-2xl flex">
                                <AiOutlineHeart />
                            </div>
                            <CartModal />
                            <Notification />
                            <button
                                onClick={showDrawer}
                                className="flex items-center px-3 py-2 text-primary border border-primary rounded dark:text-gray-400 hover:text-primary hover:border-blue-300 lg:hidden"
                            >
                                <AiOutlineMenu />
                            </button>
                        </div>
                        <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
                            <li><a href="" className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Home</a>
                            </li>
                            <li><a href="" className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">About us</a>
                            </li>
                            <li><a href="" className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Features</a>
                            </li>
                            <li><a href="" className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Blog </a>
                            </li>
                            <li><a href="" className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Testimonials</a>
                            </li>
                        </ul>
                        <div className="items-center justify-end hidden lg:flex dark:text-gray-400">
            
                            <div className="mr-5 text-2xl flex">
                                <AiOutlineHeart />
                            </div>
                            <CartModal />
                            <Notification />
            
                            <a href=""
                                className="items-center hidden px-4 py-2 font-semibold text-layer border border-primary rounded-md hover:text-gray-100 hover:bg-primary lg:flex dark:text-primary dark:hover:bg-transparent dark:border-gray-300 dark:hover:text-blue-300">
                                Sign In
                            </a>
                        </div>
                    </nav>
            
                    <MobileMenuModal open={open} onClose={onClose} />
                </div>
            </section>
        </div>
        )
}

export default Navbar;
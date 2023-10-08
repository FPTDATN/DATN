import { FunctionComponent, useState } from 'react';
import { AiOutlineHeart, AiOutlineMenu,AiOutlineDropbox,AiOutlineUser } from 'react-icons/ai';
import Notification from '../ui/Notification';
import CartModal from '../modal/CartModal';
import MobileMenuModal from '../modal/MobileMenuModal';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Avatar, Dropdown, MenuProps } from 'antd';

import {CiLogout} from 'react-icons/ci'

interface NavbarProps { }


const Navbar: FunctionComponent<NavbarProps> = () => {

    const items: MenuProps['items'] = [
        {
          label: <Link className='text-base' to={''}>Cá nhân</Link>,
          key: '0',
          icon: <AiOutlineUser style={{fontSize: '18px'}}/>
        },
        {
          label: <Link className='text-base' to={''}>Hàng đã đặt</Link>,
          key: '1',
          icon:<AiOutlineDropbox style={{fontSize: '18px'}}/>
        },
        {
          type: 'divider',
        },
        {
          label: <button className='text-base'>Đăng xuất</button>,
          key: '3',
          icon: <CiLogout style={{fontSize: '18px'}}/>
        },
      ];

    const [openAbsolute, setOpenAbsolute] = useState(false);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="relative h-[95px]" >
            <section className="absolute w-full flex-grow left-0 right-0 flex items-center top-0 bottom-0 font-poppins dark:bg-gray-800 bg-gray-800 text-layer">
                <div className="max-w-6xl px-4 w-full mx-auto">
                    <nav className="relative flex items-center justify-between py-4 ">
                        <Link to="/" className="text-3xl hidden lg:block font-semibold leading-none dark:text-gray-400">
                            Logo
                        </Link>
                        <button
                            onClick={showDrawer}
                            className="flex items-center px-3 py-2 text-primary border border-primary rounded dark:text-gray-400 hover:text-primary hover:border-blue-300 lg:hidden"
                        >
                            <AiOutlineMenu />
                        </button>
                        <div className="flex items-center lg:hidden ">
                            <div className="mr-5 text-2xl flex">
                                <AiOutlineHeart />
                            </div>
                            <CartModal />
                            <Notification />
                            <Dropdown menu={{ items }} trigger={['click']} arrow>
                                <Avatar size={'default'} src='./vite.svg' />
                            </Dropdown>
                        </div>

                        <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="relative">
                                <a
                                    onClick={() => setOpenAbsolute(!openAbsolute)}
                                    className="flex items-center cursor-pointer text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
                                >
                                    Thể loại

                                    <span className={`ml-2 text-lg ${openAbsolute ? 'rotate-180' : ''} transition-all`}><MdKeyboardArrowDown /></span>
                                </a>
                                {openAbsolute && <div className="absolute z-50 bg-gray-100 text-gray-900 rounded-sm top-10 left-0 right-0 w-[360px] shadow-lg">
                                    <ul className="grid grid-cols-3">
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 1
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 2
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 3
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 4
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 5
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 6
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-primary/90 text-center px-2 py-1 block" to={''}>
                                                Loại 7
                                            </Link>
                                        </li>
                                    </ul>
                                </div>}
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
                                >
                                    Blog{' '}
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
                                    className="text-sm text-layer dark:text-gray-400 hover:text-primary dark:hover:text-blue-400"
                                >
                                    Testimonials
                                </a>
                            </li>
                        </ul>
                        <div className="items-center justify-end hidden lg:flex dark:text-gray-400">
                            <div className="mr-5 text-2xl flex">
                                <AiOutlineHeart />
                            </div>
                            <CartModal />
                            <Notification />

                            <Link
                                to="/account/signin"
                                className="items-center hidden px-2 py-2 font-semibold text-layer border border-primary rounded-md hover:text-gray-100 hover:bg-primary lg:flex dark:text-primary dark:hover:bg-transparent dark:border-gray-300 dark:hover:text-blue-300"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </nav>

                    <MobileMenuModal open={open} onClose={onClose} />
                </div>
            </section>
        </div>
    );
};

export default Navbar;

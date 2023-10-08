
import { Popover } from 'antd';
import { IoPersonCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';

const text = <span>Account</span>;

const content = (
    <div>
        <Link to="/account/signin"
            className="">
            <p>Đăng nhập</p>
        </Link>
        <Link to="/account/signup"
            className="">
            <p>Đăng kí</p>
        </Link>
        <Link to="/account/details"
            className="">
            <p>Chi tiết tài khoản</p>
        </Link>
    </div>
);

const AccountIcon: React.FC = () => (
    <div className='clear-both whitespace-nowrap flex'>
        <Popover placement="bottom" title={text} content={content} trigger="click">
            <span className="relative inline-block mr-5 text-2xl cursor-pointer">
                <IoPersonCircleOutline />
                {/* <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-600 rounded-full"></span> */}
            </span>
        </Popover>
    </div>
);

export default AccountIcon;
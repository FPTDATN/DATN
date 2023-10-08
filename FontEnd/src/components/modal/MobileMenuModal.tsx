import { Drawer, Menu } from 'antd';
import { FunctionComponent, Key, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
interface MobileModalProps {
    open: boolean;
    onClose: () => void;
}

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const categories = [
    {
        id:1,
        title: 'Loại 1',
        link: '/'
    },
    {
        id:2,
        title: 'Loại 2',
        link: '/'
    }
]

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const MobileMenuModal: FunctionComponent<MobileModalProps> = ({ open, onClose }) => {

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const items: MenuItem[] = [
        getItem(<Link onClick={onClose} to={'/'}>Trang chủ</Link>, '', <AiFillHome />),
        getItem('Thể loại', 'sub1', <BiSolidCategoryAlt />, categories.map((category) => (
            getItem(<Link onClick={onClose} to={category.link}>{category.title}</Link>, category.id)
        ))),
        getItem('Cài đặt', 'sub2', <BsGear />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
    ];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
            <Menu className='w-full' mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} items={items} />
        </Drawer>
    );
};

export default MobileMenuModal;

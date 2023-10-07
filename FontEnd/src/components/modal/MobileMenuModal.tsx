
import { Drawer } from 'antd';
import { FunctionComponent } from 'react';

interface MobileModalProps {
    open: boolean;
    onClose: () => void
}

const MobileMenuModal: FunctionComponent<MobileModalProps> = ({ open, onClose }) => {
    return (
        <Drawer title="Menu" placement="left" onClose={onClose} open={open}>


            <ul className="text-left">
                <li className="pb-3">
                    <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-100">
                        Home
                    </a>
                </li>
                <li className="pb-3">
                    <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">
                        About us
                    </a>
                </li>
                <li className="pb-3">
                    <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">
                        Features
                    </a>
                </li>
                <li className="pb-3">
                    <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">
                        Blog{' '}
                    </a>
                </li>
                <li className="pb-3">
                    <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">
                        Testimonials
                    </a>
                </li>
            </ul>

        </Drawer>
    );
};

export default MobileMenuModal;

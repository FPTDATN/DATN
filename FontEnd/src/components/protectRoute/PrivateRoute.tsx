import { useMeQuery } from '@/services/auth';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';

type Props = {
    children: ReactNode;
};

const ProtectRoute = ({ children }: Props) => {

    const router = useNavigate()

    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        if (!data || data.role !== 'admin') router('/404');
    }, [data]);

    return <>{!data || data.role !== 'admin' || isLoading ? <Loading /> : children}</>;
};

export default ProtectRoute;

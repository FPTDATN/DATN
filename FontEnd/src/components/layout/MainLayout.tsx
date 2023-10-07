import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { Breadcrumbs } from '../breadcrumbs'

const MainLayout = () => {
    return (

        <div>
            <Navbar />
            <Breadcrumbs />
            <Outlet />

        </div>

    )
}

export default MainLayout
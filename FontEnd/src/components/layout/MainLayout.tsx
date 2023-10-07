import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
<<<<<<< HEAD
import Footer from '../footer/Footer'
=======
import { Breadcrumbs } from '../breadcrumbs'
>>>>>>> 81d16f2430bf00e46b5712ccf2246de3b9b331e2

const MainLayout = () => {
    return (

        <div>
<<<<<<< HEAD
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
=======
            <Navbar />
            <Breadcrumbs />
            <Outlet />

>>>>>>> 81d16f2430bf00e46b5712ccf2246de3b9b331e2
        </div>

    )
}

export default MainLayout
import {Outlet} from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const MainLayout = () => {
    return (
       
        <div>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </div>
        
    )
}

export default MainLayout
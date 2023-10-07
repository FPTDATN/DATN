import {Outlet} from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const MainLayout = () => {
    return (
       
        <div>
            <Navbar/>
            <div className='mt-20'>
                <Outlet/>
            </div>
        </div>
        
    )
}

export default MainLayout
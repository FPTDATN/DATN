import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
    return <>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </>

}

export default Layout
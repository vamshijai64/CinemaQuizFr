import {Outlet} from 'react-router-dom';
import styles from "./Main.module.scss";
// import SideMenu from "../SideNav/SideNav";
import { FaBars } from "react-icons/fa"; // For hamburger menu icon
import { useState } from 'react';

function Main({user}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); //For toggling sidebar
    }
    return (       
    <div className={styles.container}>
        {/* Hamburger Menu (Only visible on small screens) */}
        <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
            <FaBars /> 
        </div>
 
        {/* Main Content Area */}
        <div className={`${styles.main} ${isSidebarOpen ? styles.withSidebar : styles.fullWidth}`}>
            <Outlet />
        </div>
    </div> 
    )
}

export default Main;
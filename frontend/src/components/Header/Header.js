import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss';
import { RiAdminFill } from "react-icons/ri";


function Header() {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");  // Remove token
        navigate("/", { replace: true });  // Navigate to login page and replace history
    
        // For Clearing browser history to prevent to go back 
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", function () {
            navigate("/", { replace: true }); // Redirecting to login if back button is clicked
        });
    };

    return(
        <div className={styles.header}>
            <p>CineQuiz - Admin Panel</p>
            <div
                className={styles.icon}
                onMouseEnter={() => setIsSubmenuOpen(true)}
                onMouseLeave={() => setIsSubmenuOpen(false)}
            >
                <RiAdminFill />
                Admin
                {isSubmenuOpen && (
                    <div className={styles.submenu}>
                        <div className={styles.submenuItem} onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>  
    )
}

export default Header;
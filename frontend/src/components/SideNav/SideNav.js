import styles from './SideNav.module.scss';
import {Link} from 'react-router-dom';
// import { FaRegClock } from "react-icons/fa6";
import { PiHashStraightDuotone } from "react-icons/pi";
// import { CiBoxList } from "react-icons/ci";
import { SlBulb } from "react-icons/sl";
// import { MdOutlineMovieFilter } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";
import { MdMovieEdit } from "react-icons/md";

function SideMenu() {
    
    return(
        <div className={styles.sidemenu}>
            <h2>CineQuiz</h2>
            <nav>
            {/* <p onClick={() => onMenuClick("dashboard")}><FaRegClock /> Dashboard</p>
            <p onClick={() => onMenuClick("categories")}><PiHashStraightDuotone />Categories</p>
            <p onClick={() => onMenuClick("questions")}><SlBulb />Questions</p>
            {/* <p onClick={() => onMenuClick("quiz")}><CiBoxList />Quizzes</p>  */}
           {/* <p onClick={()=>onMenuClick('movienews')}><  MdMovieEdit/>MovieNews</p>
           <p onClick={()=>onMenuClick('moviereviews')}><MdOutlineLocalMovies/>MovieReviews</p> */}

            {/* <p><Link to="dashboard"><FaRegClock /> Dashboard</Link></p> */}
            <p><Link to='categories'><PiHashStraightDuotone />Categories</Link></p>
            <p><Link to='questions'><SlBulb />Questions</Link></p>
            <p><Link to='news'><  MdMovieEdit/>MovieNews</Link></p>
            <p><Link to='reviews'><MdOutlineLocalMovies/>MovieReviews</Link></p> 
            
            
            </nav>
        </div>
    )
}

export default SideMenu;
import { Link } from "react-router-dom";
import "../../style/Navigation.css";
import ProfileDropdown from "./profile";
const Navigation = () => {


    return (
        <nav className="info">
            <div className="navbar">
                <div className="container nav-container">
                    <input className="checkbox" type="checkbox" name="" id="" />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <div className="logo">
                        <ProfileDropdown />
                    </div>
                    <div className="menu-items bg-[#0B1221]">
                        <li className="text-white"><Link className="atag text-white" to="/">Home</Link></li>
                        <li className="text-white"><Link className="atag text-white" to="/shop">Shop</Link></li>
                        <li className="text-white"><Link className="atag text-white" to="/aboutus">About</Link></li>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

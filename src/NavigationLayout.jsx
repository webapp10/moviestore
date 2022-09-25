import { Outlet, NavLink } from "react-router-dom";

const NavigationLayout = () => {
    return (
        <>
            <div className="logo">MOVIE STORE</div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/moviestore/home">HOME</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/categories">CATEGORIES</NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/moviestore/about">ABOUT</NavLink>
                </li>
            </ul>

            <Outlet />
        </>
    )
};

export default NavigationLayout;
import React, { useState } from 'react'
import "./Header.css";
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { clearState } from '../../redux/slices/userLoginSlice';
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { currentUser, loginStatus, errorMessage, isPending } = useSelector(state => state.userLogin);
    const [showDropDown, setShowDropDown] = useState(false)

    function handleShowDropdown() {
        if (showDropDown === true) {
            setShowDropDown(false)
        }
        else {
            setShowDropDown(true)
        }
    }

    function handleLogout() {
        // Dispatch the clearState action to reset the login state
        dispatch(clearState());

        // Clear any stored tokens or user data
        localStorage.removeItem('token');

        // Navigate to the desired route after logout (e.g., the login page)
        navigate('/login');
    }

    return (
        <div className='header'>

            <div className='header-logo'>
                <NavLink id='logo' to="/"><img src={logo} height={"50"} alt='Logo' /></NavLink>
                <NavLink to="/"><div className='.header-button'>Craftwood <br /> Machinery</div></NavLink>
            </div>

            <div className='header-links'>

                <div className='header-top'>
                    <div><NavLink to="/contact">Contact Us</NavLink></div>
                    {loginStatus ? <div><NavLink to="/" onClick={handleLogout}>Logout</NavLink></div> : <div><NavLink to="/login">Login</NavLink></div>}
                    {loginStatus ? <div><NavLink to="/myprofile">My Profile</NavLink></div> : <div><NavLink to="/register">Register</NavLink></div>}
                </div>

                <div className='header-bottom'>
                    <div className='header-menu'>
                        <div><NavLink to="/">HOME</NavLink></div>
                        {(currentUser.userType === "customer" || currentUser.userType === undefined) ? <div><NavLink to="/category">CATEGORY</NavLink></div> : <div><NavLink to="/products">Products</NavLink></div>}
                        {(currentUser.userType === "customer" || currentUser.userType === undefined) ? <div><NavLink to="/quotationreport">QUOTATIONS</NavLink></div> : <div><NavLink to="/quotation">Product Request</NavLink></div>}
                    </div>

                    <div className='search-bar'>
                        <form>
                            <div className='searchbar-view'>
                                <input type='text' id='search-bar' placeholder='search product'></input>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="dropdown">
                {/* <button className="dropdown-button" onClick={handleShowDropdown}> */}
                <GiHamburgerMenu size={30} className="dropdown-button" onClick={handleShowDropdown} />
                {/* </button> */}
                {showDropDown && <div className="dropdown-content">
                    <NavLink to="/">Home</NavLink>
                    {(currentUser.userType === "customer" || currentUser.userType === undefined) ? <NavLink to="/category">CATEGORY</NavLink> : <NavLink to="/products">Products</NavLink>}
                    {(currentUser.userType === "customer" || currentUser.userType === undefined) ? <NavLink to="/quotationreport">QUOTATIONS</NavLink> : <NavLink to="/quotation">Product Request</NavLink>}
                    {loginStatus ? <NavLink to="/myprofile">My Profile</NavLink> : <NavLink to="/register">Register</NavLink>}
                    {loginStatus ? <NavLink to="/" onClick={handleLogout}>Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
                    <NavLink to="/contact">Contact Us</NavLink>
                </div>}
            </div>

        </div>
    )
}

export default Header
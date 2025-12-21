import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getDecodedToken } from "../services/UserService";
import { SiteTheme, SearchContext } from "../App";
import Swal from "sweetalert2";
import Token from "../interfaces/Token";

interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isBusiness, setIsBusiness] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const userToken: Token | null = getDecodedToken();
        !userToken ? setIsLoggedIn(false) : setIsLoggedIn(true)
        setIsAdmin(userToken?.isAdmin || false);
        setIsBusiness(userToken?.isBusiness || false);
    }, []);

    const { setSearchText } = useContext(SearchContext);
    const [localSearch, setLocalSearch] = useState("");

    return (<>
        <nav className="navbar navbar-expand-lg sticky-top" data-bs-theme={darkMode ? "dark" : "light"}>
            <div className="container-fluid">
                <NavLink className="navbar-brand ms-3" to="/" onClick={() => setSearchText("")}>
                    <img src="/bizCardsLogo_full.svg" alt="logo" style={{maxWidth:"120px"}}/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
                        </li>
                        {isLoggedIn &&
                            <li>
                                <NavLink className="nav-link" aria-current="page" to="/favorites">Favorites</NavLink>
                            </li>
                        }
                        {(isBusiness || isAdmin) && <li>
                            <NavLink className="nav-link" aria-current="page" to="/my-cards">My Cards</NavLink>
                            </li>}
                        {isAdmin && 
                            <li>
                                <NavLink className="nav-link" aria-current="page" to="/sandbox">Sandbox</NavLink>
                            </li>
                        }
                    </ul>
                    <form className="d-flex" role="search" onSubmit={(e) => {e.preventDefault(); setSearchText(localSearch);}}>
                        <input className="form-control me-2" type="search" placeholder="Search" value={localSearch} onChange={(e) => {
                                const value = e.target.value;
                                setLocalSearch(value);
                                if (value === "") {
                                setSearchText("");
                                }
                            }}
                        />
                        <button className={darkMode ? "btn btn-outline-light me-3" : "btn btn-outline-dark me-3"} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <button className="btn mx-1 ps-0" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                        {darkMode ? (
                            <i className="fa-solid fa-sun"></i>
                        ) : (
                            <i className="fa-solid fa-moon"></i>
                        )}
                    </button>
                    {!isLoggedIn && <>
                        <NavLink className="nav-link pe-3" aria-current="page" to="/register">Sign Up</NavLink>
                        <NavLink className="nav-link pe-3" aria-current="page" to="/login">Login</NavLink>
                    </>}
                    {isLoggedIn && <>
                        <div className="dropdown">
                            <button className="btn ps-0" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-circle-user fs-2"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li>
                                    <Link className="dropdown-item" to={"/profile"}>Profile</Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link className="dropdown-item text-danger" to={"."} onClick={() => {
                                        Swal.fire({
                                            title: "Leaving so soon?",
                                            text: "Sad to see you go - come back again!",
                                            showCloseButton: true,
                                            showCancelButton: true,
                                            theme: `${darkMode ? "dark" : "light"}`,
                                            imageUrl: "https://openclipart.org/image/2000px/334745",
                                            imageWidth: "auto",
                                            imageHeight: 200,
                                            imageAlt: "Custom image"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                sessionStorage.removeItem("token");
                                                navigate("/login");
                                            } else {
                                                return;
                                            }
                                        });
                                        }}>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                    }
                </div>
            </div>
        </nav>
    </>);
}
 
export default Navbar;
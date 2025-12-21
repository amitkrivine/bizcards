import { FunctionComponent } from "react";
import { getAdminCredentials, getBusinessCredentials } from "../services/UserService";
import { useNavigate } from "react-router-dom";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    return (<>
        <div className="fixed-bottom d-flex justify-content-center bg-dark m-0">
            <button className="btn d-flex flex-column align-items-center text-white px-3 mt-1" onClick={() => navigate("/about")}>
                <i className="fa-solid fa-circle-info"></i>
                <p className="mb-1">About</p>
            </button>
            {token &&
                <button className="btn d-flex flex-column align-items-center text-white px-3 mt-1" onClick={() => navigate("/favorites")}>
                    <i className="fa-solid fa-heart"></i>
                    <p className="mb-1">Favorites</p>
                </button>}
            {(getBusinessCredentials() || getAdminCredentials()) &&
                <button className="btn d-flex flex-column align-items-center text-white px-3 mt-1" onClick={() => navigate("/my-cards")}>
                    <i className="fa-solid fa-address-book"></i>
                    <p className="mb-1">My Cards</p>
                </button>}
            
        </div>
    </>);
}
 
export default Footer;
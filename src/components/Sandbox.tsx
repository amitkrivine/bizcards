import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

interface SandboxProps {
    
}
 
const Sandbox: FunctionComponent<SandboxProps> = () => {
    const navigate = useNavigate();
    return (<>
    <Navbar/>
    <div className="d-flex flex-column justify-content-center align-items-center">
        <img  className="mt-3" src="https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-construction-clipart-construction-construction-site-construction-site-construction-digging-excavator-with-png-image_6805359.png" alt="under construction" />
        <p className="display-4 my-3">This page is under construction</p>
        <p>We are working hard on it being available for you! Sorry for the inconvenience.</p>
        <button className="btn mainBtns" onClick={() => navigate(-1)}>Back</button>

    </div>
    <Footer/>
    </>);
}
 
export default Sandbox;
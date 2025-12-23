import { FunctionComponent } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return (<>
    <Navbar/>
    <div className="container text-center pb-4 mb-5">
        <div>
            <h4 className="display-4 mt-4 pb-1">ABOUT</h4>
            <p className="mb-3 pb-3">What are BizCards? And who's behind it?</p>
        </div>
        <hr />
        <div className="mb-4">
            <p className="h5 fw-bold py-3">About the site</p>
            <p>BizCards is a platform for creating and managing business cards.</p>
            <p>It allows users to view business cards and add favorites to their account.</p>
            <p>Business users can create, edit, and delete their own business cards, for other users to view and favorite.</p>
            <img src="/bizCardsLogo_full.svg" alt="logo" className="pt-2" style={{maxWidth: "200px"}} />
        </div>
        <div className="mb-4">
            <p className="h6 fw-bold py-3">How does it work?</p>
            <p>When browsing as guest, BizCards allows you to view and search business cards.</p>
            <p>Once registered, it allows you to add favorites to your account, and if registered as a business - create new cards as well.</p>
            <p>Business users can also edit and delete their own business cards, to keep them up to date.</p>
        </div>
        <div className="mb-5">
            <p className="h5 fw-bold py-3">About me</p>
            <p>My name is Amit Krivine, I am a 33 year old full-stack development student.</p>
            <p>I am passionate about creating efficient and user-friendly web applications.</p>
            <p>I hope you enjoy using BizCards!</p>
        </div>
    </div>
    <Footer/>
    </>);
};
 
export default About;
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getDecodedToken, getUserById } from "../services/UserService";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import User from "../interfaces/User";
import ViewEditModal from "./ViewEditModal";
import { SiteTheme } from "../App";

interface UserProfileProps {
    
}
 
const UserProfile: FunctionComponent<UserProfileProps> = () => {
    const { darkMode } = useContext(SiteTheme);

    const [user, setUser] = useState<User>();
    const [userChanged, setUserChanged] = useState<boolean>(false);

    const userToken = getDecodedToken();

    const refresh = () => setUserChanged(!userChanged);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        getUserById(userToken?._id as string)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                title: "Oops...",
                text: "Something went wrong",
                theme: `${darkMode ? "dark" : "light"}`,
                icon: "error"
            })
        })
    },[])
    

    return (<>
        <Navbar/>
        <div className="container pb-4 mb-5 d-flex flex-column align-items-center">
            <h4 className="display-4 my-3 pb-2">Profile</h4>
            <div className="card mb-3" style={{ maxWidth: "80%" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={user?.image.url || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="img-fluid rounded-start p-3" alt={user?.image.alt}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column justify-content-between" style={{height: "100%"}}>
                            <div className="flex-grow-1">
                                <div className="mb-3">
                                    <p className="card-text fw-bold mb-0">Full Name</p>
                                    <p className="card-text">{user?.name.first} {user?.name.middle} {user?.name.last}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="card-text fw-bold mb-0">Address</p>
                                    <p className="card-text">{user?.address.street} {user?.address.houseNumber}, {user?.address.city} {user?.address.state}, {user?.address.country}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="card-text fw-bold mb-0">Phone</p>
                                    <p className="card-text">{user?.phone}</p>
                                </div>
                            </div>
                            <button className="btn mainBtns w-75 align-self-center" onClick={() => setShowModal(true)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>

        <ViewEditModal show={showModal} user={user as User} onHide={() => {
            setShowModal(false);
            refresh();
        }}/>

    </>);
}
 
export default UserProfile;
import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import { SiteTheme } from "../App";
import EditUser from "./EditUser";
import User from "../interfaces/User";

interface ViewEditModalProps {
    show: boolean;
    onHide: Function;
    user: User;
}
 
const ViewEditModal: FunctionComponent<ViewEditModalProps> = ({user, show, onHide}) => {
    const { darkMode } = useContext(SiteTheme);
    
    return (<>
        <Modal show={show} onHide={() => onHide()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered contentClassName={darkMode ? "modal-dark" : ""}>
            <div data-bs-theme={darkMode ? "dark" : "light"}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                EDIT USER DETAILS
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user && <EditUser user={user} onHide={() => onHide()} />}
            </Modal.Body>
            </div>
        </Modal>
    </>);
}
 
export default ViewEditModal;
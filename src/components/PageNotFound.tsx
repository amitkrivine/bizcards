import { FunctionComponent } from "react";

interface PageNotFoundProps {
    
}
 
const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (<>
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{height: "90vh"}}>
            <h4>PAGE NOT FOUND</h4>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-illustration-svg-download-png-3119148.png" alt="Page not found" />
        </div>
    </>);
}
 
export default PageNotFound;
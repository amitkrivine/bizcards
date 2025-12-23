import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import { loginUser } from "../services/UserService";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface LoginProps {
    
}
 
const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8, "password must be at least 8 characters").matches(/^(?=(?:.*\d){3,})(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*\-_]).{8,}$/, "password must contain at least 4 digits, one uppercase letter, one lowercase letter and one special character")
        }),
        onSubmit: async values => {
            try{
                const response = await loginUser({email: values.email, password: values.password });
                localStorage.setItem("token", response.data);
                console.log("Login successful - ", response.data);
                navigate("/");
                Swal.fire({
                    title: "Welcome!",
                    text: "Enjoy your stay!",
                    theme: `${darkMode ? "dark" : "light"}`,
                    icon: "success"
                })
            }
            catch(error){
                console.log("Login failed - ", error);
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong. Try again",
                    theme: `${darkMode ? "dark" : "light"}`,
                    icon: "error"
                })
            }
        }
    })
    return (<>
        <Navbar/>
        <div className="container text-center">
            <h4 className="display-4 mt-4 mb-3">LOGIN</h4>
            <form onSubmit={formik.handleSubmit} className="w-75 px-4 m-auto"> 
                <div className="form-floating mb-3 col-md">
                    <input type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="name@example.com"/>
                    <label htmlFor="email">Email*</label>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                    )}
                </div>
                <div className="form-floating mb-3 col-md">
                    <input type="password" className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Password"/>
                    <label htmlFor="password">Password*</label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                    )}
                </div>
                
                <div className="row g-2">
                    <button className="btn secondaryBtns mx-md-2 mb-3 py-2 col-md" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn secondaryBtns mx-md-2 mb-3 py-2 col-md">Refresh</button>
                </div>
                <button type="submit" className="btn mainBtns py-2 w-100 mb-3 m-auto" disabled={!formik.isValid || !formik.dirty}>Login</button>
            </form>
        </div>
    </>);
}
 
export default Login;
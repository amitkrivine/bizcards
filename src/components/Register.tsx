import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import Navbar from "./Navbar";
import { addUser, getBusinessCredentials } from "../services/UserService";
import User from "../interfaces/User";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface RegisterProps {
    
}
 
const Register: FunctionComponent<RegisterProps> = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    const formik = useFormik({
        initialValues: {
            firstName: "", middleName: "", lastName: "", phone: "", email: "", password: "", imgUrl: "", imgAlt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zipcode: "", isBusiness: false
        },
        validationSchema: yup.object({
            firstName: yup.string().required("first name is a required filed").min(2, "first name must be at least 2 charachters"),
            middleName: yup.string().min(2, "middle name must be at least 2 charachters"),
            lastName: yup.string().required("last name is a required field").min(2, "last name must be at least 2 charachters"),
            phone: yup.string().required().matches(/^(?:\+972|0)(?:[2-9]|5[0-9])[-\s]?\d{3}[-\s]?\d{4}$/, "phone number must match the Israeli format"),
            email: yup.string().required().email().min(5),
            password: yup.string().required().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[!@#$%^&*_-]).{8,}$/, "password must contain 8 characters, one uppercase, one lowercase, four numbers, and one special case character"),
            imgUrl: yup.string().min(4, "image URL must be at least 4 charachters").url(),
            imgAlt: yup.string().min(4, "image alternative text must be at least 4 charachters"),
            state: yup.string().min(2),
            country: yup.string().required().min(2),
            city: yup.string().required().min(3),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required("house number is a required field"),
            zipcode: yup.string().min(4)
        }),
        onSubmit: (values) => {
            const newUser: User = {
                name: {
                    first: values.firstName,
                    middle: values.middleName || undefined,
                    last: values.lastName
                },
                phone: values.phone,
                email: values.email,
                password: values.password,
                image: {
                    url: values.imgUrl || undefined,
                    alt: values.imgAlt || undefined
                },
                address: {
                    state: values.state || undefined,
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    houseNumber: values.houseNumber,
                    zip: values.zipcode || undefined
                },
                isBusiness: values.isBusiness
            };
            
            console.log(newUser);
            addUser(newUser)
                .then((response) => {
                    if (response.status == 201) {
                        Swal.fire({
                            title: "Welcome!",
                            text: "You signed up successfully! Login to test your new user",
                            theme: `${darkMode ? "dark" : "light"}`,
                            icon: "success"
                        });
                        navigate("/login");
                    } else {
                        Swal.fire({
                            title: "Oops...",
                            text: "Something went wrong",
                            theme: `${darkMode ? "dark" : "light"}`,
                            icon: "error"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        title: "Oops...",
                        text: "Something went wrong",
                        theme: `${darkMode ? "dark" : "light"}`,
                        icon: "error"
                    })
                });
        }
    })
    return (<>
        <Navbar/>
        <div className="container text-center">
            <h4 className="display-4 my-3">REGISTER</h4>
            <form onSubmit={formik.handleSubmit} className="w-100 px-4 m-auto">
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`} id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="John"/>
                        <label htmlFor="firstName">First Name*</label>
                        {formik.touched.firstName && formik.errors.firstName && (
                            <p className="text-danger">{formik.errors.firstName}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="middleName" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Michael"/>
                        <label htmlFor="middleName">Middle Name</label>
                        {formik.touched.middleName && formik.errors.middleName && (
                            <p className="text-danger">{formik.errors.middleName}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`} id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Doe"/>
                        <label htmlFor="lastName">Last Name*</label>
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="text-danger">{formik.errors.lastName}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="phone" className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="0501234567"/>
                        <label htmlFor="phone">Phone*</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
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
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="imgUrl" name="imgUrl" value={formik.values.imgUrl} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="example.com/img.jpg"/>
                        <label htmlFor="imgUrl">Image URL</label>
                        {formik.touched.imgUrl && formik.errors.imgUrl && (
                            <p className="text-danger">{formik.errors.imgUrl}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="imgAlt" name="imgAlt" value={formik.values.imgAlt} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="example.com/img.jpg"/>
                        <label htmlFor="imgAlt">Image Alt</label>
                        {formik.touched.imgAlt && formik.errors.imgAlt && (
                            <p className="text-danger">{formik.errors.imgAlt}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="state" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Utah"/>
                        <label htmlFor="state">State</label>
                        {formik.touched.state && formik.errors.state && (
                            <p className="text-danger">{formik.errors.state}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`} id="country" name="country" value={formik.values.country} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="USA"/>
                        <label htmlFor="country">Country*</label>
                        {formik.touched.country && formik.errors.country && (
                            <p className="text-danger">{formik.errors.country}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`} id="city" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Salt Lake City"/>
                        <label htmlFor="city">City*</label>
                        {formik.touched.city && formik.errors.city && (
                            <p className="text-danger">{formik.errors.city}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.street && formik.errors.street ? 'is-invalid' : ''}`} id="street" name="street" value={formik.values.street} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="University blvd"/>
                        <label htmlFor="street">Street*</label>
                        {formik.touched.street && formik.errors.street && (
                            <p className="text-danger">{formik.errors.street}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.houseNumber && formik.errors.houseNumber ? 'is-invalid' : ''}`} id="houseNumber" name="houseNumber" value={formik.values.houseNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="0"/>
                        <label htmlFor="houseNumber">House Number*</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (
                            <p className="text-danger">{formik.errors.houseNumber}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="zipcode" name="zipcode" value={formik.values.zipcode} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="68000"/>
                        <label htmlFor="zipcode">Zipcode</label>
                        {formik.touched.zipcode && formik.errors.zipcode && (
                            <p className="text-danger">{formik.errors.zipcode}</p>
                        )}
                    </div>
                </div>
                <div className="form-check mb-3 text-start">
                    <input type="checkbox" className="form-check-input" id="isBusiness" name="isBusiness" checked={formik.values.isBusiness} onChange={formik.handleChange}/>
                    <label className="form-check-label" htmlFor="isBusiness">
                        Signup as business
                    </label>
                </div>
                <div className="row g-2">
                    <button className="btn btn-secondary mx-md-2 mb-3 py-2 col-md" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn btn-secondary mx-md-2 mb-3 py-2 col-md">Refresh</button>
                </div>
                <button type="submit" className="btn btn-warning py-2 w-100 mb-3 m-auto" disabled={!formik.isValid || !formik.dirty}>Register</button>
            </form>
        </div>
    </>);
}
 
export default Register;
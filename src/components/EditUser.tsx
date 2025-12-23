import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import User from "../interfaces/User";
import Swal from "sweetalert2";
import { updateUser } from "../services/UserService";
import { SiteTheme } from "../App";

interface EditUserProps {
    onHide: Function;
    user: User;
}
 
const EditUser: FunctionComponent<EditUserProps> = ({user, onHide}) => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: {first: user.name?.first || "", middle: user.name?.middle || "", last: user.name?.last || "",},
            phone: user.phone || "",
            email: user.email || "",
            image: {url: user.image?.url || "", alt: user.image?.alt || "",},
            address: {state: user.address?.state || "", country: user.address?.country || "", city: user.address?.city || "", street: user.address?.street || "", houseNumber: user.address?.houseNumber || 0, zip: user.address?.zip || "",},
            isBusiness: user.isBusiness || false,
        },
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required("first name is a required filed").min(2, "first name must be at least 2 charachters"),
                middle: yup.string().min(2, "middle name must be at least 2 charachters"),
                last: yup.string().required("last name is a required field").min(2, "last name must be at least 2 charachters"),
            }),
            phone: yup.string().required().matches(/^(?:\+972|0)(?:[2-9]|5[0-9])[-\s]?\d{3}[-\s]?\d{4}$/, "phone number must match the Israeli format"),
            image: yup.object({
                url: yup.string().min(4, "image URL must be at least 4 charachters").url(),
                alt: yup.string().min(4, "image alternative text must be at least 4 charachters"),
            }),
            address: yup.object({
                state: yup.string().min(2),
                country: yup.string().required().min(2),
                city: yup.string().required().min(3),
                street: yup.string().required().min(2),
                houseNumber: yup.number().required("house number is a required field"),
                zip: yup.string().min(4)
            })
        }),
        onSubmit: (values) => {
            const payload = {
                name: values.name,
                phone: values.phone,
                image: values.image,
                address: values.address
            };

            updateUser(user._id as string, payload as any)
                .then((response) => {
                    if (response.status == 200 || response.status == 201) {
                        Swal.fire({
                            title: "Success!",
                            text: "Your profile has been updated successfully!",
                            theme: `${darkMode ? "dark" : "light"}`,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        onHide();
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
        <div className="container text-center" data-bs-theme={darkMode ? "dark" : "light"}>
            <form onSubmit={formik.handleSubmit} className="w-100 px-4 m-auto">
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.name?.first && formik.errors.name?.first ? 'is-invalid' : ''}`} id="firstName" name="name.first" value={formik.values.name.first} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="John"/>
                        <label htmlFor="firstName">First Name*</label>
                        {formik.touched.name?.first && formik.errors.name?.first && (
                            <p className="text-danger">{formik.errors.name.first}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="middleName" name="name.middle" value={formik.values.name.middle} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Michael"/>
                        <label htmlFor="middleName">Middle Name</label>
                        {formik.touched.name?.middle && formik.errors.name?.middle && (
                            <p className="text-danger">{formik.errors.name.middle}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.name?.last && formik.errors.name?.last ? 'is-invalid' : ''}`} id="lastName" name="name.last" value={formik.values.name.last} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Doe"/>
                        <label htmlFor="lastName">Last Name*</label>
                        {formik.touched.name?.last && formik.errors.name?.last && (
                            <p className="text-danger">{formik.errors.name.last}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="tel" className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="0501234567"/>
                        <label htmlFor="phone">Phone*</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="imgUrl" name="image.url" value={formik.values.image.url} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="example.com/img.jpg"/>
                        <label htmlFor="imgUrl">Image URL</label>
                        {formik.touched.image?.url && formik.errors.image?.url && (
                            <p className="text-danger">{formik.errors.image.url}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="imgAlt" name="image.alt" value={formik.values.image.alt} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Profile picture"/>
                        <label htmlFor="imgAlt">Image Alt</label>
                        {formik.touched.image?.alt && formik.errors.image?.alt && (
                            <p className="text-danger">{formik.errors.image.alt}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="state" name="address.state" value={formik.values.address.state} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Utah"/>
                        <label htmlFor="state">State</label>
                        {formik.touched.address?.state && formik.errors.address?.state && (
                            <p className="text-danger">{formik.errors.address.state}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.address?.country && formik.errors.address?.country ? 'is-invalid' : ''}`} id="country" name="address.country" value={formik.values.address.country} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="USA"/>
                        <label htmlFor="country">Country*</label>
                        {formik.touched.address?.country && formik.errors.address?.country && (
                            <p className="text-danger">{formik.errors.address.country}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.address?.city && formik.errors.address?.city ? 'is-invalid' : ''}`} id="city" name="address.city" value={formik.values.address.city} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Salt Lake City"/>
                        <label htmlFor="city">City*</label>
                        {formik.touched.address?.city && formik.errors.address?.city && (
                            <p className="text-danger">{formik.errors.address.city}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.address?.street && formik.errors.address?.street ? 'is-invalid' : ''}`} id="street" name="address.street" value={formik.values.address.street} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="University blvd"/>
                        <label htmlFor="street">Street*</label>
                        {formik.touched.address?.street && formik.errors.address?.street && (
                            <p className="text-danger">{formik.errors.address.street}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="number" className={`form-control ${formik.touched.address?.houseNumber && formik.errors.address?.houseNumber ? 'is-invalid' : ''}`} id="houseNumber" name="address.houseNumber" value={formik.values.address.houseNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="0"/>
                        <label htmlFor="houseNumber">House Number*</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                            <p className="text-danger">{formik.errors.address.houseNumber}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="zipcode" name="address.zip" value={formik.values.address.zip} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="68000"/>
                        <label htmlFor="zipcode">Zipcode</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && (
                            <p className="text-danger">{formik.errors.address.zip}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <button type="button" className="btn btn-secondary mx-md-2 mb-3 py-2 col-md" onClick={() => onHide()}>Cancel</button>
                    <button type="reset" className="btn btn-secondary mx-md-2 mb-3 py-2 col-md" onClick={formik.handleReset}>Refresh</button>
                </div>
                <button type="submit" className="btn btn-warning py-2 w-100 mt-2 mt-md-1 mb-3 m-auto" disabled={!formik.isValid || !formik.dirty}>Update</button>
            </form>
        </div>
    </>);
}
 
export default EditUser;
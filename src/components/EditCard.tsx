import { useFormik } from "formik";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import Navbar from "./Navbar";
import Card from "../interfaces/Card";
import { getCardById, updateCardById } from "../services/CardService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SiteTheme } from "../App";

interface EditCardProps {

}

const EditCard: FunctionComponent<EditCardProps> = () => {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState<Card>({
           title: "", subtitle: "", description: "", phone: "", email: "", address: {country: "", city: "", street: "", houseNumber: 0}, image: {url: "", alt: ""}
    });

    const { cardId } = useParams();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);

    useEffect(() => {
        getCardById(cardId as string)
            .then((response) => setCurrentCard(response.data))
            .catch((error) => console.log(error))
    }, [])

    const formik = useFormik({
        initialValues: {
            title: currentCard.title || "",
            subtitle: currentCard.subtitle || "",
            description: currentCard.description || "",
            phone: currentCard.phone || "",
            email: currentCard.email || "",
            web: currentCard.web || "",
            image: {url: currentCard.image?.url || "", alt: currentCard.image?.alt || "",},
            address: {state: currentCard.address?.state || "", country: currentCard.address?.country || "", city: currentCard.address?.city || "", street: currentCard.address?.street || "", houseNumber: currentCard.address?.houseNumber || 0, zip: currentCard.address?.zip || 0,},
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string().required("sub-title is a required filed").min(2, "sub-title must be at least 2 charachters"),
            description: yup.string().required().min(2),
            phone: yup.string().required().matches(/^(?:\+972|0)(?:[2-9]|5[0-9])[-\s]?\d{3}[-\s]?\d{4}$/, "phone number must match the Israeli format"),
            email: yup.string().required().email().min(5),
            web: yup.string().required().min(6),
            image: yup.object({
                url: yup.string().min(4, "image URL must be at least 4 charachters").url(),
                alt: yup.string().min(4, "image alternative text must be at least 4 charachters")
            }),
            address: yup.object({
                state: yup.string().min(2),
                country: yup.string().required().min(2),
                city: yup.string().required().min(2),
                street: yup.string().required().min(2),
                houseNumber: yup.number().required("house number is a required field"),
                zip: yup.number()
            })
        }),
        onSubmit: (values) => {
            console.log(values);
            updateCardById(cardId as string, values)
                .then((response) => {
                    console.log(response);
                    navigate(-1);
                    Swal.fire({
                        title: "Success!",
                        text: "Card updated successfully",
                        icon: "success",
                        theme: `${darkMode ? "dark" : "light"}`,
                        timer: 2000,
                        showConfirmButton: false
                    })
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        title: "Oops...",
                        text: "Something went wrong",
                        icon: "error",
                        theme: `${darkMode ? "dark" : "light"}`,
                    })
                });
        }
    })
    return (<>
        <Navbar/>
        <div className="container text-center">
            <h4 className="display-4 mt-4 mb-3">EDIT CARD</h4>
            <form onSubmit={formik.handleSubmit} className="w-100 px-4 m-auto">
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`} id="title" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="John"/>
                        <label htmlFor="title">Title*</label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.subtitle && formik.errors.subtitle ? 'is-invalid' : ''}`} id="subtitle" name="subtitle" value={formik.values.subtitle} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Michael"/>
                        <label htmlFor="subtitle">Subtitle</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-danger">{formik.errors.subtitle}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`} id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Doe"/>
                        <label htmlFor="description">Last Name*</label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
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
                        <input type="text" className={`form-control ${formik.touched.web && formik.errors.web ? 'is-invalid' : ''}`} id="web" name="web" value={formik.values.web} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="www.example.com"/>
                        <label htmlFor="web">Website*</label>
                        {formik.touched.web && formik.errors.web && (
                            <p className="text-danger">{formik.errors.web}</p>
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
                        <input type="text" className="form-control" id="imgAlt" name="image.alt" value={formik.values.image.alt} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="image alt"/>
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
                        <input type="text" className={`form-control ${formik.touched.address?.country && formik.errors.address?.country ? 'is-invalid' : ''}`} id="country" name="country" value={formik.values.address.country} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="USA"/>
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
                        <input type="text" className={`form-control ${formik.touched.address?.houseNumber && formik.errors.address?.houseNumber ? 'is-invalid' : ''}`} id="houseNumber" name="address.houseNumber" value={formik.values.address.houseNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="0"/>
                        <label htmlFor="houseNumber">House Number*</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (
                            <p className="text-danger">{formik.errors.address.houseNumber}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3 col-md">
                        <input type="text" className="form-control" id="zip" name="address.zip" value={formik.values.address.zip} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="68000"/>
                        <label htmlFor="zip">Zipcode</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && (
                            <p className="text-danger">{formik.errors.address.zip}</p>
                        )}
                    </div>
                </div>
                <div className="row g-2">
                    <button className="btn secondaryBtns mx-md-2 mb-3 py-2 col-md" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn secondaryBtns mx-md-2 mb-3 py-2 col-md">Refresh</button>
                </div>
                <button type="submit" className="btn mainBtns py-2 w-100 mb-3 m-auto" disabled={!formik.isValid || !formik.dirty}>Submit</button>
            </form>
        </div>
    </>);
}
 
export default EditCard;
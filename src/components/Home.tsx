import { FunctionComponent, useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "../interfaces/Card";
import { cardFavorite, deleteCardById, getAllCards } from "../services/CardService";
import { getDecodedToken } from "../services/UserService";
import { SearchContext, SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Token from "../interfaces/Token";
import Swal from "sweetalert2";

interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(SiteTheme);

    const { searchText } = useContext(SearchContext);

    const [cards, setCards] = useState<Card[]>([]);
    const [cardId, setCardId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [cardsChanged, setCardsChanged] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        getAllCards()
            .then((response) => setCards(response.data))
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong",
                    icon: "error"
                })
            })
    }, [cardsChanged]);

    const filteredCards = cards.filter((card) => {
    const q = searchText.trim().toLowerCase();
    if (!q) return true;

    const title = (card.title || "").toLowerCase();
    const subtitle = (card.subtitle || "").toLowerCase();
    const description = (card.description || "").toLowerCase();
    const city = (card.address?.city || "").toLowerCase();
    const country = (card.address?.country || "").toLowerCase();

    return (
        title.includes(q) || subtitle.includes(q) || description.includes(q) || city.includes(q) || country.includes(q)
    );
    });

    useEffect(() => {
        const userToken: Token | null = getDecodedToken();
        !userToken ? setIsLoggedIn(false) : setIsLoggedIn(true)
        setIsAdmin(userToken?.isAdmin || false);
        setUserId(userToken?._id || "");
    }, [])

    const refresh = () => setCardsChanged(!cardsChanged);
    const toggleLike = (cardId: string) => {
        if (!isLoggedIn) return;

        cardFavorite(cardId)
            .then(() => refresh())
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong",
                    icon: "error"
                })
            });
    };

    return (<>
    <Navbar/>
    <div className="container text-center pb-4 mb-5">
        <h4 className="display-4 mt-4 mb-3">CARDS PAGE</h4>
        <p className="mb-3 pb-3">Here you can find business cards from all categories</p>
        {!isLoggedIn ? (<div className="mb-3">
            <p>Want to create a liked BizCards list?</p>
            <Link to="/login" className="fw-bolder text-decoration-none">Login</Link> or <Link to="/register" className="fw-bolder text-decoration-none">Register</Link>
        </div>
        ) : null}

        {cards.length ? (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredCards.map((card : Card) => (
                <div className="col">
                    <div className="card h-100 d-flex flex-column" key={card._id}>
                        <div className="d-flex flex-column flex-grow-1" onClick={() => {
                            setCardId(card._id as string);
                            navigate(`/card-details/${card._id}`)
                        }}>
                            <img src={card.image?.url || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="card-img-top pt-3 px-3" alt={card.image?.alt} style={{maxHeight: "10rem", objectFit: "contain"}}/>
                            <div className="card-body flex-grow-1">
                                <h5 className="card-title fw-bolder">{card.title}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{card.subtitle}</h6>
                                <hr />
                                <p className="card-text"><span className="fw-medium">Phone: </span> {card.phone}</p>
                                <p className="card-text"><span className="fw-medium">Address: </span> {card.address?.street} {card.address?.houseNumber}, {card.address?.city}</p>
                                <p className="card-text"><span className="fw-medium">Card Number: </span> {card.bizNumber}</p>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <div className="d-flex flex-row gap-2">
                                {isAdmin && <>
                                    <button className="btn" onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "Once deleted, you will not be able to recover this card!",
                                            showCloseButton: true,
                                            showCancelButton: true,
                                            theme: `${darkMode ? "dark" : "light"}`,
                                            imageUrl: "https://cdn.pixabay.com/photo/2013/03/29/13/38/trash-97586_1280.png",
                                            imageWidth: "auto",
                                            imageHeight: 200,
                                            imageAlt: "Custom image"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteCardById(card._id as string)
                                                .then(() => {
                                                    refresh();
                                                    Swal.fire({
                                                        title: "Deleted!",
                                                        text: "Your card has been deleted.",
                                                        theme: `${darkMode ? "dark" : "light"}`,
                                                        icon: "success",
                                                        timer: 2000,
                                                        showConfirmButton: false
                                                    });
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    Swal.fire({
                                                        title: "Oops...",
                                                        text: "Something went wrong",
                                                        theme: `${darkMode ? "dark" : "light"}`,
                                                        icon: "error"
                                                    });
                                                });
                                            } else {
                                                return;
                                            }
                                        });
                                    }}><i className="fa-solid fa-trash-can"></i></button>
                                    <button className="btn" onClick={() => {
                                        setCardId(card._id as string);
                                        navigate(`/edit-card/${cardId}`);
                                    }}><i className="fa-solid fa-pen"></i></button>
                                </>
                                }
                            </div>    
                            <div className="d-flex flex-row gap-2">
                                <button className="btn" onClick={() => {
                                    Swal.fire({
                                        title: "Call Business",
                                        text: `Calling ${card.phone}...`,
                                        showCloseButton: false,
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        timer: 2000,
                                        theme: `${darkMode ? "dark" : "light"}`})
                                }}><i className="fa-solid fa-phone"></i></button>
                                {isLoggedIn && <button className="btn" onClick={() => toggleLike(card._id as string)}>
                                    <i className="fa-solid fa-heart" style={{ color: (card.likes || []).includes(userId) ? "red" : "inherit" }} ></i>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        ) : (
            <p>There are no available BizCards to display</p>
        )}
    </div>
    <Footer/>
    </>);
}
 
export default Home;
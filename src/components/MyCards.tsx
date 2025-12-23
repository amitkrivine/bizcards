import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cardFavorite, deleteCardById, getAllCards } from "../services/CardService";
import Token from "../interfaces/Token";
import { getDecodedToken } from "../services/UserService";
import Card from "../interfaces/Card";
import Swal from "sweetalert2";
import { SiteTheme } from "../App";

interface MyCardsProps {
    
}
 
const MyCards: FunctionComponent<MyCardsProps> = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(SiteTheme);
    
      const [cards, setCards] = useState<Card[]>([]);
      const [cardId, setCardId] = useState<string>("");
      const [userId, setUserId] = useState<string>("");
      const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
      const [isBusiness, setIsBusiness] = useState<boolean>(false);
      const [cardsChanged, setCardsChanged] = useState<boolean>(false);
    
      // Check user token and set states
      useEffect(() => {
        const userToken: Token | null = getDecodedToken();
        const loggedIn = !!userToken;
    
        setIsLoggedIn(loggedIn);
        setIsBusiness(userToken?.isBusiness || false);
        setUserId(userToken?._id || "");
      }, []);
    
      useEffect(() => {
        if (!isLoggedIn) return;
    
        getAllCards()
          .then((response) => setCards(response.data))
          .catch((error) => console.log(error));
      }, [cardsChanged, isLoggedIn]);
    
      const refresh = () => setCardsChanged(!cardsChanged);

      // Toggle like for a card
      const toggleLike = (cardId: string) => {
        if (!isLoggedIn) return;

        cardFavorite(cardId)
        .then(() => refresh())
        .catch((err) => console.log(err));
    };
    
    // Filter cards to those created by the logged-in user
      const userCards = cards.filter((card) => (card.user_id == userId));

    return (<>
    <Navbar/>
    <div className="container text-center pb-4 mb-5">
        <h4 className="display-4 mt-3 pb-1">MY CARDS</h4>
        <p className="mb-3 pb-3">Here you can view the cards you have created</p>

        {!isLoggedIn ? (
            <p>Please log in to view your business cards.</p>
        ) : !isBusiness ? (
            <p>You need a business account to view your cards.</p>
        ) : userCards.length ? (<>
            <div id="addBtn" className="btn mb-4" onClick={() => {navigate("/new-card")}}>
                <p style={{margin: "auto"}}><i className="fa-solid fa-plus"></i> Add</p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 d-flex justify-content-center mb-3">
            {userCards.map((card: Card) => (
                <div className="col" key={card._id}>
                    <div className="card h-100 d-flex flex-column">
                        <div className="d-flex flex-column flex-grow-1" onClick={() => navigate(`/card-details/${card._id}`)}>
                        <img src={card.image?.url || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="card-img-top pt-3 px-3" alt={card.image?.alt} style={{ maxHeight: "10rem", objectFit: "contain" }}/>
                        <div className="card-body flex-grow-1">
                            <h5 className="card-title fw-bolder">{card.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{card.subtitle}</h6>
                            <hr />
                            <p className="card-text">
                            <span className="fw-medium">Phone: </span> {card.phone}
                            </p>
                            <p className="card-text">
                                <span className="fw-medium">Address: </span> {card.address?.street}{" "}
                                {card.address?.houseNumber}, {card.address?.city}, {card.address?.country}
                            </p>
                            <p className="card-text">
                                <span className="fw-medium">Card Number: </span> {card.bizNumber}
                            </p>
                        </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <div>
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
                                            .catch((err) => {
                                                console.log(err);
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
                                    navigate(`/edit-card/${card._id}`);
                                    }}><i className="fa-solid fa-pen"></i>
                                </button>
                            </div>    
                            <div className="d-flex">
                                {isLoggedIn && <button className="btn" onClick={() => toggleLike(card._id as string)}>
                                    <i className="fa-solid fa-heart" style={{ color: (card.likes || []).includes(userId) ? "red" : "inherit" }} ></i>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            </>
        ) : (
            <>
                <p>You have not created any cards yet.</p>
                <div id="addBtn" className="btn" onClick={() => {navigate("/new-card")}}>
                    <p style={{margin: "auto"}}><i className="fa-solid fa-plus"></i> Add</p>
                </div>
            </>
        )}
    </div>
    <Footer/>
    </>);
}
 
export default MyCards;
import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "../interfaces/Card";
import { cardFavorite, getAllCards } from "../services/CardService";
import { getDecodedToken } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import Token from "../interfaces/Token";

interface LikedCardsProps {}

const LikedCards: FunctionComponent<LikedCardsProps> = () => {
const navigate = useNavigate();

const [cards, setCards] = useState<Card[]>([]);
const [userId, setUserId] = useState<string>("");
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const [cardsChanged, setCardsChanged] = useState<boolean>(false);

useEffect(() => {
const userToken: Token | null = getDecodedToken();
const loggedIn = !!userToken;

setIsLoggedIn(loggedIn);
setUserId(userToken?._id || "");
}, []);

useEffect(() => {
if (!isLoggedIn) return;

getAllCards()
    .then((response) => setCards(response.data))
    .catch((error) => console.log(error));
}, [cardsChanged, isLoggedIn]);

const refresh = () => setCardsChanged(!cardsChanged);

const toggleLike = (cardId: string) => {
if (!isLoggedIn) return;

cardFavorite(cardId)
    .then(() => refresh())
    .catch((err) => console.log(err));
};

const likedCards = cards.filter((card) => (card.likes || []).includes(userId));

    return (
    <>
        <Navbar />
        <div className="container text-center pb-4 mb-5">
            <h4 className="display-4 mt-4 mb-3">FAVORITE CARDS</h4>
            <p className="mb-3 pb-3">Here you can view the business cards you liked</p>

            {!isLoggedIn ? (
            <p>Please log in to view your favorite cards.</p>
            ) : likedCards.length ? (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 d-flex justify-content-center">
                {likedCards.map((card: Card) => (
                <div className="col" key={card._id}>
                    <div className="card h-100 d-flex flex-column">
                    <div className="d-flex flex-column flex-grow-1" onClick={() => navigate(`/card-details/${card._id}`)}>
                        <img src={card.image?.url ||
                            "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                        } className="card-img-top pt-3 px-3" alt={card.image?.alt} style={{ maxHeight: "10rem", objectFit: "contain" }} />
                        <div className="card-body flex-grow-1">
                        <h5 className="card-title fw-bolder">{card.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{card.subtitle}</h6>
                        <hr />
                        <p className="card-text">
                            <span className="fw-medium">Phone: </span> {card.phone}
                        </p>
                        <p className="card-text">
                            <span className="fw-medium">Address: </span> {card.address?.street}{" "}
                            {card.address?.houseNumber}, {card.address?.city}
                        </p>
                        <p className="card-text">
                            <span className="fw-medium">Card Number: </span> {card.bizNumber}
                        </p>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <button className="btn" onClick={() => toggleLike(card._id as string)}>
                        <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            ) : (
            <p>You have no favorite cards yet.</p>
            )}
        </div>
        <Footer />
    </>
    );
};

export default LikedCards;
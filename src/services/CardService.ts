import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/cards";

export function getAllCards() {
    return axios.get(api);
}

export function getCardById(cardId : string) {
    return axios.get(`${api}/${cardId}`);
}

export function updateCardById(cardId: string, updatedCard: Card) {
  return axios.put(`${api}/${cardId}`, updatedCard, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token") || "",
    },
  });
}

export function addCard(newCard : Card) {
    return axios.post(api, newCard, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token") || "",
    },
  });
}

export function cardFavorite(cardId: string) {
  return axios.patch(`${api}/${cardId}`, {}, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token") || "",
    },
  });
}

export function deleteCardById(cardId: string) {
  return axios.delete(`${api}/${cardId}`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token") || "",
    },
  });
}
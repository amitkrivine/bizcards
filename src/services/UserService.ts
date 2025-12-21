import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Token from "../interfaces/Token";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + "/users";

export function getDecodedToken(): Token | null {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    return jwtDecode<Token>(token);
}

export function loginUser(credenitals : {email: string, password: string}){
    return axios.post(`${api}/login`, credenitals);
}

export function getAdminCredentials() {
    const decodedToken = getDecodedToken();
    return decodedToken?.isAdmin ?? false;
}

export function getBusinessCredentials() {
    const decodedToken = getDecodedToken();
    return decodedToken?.isBusiness ?? false;
}

export function getAllUsers() {
    const token = sessionStorage.getItem("token");
    return axios.get(api, {
        headers: {
            "x-auth-token": token || "",
        }
    });
}

export function getUserById(userId: string) {
    const token = sessionStorage.getItem("token");
    return axios.get(`${api}/${userId}`, {
        headers: {
            "x-auth-token": token || "",
        }
    });
}

export function addUser(newUserDetails: User) {
    return axios.post(api, newUserDetails);
}

export function updateUser(userId: string, updatedUser : User) {
    const token = sessionStorage.getItem("token");
    return axios.put(`${api}/${userId}`, updatedUser, {
        headers: {
            "x-auth-token": token || "",
        }
    });
}
export default interface User {
    _id?: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        _id?: string;
    }
    phone: string;
    email: string;
    password: string;
    image: {
        url?: string;
        alt?: string;
        _id?: string;
    }
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip?: string;
    }
    isBusiness?: boolean;
    isAdmin?: boolean;
}
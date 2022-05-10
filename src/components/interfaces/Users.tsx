
export interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string,
    username: string,
    website: string,
    company: {
        bs: string,
        name: string,
        catchPhrase: string,
    }
    address: {
        city: string,
        street: string,
        suite: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        },
    }
    note?: string
}
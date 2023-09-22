interface Llamada {
    llamadaID: number,
    paciente: {
        nombre: string,
        apellido: string
    },
    tiempoDeLlamada: string,
    zona: {
        nombre: string
    },
    ubication: "cama" | "baño" | "otro"
}

interface User {
    email: string
    name: string
}

interface UserData {
    email: string,
    name: string,
    password: string,
}

interface AuthData {
    email: string
    password: string
}

export { type AuthData, type UserData, type Llamada, type User }
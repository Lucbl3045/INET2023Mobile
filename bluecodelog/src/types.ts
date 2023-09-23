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
    code: string
    password: string
}

interface UserData {
    code: string,
    password: string,
}

interface AuthData {
    code: string
    password: string
}

export { type AuthData, type UserData, type Llamada, type User }
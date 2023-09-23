import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, User } from "../types";
import { USERS } from "../data";

const STORAGE_KEY = "bluecodelog_auth";

interface ContextProps {
    children: ReactNode
}

interface AuthContextProps {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    error: string
    authenticate: (value: AuthData) => Promise<void>
    logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

function useAuth() {
    return useContext(AuthContext)
}

function AuthContextProvider({ children }: ContextProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    async function authenticate(value: AuthData) {
        setLoading(true)
        const returnedUser = USERS.find(user => user.code === value.code)
        if (returnedUser?.password === value.password) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
                code: returnedUser.code,
                password: returnedUser.password
            }))
            setIsAuthenticated(true)
            setUser({
                code: value.code,
                password: returnedUser?.password
            })
            setError("")
        }
        else {
            setError("Datos incorrectos")
            setIsAuthenticated(false)
            setUser(null)
        }
        setLoading(false)
        /* try {
             const response = await fetch({
                 body: JSON.stringify(value),
                 url: "",
                 headers: {
                     "Content-Type": "application/json"
                 }
             })

             if(response.data[0] === true){
            setIsAuthenticated(true)
            setUser({
                code = response.data[1]
                password = response.data[2]
            })
             setError("")
             setLoading(false)
        }

        */
    }
//Logs out of the account
    function logout() {
        AsyncStorage.removeItem(STORAGE_KEY)
        setIsAuthenticated(false)
        setUser(null)

    }

    async function getAuthenticated() {
        setLoading(true)
        const storage = await AsyncStorage.getItem(STORAGE_KEY)
        if (storage) {
            const storedUser: User = JSON.parse(storage) as User
            setUser(storedUser)
            setIsAuthenticated(true)
            setLoading(false)
            return
        }

        setUser(null)
        setIsAuthenticated(false)
        setLoading(false)
    }
    async function GetCards() {
       // fetch()
    }
    //?usp=drive_link

    useEffect(() => {
        getAuthenticated()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            error,
            authenticate,
            logout
        }}>{children}</AuthContext.Provider>
    )
}


export { useAuth, AuthContextProvider }


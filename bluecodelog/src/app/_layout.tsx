import { Slot } from "expo-router";
import { AuthContextProvider } from "../context/AuthContext";

export default function Layout() {
    return (
        <AuthContextProvider>
            <Slot />
        </AuthContextProvider>
    )
}
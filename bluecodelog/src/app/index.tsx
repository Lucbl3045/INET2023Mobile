import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { LLAMADAS } from "../data";
import { Card } from "../components/Card";
import { useAuth } from "../context/AuthContext";

import { Redirect } from "expo-router"


export default function CallLogs() {
    const { loading, isAuthenticated, logout,user } = useAuth()

    if(loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        )
    }

    if(!loading && !isAuthenticated) {
        return <Redirect href="/login" />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.info}>
                    <Text style={styles.greeting}>Hello, user</Text>
                    <Text style={styles.title}>Llamadas</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.logout}
                        onPress={logout}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={LLAMADAS}
                    keyExtractor={({ llamadaID }) => llamadaID}
                    renderItem={({ item }) => <Card {...item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#e6f7f2",
        
    },
    list: {
        paddingVertical: 24,
        paddingHorizontal: 32
    },
    header: {
        marginTop:20,
        paddingHorizontal: 32,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#022c5e",
        borderBottomWidth: 3,
        borderBottomColor: "#0f0301"
    },
    info: {},
    actions: {
        paddingTop: 7
    },
    greeting: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#fffdf7"
//        color: "#5a6662"
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fffdf7"
        //color: "#181c1b"
    },
    logout: {
        borderCurve: "circular",
        borderColor:"#0f0301",
        //borderColor: "#1a1918",
        borderRadius: 10,
        borderWidth: 3,
        marginBottom: 3,
        backgroundColor: "#fffdf7",
        fontStyle: "italic",
        fontSize: 14,
        fontWeight: "400",
        padding:10
    },
    logoutText:{
        color: "#0f0301",
        fontSize:16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
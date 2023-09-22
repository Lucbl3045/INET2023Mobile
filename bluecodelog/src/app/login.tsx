import { useState } from "react"
import { Text, StyleSheet, View, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router, Redirect } from "expo-router"
import { TextInput } from "react-native-gesture-handler";

export default function Login() {
	const { authenticate, isAuthenticated, loading, error } = useAuth()

	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	function onSubmit() {
		authenticate({
			email,
			password
		})
	}

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)
	}

	if (!loading && isAuthenticated) {
		return <Redirect href="/" />
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.item}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						autoCapitalize="none"
						autoCorrect={false}
						value={email}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.item}>
					<Text style={styles.label}>Contraseña</Text>
					<TextInput
						style={styles.input}
						autoCapitalize="none"
						autoCorrect={false}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry
					/>
				</View>
				<TouchableOpacity onPress={onSubmit}>
					<Text>Iniciar sesión</Text>
				</TouchableOpacity>

				{!!error && <Text>{error}</Text>}
			</View>
		</SafeAreaView>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center"
	},
	tag: {},
	item: {
		paddingVertical: 12,
	},
	label: {
		fontSize: 14,
	},
	input: {
		fontSize: 14,
	},
	loadingContainer: { 
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})

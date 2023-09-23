import { useState } from "react"
import { Text, StyleSheet, View, ActivityIndicator, SafeAreaView, TouchableOpacity,Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router, Redirect } from "expo-router"
import { TextInput } from "react-native-gesture-handler";
import bluelogo from "../images/blue.png"
export default function Login() {
	const { authenticate, isAuthenticated, loading, error } = useAuth()

	const [code, setID] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	function onSubmit() {
		authenticate({
			code,
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
			<Image
        style={styles.logo}
        source={bluelogo}
      />
				


				<View style={styles.box}>
					<View style={styles.item}>
						<Text style={styles.label}>ID del usuario</Text>
						<TextInput
							style={styles.input}
							autoCapitalize="none"
							autoCorrect={false}
							value={code}
							onChangeText={(text) => setID(text)}
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
					<TouchableOpacity onPress={onSubmit} style={styles.submit}>
						<Text style={styles.submitText}>Iniciar sesión</Text>
					</TouchableOpacity>
				</View>

				{!!error && <Text style={styles.error}>{error}</Text>}
			</View>
		</SafeAreaView>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		

	},
	error:{
		color:"#A30A0A",
		fontSize:16,
		paddingTop:15,
		alignSelf:"center",

	},
	submitText: {
		color: "#fafafa",
		fontSize: 16
	},
	logoTextSubtitle: {
		fontSize: 16,
		fontWeight: "400",
		
	},
	submit: {
		alignSelf: "center",
		backgroundColor: "#022c5e",
		borderWidth:1,
		padding: 15,
		borderRadius: 6
	},
	logo: {
		width: 100,
		height: 110,
		margin: 70,
		alignSelf: "center"
	},
	
	box: {

		paddingVertical: 15,
		
		borderWidth: 2,
		paddingHorizontal: 4
	},
	tag: {
		color: "#0f0301",
		fontSize: 14
	},
	item: {
		paddingVertical: 12,
		color: "#fafafa"
	},
	label: {
		fontSize: 14,
		color: "#0f0301"

	},
	input: {
		fontSize: 20,
		borderWidth: 1,
		borderColor: "#0f0301",
		color: "#0f0301"
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})

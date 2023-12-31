import { View, Text, StyleSheet } from "react-native"
import { Llamada } from "../types"

function Card(props: Llamada) {
    return (
        <View style={style.container}> 
            <View style={style.top}>
            <Text style={style.time}>{props.tiempoDeLlamada}</Text>
            </View>
            <View style={style.bottom}>
                <Text style={style.name}>{props.paciente.apellido}, {props.paciente.nombre}</Text>
                <Text style={style.location}>{props.zona.nombre}, {props.ubication}</Text>
                
            </View>

        </View>
    )
}
const style = StyleSheet.create(
    {
        container:{
            borderCurve: "circular",
            //borderColor: "#1a1918",
            borderColor: "#0f0301",
            borderRadius: 10,
            borderWidth: 3,
            marginBottom:3,
            backgroundColor:"#022c5e"
        },
        top:{
            flex:1,
            justifyContent:"flex-end",
            alignItems:"flex-end",
            paddingRight: 4

        },
        bottom:{
            paddingLeft: 4,
            paddingBottom: 10
        },
        location:{
            color:"#fffdf7",
            fontStyle: "italic",
            fontSize:14,
            fontWeight:"400",
        paddingLeft:5
        },
        name:{
            color:"#fffdf7",
            fontSize:18,
            fontWeight:"800"
        },
        time:{
            color:"#fffdf7",
        }
    })


export { Card }
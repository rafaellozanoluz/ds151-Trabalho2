import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from "react-native";

export default function Login () {
    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.title}>FAÇA O LOGIN</Text>
            </View>

            <View style={styles.box}>

                    <Text style={styles.label}>Nome do usuário</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu username"
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.titleButton}>Entrar</Text>
                    </TouchableOpacity>

            </View>

            <View style={styles.boxImage}>
                <Image style={styles.image} source={require('../../images/LOGO_UFPR.jpg')} />
                <Image style={styles.image} source={require('../../images/LOGO_SEPT.png')} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fafafa',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
        paddingStart: 15,
        paddingEnd: 15,
        marginTop: -24,
        marginStart: 40,
        marginEnd: 40,
        paddingBottom: 40,
        borderRadius: 4,
        justifyContent: 'space-between'
    },

    title:{
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },

    box:{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingStart: 15,
        paddingEnd: 15,
        paddingTop: 35,
        paddingBottom: 35,
    },

    label:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8000',
        alignItems: 'center',
        paddingStart: 15,
        paddingEnd: 15,

    },

    input: {
        height: 40,
        width:180,
        margin: 12,
        borderWidth: 1,
        paddingStart: 15,
        paddingEnd: 15,
        borderRadius: 10,
    },

    button: {
        backgroundColor: '#FF8000',
        width:100,
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        paddingEnd: 10,        
    },

    titleButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    },

    boxImage: {
        alignItems: "center",
        flexDirection: 'row',

    },

    image:{
        width:100,
        resizeMode: "contain", 
    }
})
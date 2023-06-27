import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar, Alert} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;


export default function Login ({navigation}) {
    
    
    async function verifyAvaibleAuthentication(){
        const compatible = await LocalAuthentication.hasHardwareAsync();


        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    function callAdministrador (auth){
        {auth ? navigation.navigate('Administrador') : Alert.alert("Login", "Usuário não logado")}
    }

    async function handleAuthentication(){
        const isFaceEnrolled = await LocalAuthentication.isEnrolledAsync
        if(!isFaceEnrolled){
            return Alert.alert("Login", "Não há nenhuma biometria cadastrada.")
        }

        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login realizado",
            fallbacklabel: "Biometria não reconhecida",
        })

        
        await callAdministrador(auth.success);
    }
    
    return(
        <View style={styles.container}>

            <View>
                <Text style={styles.title}>FAÇA O LOGIN</Text>
            </View>

            <View style={styles.box}>

                    <Text style={styles.label}>Usuário padrão</Text>
                    
                    <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Usuario')}>
                        <Text style={styles.titleButton}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Usuário administrador</Text>
                    
                    
                    <TouchableOpacity style={styles.button} onPress={() => {handleAuthentication();}}>
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
        marginTop: statusBarHeight + 30,
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
        marginTop: 50,

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
        marginTop: 20,        
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
import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header (){
    return(
        <View style={styles.container}>

            <View style={styles.content}>
                <Text style={styles.name}>APP 2 - DS151</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'steelblue',
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    name:{
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold'
    }
})
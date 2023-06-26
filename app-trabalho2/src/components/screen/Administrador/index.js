import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from "../../api";
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;


export default function Home () {

    const [input, setInput] = useState('Rice');
    const [infoReceita, setInfoReceita] = useState([])

    const getReceita = async () => {
        try{
            const {data} = await api.get(`${input}`)
            setInfoReceita(data)
        }catch(error){
            Alert.alert("Não foi possível realizar a consulta", error)
        }
    }

    useEffect(() =>{
        getReceita();
    })

    return(
        <View style={styles.container}>

            <Text style={styles.title}>Receitas</Text>

            <View style={styles.busca}>
            <TextInput  style={styles.input}
                        placeholderTextColor={"#999"}
                        placeholder="Digite um ingrediente em inglês"
                        onChangeText={setInput}
            />

            <TouchableOpacity style={styles.button} onPress={getReceita}>
                <Icon name="search" size={25} color="#FFF"></Icon>
            </TouchableOpacity>

            
            </View>
            <FlatList
                keyboardShouldPersistTaps="handled"
                data={infoReceita}
                keyExtractor={item => item.title}
                renderItem={({item}) => {
                    return(
                        <View style={styles.lista}>
                            <Text style={styles.titleReceita}>{item.title}</Text>
                            <Text style={styles.servings}>{item.servings}</Text>
                            <Text style={styles.descriptions}>{item.ingredients}</Text>
                            <Text styles={styles.descriptions}>{item.instructions}</Text>
                            <TouchableOpacity style={styles.buttonAdd} onPress={getReceita}>
                                <Icon name="add" size={25} color="#FFF"></Icon>
                            </TouchableOpacity>
                        </View>
                    )
                    }}/>

       </View>
        
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: statusBarHeight,
        backgroundColor: '#7159c1',
    },

    title:{
        fontSize: 32,
        color: '#FFF',
        fontWeight: "bold",
        padding: 20,
    },

    busca:{
        flexDirection: "row",
        marginTop: 10,
        padding: 20
    },

    input:{
        flex:1,
        padding:12,
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: '#FFF',
    },

    button:{
        backgroundColor: '#6bd4c1',
        marginLeft: 10,
        justifyContent: 'center',
        borderRadius: 4,
        padding: 14,
    },

    buttonAdd:{
        width: 50,
        height: 50,
        backgroundColor: '#6bd4c1',
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 4,
        padding: 14,
    },

    lista:{
        padding: 20,
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginBottom: 15,
        marginStart: 30,
        marginEnd: 30
    },

    titleReceita:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },

    descriptions:{
        color: '#666',
        marginTop: 5,
        lineHeight: 20
    },

    servings:{
        color: '#666',
        fontWeight: 'bold',
        marginTop: 5,
        lineHeight: 20
    },
})
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from "../../../services/api";
import Receitas from "../../../services/sqlite/Receitas";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Home () {

    const [input, setInput] = useState('');
    const [infoReceita, setInfoReceita] = useState([]);
    const [idExcluir, setIdExcluir] = useState();


    //Faz o GET na API com a descrição que o administrador passou
    const getReceita = async () => {
        try{
            const {data} = await api.get(`${input}`)
            setInfoReceita(data)
        }catch(error){
            Alert.alert("Não foi possível realizar a consulta", error)
        }
    }

    //Salva a receita no sqlite quando clicado no botão de add
    function saveReceita (item) {
    
    Receitas.create({title:item.title, servings:item.servings, ingredients:item.ingredients, instructions:item.instructions})
        .then( id => console.log("Receitas criada com ID: " + id))
        .catch( err => console.log(err))                                                                            
    }

    //Faz um delete no sqlite utilizando o ID como referencia
    const  deleteReceita = (id) => {
        Receitas.remove(id)
            .then( update => console.log('Receita removida:' + update))
            .catch( err => console.log(err))
    }


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Receitas</Text>
                <View style={styles.user}> 
                <Icon name="account-box" size={25} color="#FFF"></Icon>
                <Text style={styles.userName}>Administrador</Text>
                </View>
            </View>
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

            <View style={styles.busca}>
            <TextInput  style={styles.input}
                        placeholderTextColor={"#999"}
                        placeholder="Digite um ID para excluir"
                        onChangeText={setIdExcluir}
            />

            <TouchableOpacity style={styles.button} onPress={() => {deleteReceita(idExcluir);}}>
                <Icon name="remove" size={25} color="#FFF"></Icon>
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
                            <TouchableOpacity style={styles.buttonAdd} onPress={() => {saveReceita(item);}}>
                                <Icon name="add" size={25} color="#FFF"></Icon>
                            </TouchableOpacity>
                        </View>
                    )}}/>
           
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

    header:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'

    },

    user:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        margin: 5,
    },

    userName:{
        margin: 5,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
})
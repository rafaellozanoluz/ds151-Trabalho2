import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Receitas from "../../../services/sqlite/Receitas";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;


export default function Usuario (){

    const [infoReceita, setInfoReceita] = useState([]);
    const [input, setInput] = useState('');
    const [newTitle, setNewTitle] = useState('');
    

    //Pega os dados do banco e joga na const infoReceita
    function dataReceita(){
        Receitas.all()
            .then(
                receitas => setInfoReceita(receitas),
            )
    }

    //Quando usuário clica no botão de alterar pega a const newTitle e altera o ID fornecido no banco
    function alterReceita(){
        Receitas.update(input,newTitle)
            .then(dataReceita(),)
            .catch( err => console.log(err))
    }

    //Faz refresh na tela 
    useEffect(() => {
        dataReceita();
      });



    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Bora cozinhar?</Text>
                <View style={styles.user}> 
                <Icon name="account-box" size={25} color="#FFF"></Icon>
                <Text style={styles.userName}>Usuário comum</Text>
                </View>
            </View>

            <View style={styles.busca}>
            <TextInput  style={styles.input}
                        placeholderTextColor={"#999"}
                        placeholder="Digite o novo título"
                        onChangeText={setNewTitle}
            />
            </View>

            <View style={styles.busca}>
            <TextInput  style={styles.input}
                        placeholderTextColor={"#999"}
                        placeholder="Digite ID para alterar"
                        onChangeText={setInput}
            />

            
            <TouchableOpacity style={styles.button} onPress={() => {alterReceita(input);}}>
                <Icon name="autorenew" size={25} color="#FFF"></Icon>
            </TouchableOpacity>

            
            </View>
            


            <FlatList
                keyboardShouldPersistTaps="handled"
                data={infoReceita}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <View style={styles.lista}>
                            <Text style={styles.titleReceita}>ID:{item.id}</Text>
                            <Text style={styles.titleReceita}>{item.title}</Text>
                            <Text style={styles.servings}>{item.servings}</Text>
                            <Text style={styles.descriptions}>{item.ingredients}</Text>
                            <Text styles={styles.descriptions}>{item.instructions}</Text>                          
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
        fontSize: 25,
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
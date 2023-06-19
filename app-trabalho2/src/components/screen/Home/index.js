import React from "react";
import { View } from "react-native";
import Header from "../../Header";
import Login from "../login";

export default function Home () {
    return(
        <View>
            <Header/>
            <Login/>
       </View>
    )
}
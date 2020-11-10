import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList,StyleSheet, Text, View} from "react-native";
import {Input, Spinner,Card,Button} from "native-base";
import backend from "../api/backend";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeSearchResults = ({route, navigation}) => {
  const { Search } = route.params;

    return(
    <Text style={styles.container}>
      quiere buscar: {Search}
    </Text>
    )};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      flexDirection: "column"
    }
});

export default PokeSearchResults;
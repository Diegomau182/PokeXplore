//Importar las librerias necesarias
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = () => (
    <View style={styles.container}>
    <ImageBackground source={fondo} style={styles.image}>
    </ImageBackground>
    </View>
);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
});

export default PokeListScreen;
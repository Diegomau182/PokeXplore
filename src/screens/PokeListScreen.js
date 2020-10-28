//Importar las librerias necesarias
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = () => (
    <View style={styles.container}>
      <ImageBackground source={fondo} style={styles.image}>
      <View style={styles.marco}>
        <View style={{width: 275, height: 175, backgroundColor:"#e8cc57"}}>
          <View style={styles.dentroMarco}>
            <View style={{width: 260, height: 160, backgroundColor:"#ffffff"}}>

            </View>
          </View>
        </View>
      </View>
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
    marco: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
    },
    dentroMarco:{
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center"
    }
      
});

export default PokeListScreen;
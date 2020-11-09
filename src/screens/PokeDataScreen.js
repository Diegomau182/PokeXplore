//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList,StyleSheet, Text, View} from "react-native";
import {Button} from "native-base";
import backend from "../api/backend";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeDataScreen = () => {
    return(
        <View style={styles.container}>
          <ImageBackground source={fondo} style={styles.image}>
          <View style={styles.titulo}>
              <Text style={{color:"#ffffff", textAlign:"center", fontSize:25}}>Nombre del Pokemon</Text>
            </View>
          <View style={styles.fondo}>
          </View> 
          <Button style={styles.buscar}><Text style={{color:"#000000", textAlign:"center", fontSize:12}}>Moveset</Text></Button> 
          </ImageBackground>
        </View>
        )};
    
    
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
        fondo: {
          flex:1,
          justifyContent:"center",
          marginLeft:0,
          marginTop:15,
          backgroundColor:"#fc0000",
          width:360,
          maxHeight:470,
          minHeight:414
            
        },
        titulo:{
          flex:1,
          marginLeft:10,
          marginTop:-15,
          width: 200, 
          maxHeight:30,
          minHeight:30, 
          justifyContent:"center",
          backgroundColor:"#e8cc57"
        },
        buscar:{
          flex:1,
          width:50,
          marginLeft:60,
          marginTop:43,
          backgroundColor:"#ffffff",
          maxHeight:30,
          minHeight:30,
        },
        cardPokemom:{
          backgroundColor:"#fc0000",
          width:350,
          height:50,
          justifyContent:"center"
          
        }
    });
    
    export default PokeDataScreen;
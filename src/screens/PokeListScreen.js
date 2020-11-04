//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View} from "react-native";
import {Input, Button, Spinner} from "native-base";
import backend from "../api/backend";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = () => {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);
    //const arregloPokemon = undefined;
    const getPokemon = async () => {
      try {

          const rempose = await backend.get(`pokemon?limit=150&offset=0`);
          setPokemon(rempose.data);       
      } catch (error) {
        setError(true);
      }
    }

    useEffect(() => {
      getPokemon();
    });

    if (!pokemon) {
      return (
        <View style={{flex: 1, justifyContent:"center"}}>
          <Spinner color="#e8cc57"/>
        </View>
      )
    }
    return(
    <View style={styles.container}>
      <ImageBackground source={fondo} style={styles.image}>
        <View style={styles.containerDos}>
        <View style={{left:20, top:7, width: 250, height: 30, backgroundColor:"#e8cc57"}}>
          <Text style={{color:"#ffffff", textAlign:"center", fontSize:25}}>POKEXPLORER</Text>
        </View>
          <View style={{width:200,right:240,top:290,height:30}}>
          <Input placeholder="Search" backgroundColor="#ffffff"></Input>     
          </View> 
            <Button style={{justifyContent:"center",width:100,height:30, right:225, top:290, backgroundColor:"#fc0000" }}>
              <Text style={{color:"#ffffff"}}>Search</Text>
            </Button>
            <Button style={{justifyContent:"center",width:200,height:30, right:185, top:290, backgroundColor:"#fc0000" }}>
              <Text style={{color:"#ffffff"}}>More Info</Text>
            </Button>
          <View style={styles.marcoPequeños}>
            <View style={{left:-750 ,top:-21 ,width: 650, height: 236, backgroundColor:"#fc0000"}}>
              
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
    )};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    containerDos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    },
    marcoPequeños:{
      flex: 1,
      flexDirection: "column",
      alignContent: 'flex-end',
      justifyContent:'center'
    },

    dentroMarcoPequeños: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
      
});

export default PokeListScreen;
//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList,StyleSheet, Text, View,Card,Image} from "react-native";
import {Input, Button, Spinner, Item, CardItem} from "native-base";
import backend from "../api/backend";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = () => {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);

    const getPokemon = async () => {
      try 
      {
         const rempose = await backend.get(`pokemon?limit=150`);
        setPokemon(rempose.data);
      } catch (error) {
        setError(true);
      }
    }
    useEffect(() => {
      // Efecto secundario realizar la petición a la API
      getPokemon();
    }, []);
    if (!pokemon) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <Spinner color="#e8cc57" />
        </View>
      )
    }

    return(
    <View style={styles.container}>
      <ImageBackground source={fondo} style={styles.image}>
      <View style={styles.titulo}>
          <Text style={{color:"#ffffff", textAlign:"center", fontSize:25}}>POKEXPLORER</Text>
        </View>
      <View style={styles.fondo}>
      <FlatList
      data={pokemon.results}
      keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text>¡No se han encontrado ningun pokemon!</Text>}
        renderItem={({ item }) => {
          return (
                  <Text>{item.name}</Text>
          )
        }}
      /> 
      </View>  
        <Input placeholder="Search" style={styles.buscar}></Input>      
            <Button style={styles.botonBuscar}>
              <Text style={{color:"#ffffff"}}>Search</Text>
            </Button>
            <Button style={styles.botonInformacion}>
              <Text style={{color:"#ffffff"}}>More info.</Text>
            </Button>
            
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
      marginTop:20,
      backgroundColor:"#fc0000",
      width:360,
      maxHeight:390,
      minHeight:414
        
    },
    titulo:{
      flex:1,
      marginLeft:10,
      marginTop:-26,
      width: 200, 
      maxHeight:30,
      minHeight:30, 
      justifyContent:"center",
      backgroundColor:"#e8cc57"
    },
    botonBuscar:{
      flex:1,
      marginLeft:260,
      marginTop:-33,
      width:70,
      maxHeight:30,
      minHeight:30,
      justifyContent:"center",
      backgroundColor:"#fc0000"

    },
    botonInformacion:{
      flex:1,
      marginLeft:120,
      marginTop:33,
      width:160,
      maxHeight:30,
      minHeight:30,
      justifyContent:"center",
      backgroundColor:"#fc0000"
    },
    buscar:{
      flex:1,
      width:240,
      marginLeft:5,
      marginTop:32,
      backgroundColor:"#ffffff",
      maxHeight:30,
      minHeight:30,
    }
    
});

export default PokeListScreen;
import React, { useEffect, useState } from "react";
import {FlatList,StyleSheet,Image,Text, View,Dimensions} from "react-native";
import {Spinner,Card,CardItem,Container} from "native-base";
import backend from "../api/backend";
const { width, height } = Dimensions.get("window");
//variable que contiene la pantalla(renderizar)
const PokeDataScreen = ({route, navigation}) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const { Search } = route.params;
  const getPokemon = async () => {
    try 
    {
       const rempose = await backend.get(`pokemon?limit=807`);
      setPokemon(rempose.data.results);
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
       <View style={styles.encabezado}>
         <Text style={styles.Titulo}>Pokemon Name</Text>
       </View>
       <View style={styles.cuerpo}>
         <View style={styles.marcoPokemon}>

         </View>
        <View style={styles.marcotipo}>

         </View>
       </View>
    </View>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
  },
  encabezado:{
    flex:1,
    backgroundColor:"#000000",
    justifyContent:"center",
  },
  cuerpo:{
    flex:5,
    backgroundColor:"#fc0000",
    justifyContent:"center",
    
  },
    Titulo:{
      color: "#e8cc57",
      marginTop: 20,
      marginLeft:10,
      fontSize:45,
    },
    cardPokemom:{
      backgroundColor:"#fc0000",
      height:50,
      marginRight:30,
      marginLeft:30,
      justifyContent:"center"
    },

    //diseña el marco para la imagen de los pokemon
    marcoPokemon:{
      backgroundColor: "#e8cc57",
      height:210,
      marginTop:-370,
      marginRight:190,
      marginLeft:20,
    },
    
    //diseña el marco para los tipos
    marcotipo:{
      backgroundColor: "#ffffff",
      height:110,
      marginTop:-160,
      marginLeft:240,
      marginRight:10,
    }
});

export default PokeDataScreen;
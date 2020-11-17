import React, { useEffect, useState } from "react";
import {FlatList,StyleSheet,Text,Image,View,Dimensions,} from "react-native";
import {Spinner,Card,CardItem,Container} from "native-base";
import backend from "../api/backend";
//para llamar a la imagen del pokemon
import getEnvVars from "../../enviroment";
const {imgPokemon} = getEnvVars();
//fin para llamar a la imange del pokemon
const { width, height } = Dimensions.get("window");
//variable que contiene la pantalla(renderizar)
const PokeDataScreen = ({route, navigation}) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const { name } = route.params;
  const getPokemon = async () => {
    try 
    {
       const rempose = await backend.get(`pokemon/${name}`);
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

  console.log(pokemon)

  return(
    <View style={styles.container}>
       <View style={styles.encabezado}>
  <Text style={styles.Titulo}>{pokemon.name}</Text>
       </View>
       <View style={styles.cuerpo}>
         <View style={styles.marcoPokemon}>
           <View>
              <Image source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}}
              style={styles.pokeImagen}>
              </Image>
          </View>
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
    flexDirection: "row",
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
      flex: 1,
      backgroundColor: "#e8cc57",
      height: 160,
      marginLeft: 20,
      marginTop: 23,
      marginRight: -20,
    },
    
    //diseña el marco para los tispos
    marcotipo:{
      backgroundColor: "#ffffff",
      height: 10,
      marginLeft: 220,
      marginRight: 15,
    },
    //Imagen del pokemon
    pokeImagen: {
      width: width * 0.33,
      height: height * 0.33,
      marginTop: -40,
      marginLeft: 10,
    },

    marcoImgPokemon: {
      flex:1,
      backgroundColor: "#ffffff",
      height:80,

    }
});

export default PokeDataScreen;
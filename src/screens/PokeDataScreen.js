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

  
  //recorrer el arreglo del los tipos
  const type = pokemon.types ;
  const firstType = type[0];
  const secondType = type[1];
  const nameTypeFirst = firstType['type']['name'];
  var nameTypeSecond = "";
  if(secondType){
    nameTypeSecond = secondType['type']['name'];
  }
  else{
    nameTypeSecond = "";
  }
  console.log(typeof(nameTypeSecond))
  return(
    <View style={styles.container}>
       <View style={styles.encabezado}>
  <Text style={styles.Titulo}>{pokemon.name}</Text>
       </View>
       <View style={styles.cuerpo}>
         <View style={styles.marcoPokemon}>
              <Image source={{uri:`${imgPokemon}${pokemon.id}.png`}}
              style={styles.pokeImagen}>
              </Image>
         </View>
         <View style={styles.marcotipo}>
           <Image></Image>
         </View>
       </View>
       <View style={styles.Pie}>
       <Text style={styles.moveset}>Moveset</Text>
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

  Pie:{
    flex:2,
    backgroundColor:"#fc0000",
    justifyContent:"center",
    flexDirection: "row",
  },

  cuerpo:{
    flex:3,
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

    moveset:{
      color: "#e8cc57",
      marginTop: -170,
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
      height: 155,
      marginLeft: 25,
      marginTop: 30,
      marginRight: 35,
      alignContent: "center",
      justifyContent: "center",
    },
    
    //diseña el marco para los tipos
    marcotipo:{
      flex:1,
      backgroundColor: "#ffffff",
      height: 120,
      marginLeft: 25,
      marginTop: 50,
      marginRight: 35,
    },
    //Imagen del pokemon
    pokeImagen: {
      flex: 1,
      resizeMode: "stretch",
    },

    marcoImgPokemon: {
      flex:1,
      backgroundColor: "#ffffff",
      height:80,
    }
});

export default PokeDataScreen;
import React, { useEffect, useState} from "react";
import {FlatList,StyleSheet,Image,Text, View,Dimensions} from "react-native";
import {Spinner,Card} from "native-base";
import backend from "../api/backend";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
//variable que contiene la pantalla(renderizar)
const PokeSearchResults = ({route, navigation}) => {
  const [fonts, setfonts] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const { Search } = route.params;
  //metodo para ir a traer todos los pokemos
  const getPokemon = async () => {
    try 
    {
       const rempose = await backend.get(`pokemon?limit=807`);
      setPokemon(rempose.data.results);
    } catch (error) {
      setError(true);
    }
  }
  //metodo para ir a traer a todas las fuentes necesarias
  const loadFonts = async() => {
     Font.loadAsync({
      'Pokemon-Hollow': require(`../../assets/fonts/Pokemon-Hollow.ttf`,),
      'Pokemon-Solid': require(`../../assets/fonts/Pokemon-Solid.ttf`),
    });
    setfonts(true);
  }
 
  useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getPokemon();
    loadFonts();
  }, []);
  if (!pokemon) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="#e8cc57" />
      </View>
    )
  }
 //renderizado de la pantalla
  return(
    <View style={styles.container}>
       <View style={styles.encabezado}>
         <Text style={styles.Titulo}>PokeXplorer</Text>
       </View>
       <View style={styles.cuerpo}>
       <FlatList
          data={pokemon.filter(function(el) {
            return el.name.toLowerCase().indexOf(Search.toLowerCase()) > -1})}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<View style={{marginTop:150}}><Image
            source={require("../../assets/pikachu_what.png")}
            style={styles.pokemonNotFound}
          />
          <Text style={styles.texto}>pokemon not found!</Text></View>}
          renderItem={({ item }) => {
            return (
              <View> 
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Data Pokemon", { name: item.name })
                    }
                  >
                    <Card style={styles.cardPokemom}>
                      <Text style={styles.texto}>{item.name}</Text>
                    </Card>
                  </TouchableOpacity>
              </View>
            )
          }}
        /> 

       </View>
    </View>
  )};
//estilo de de componentes de la pantalla
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
  texto:{
    color:"#ffffff", 
    textAlign:"center", 
    fontSize:23
  },
  cuerpo:{
    flex:5,
    backgroundColor:"#fc0000",
    justifyContent:"center",
    
  },
    pokemonNotFound: {
      marginLeft:70,
      width:width * 0.50,
      height: height * 0.20,
      resizeMode: "contain", 
    },
    Titulo:{
      fontFamily:'Pokemon-Solid',
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
    }
});

export default PokeSearchResults;
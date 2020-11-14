import React, { useEffect, useState } from "react";
import {FlatList,StyleSheet,Image,Text, View,Dimensions} from "react-native";
import {Spinner,Card,CardItem,Container} from "native-base";
import backend from "../api/backend";
const { width, height } = Dimensions.get("window");
//variable que contiene la pantalla(renderizar)
const PokeSearchResults = ({route, navigation}) => {
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
  /*pokemon.filter(function(el) {
    return el.name.toLowerCase().indexOf(Search.toLowerCase()) > -1;
});*/


  return(
    <Container>
     <Card>
      <CardItem header style={{backgroundColor:"#000000"}}>
        <View style={styles.titulo}>
          <Text style={{color:"#ffffff", textAlign:"center", fontSize:25}}>POKÉXPLORER</Text>
        </View>
    </CardItem>
    <CardItem style={{backgroundColor:"#fc0000"}}>
      <View style={styles.fondo}>
        <FlatList
          data={pokemon.filter(function(el) {
            return el.name.toLowerCase().indexOf(Search.toLowerCase()) > -1})}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<View><Image
            source={require("../../assets/pikachu_what.png")}
            style={styles.pokemonNotFound}
          />
          <Text>¡pokemon not found!</Text></View>}
          renderItem={({ item }) => {
            return (
              <View> 
                <Card style={styles.cardPokemom}>
                  <Text style={{color:"#ffffff", textAlign:"center", fontSize:23}}>{item.name}</Text>
                </Card>
              </View>
            )
          }}
        /> 
     </View>
    </CardItem>
    </Card>
  </Container>
  )};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      flexDirection: "column"
    },

    pokemonNotFound: {
      width:width,
      height: height * 0.15,
      resizeMode: "contain", 
    },
    
    fondo: {
      height: height * 422,
      justifyContent:"center",
      backgroundColor:"#fc0000", 
    },
    titulo:{
      width:200,
      justifyContent:"center",
      backgroundColor:"#e8cc57"
    },
    cardPokemom:{
      backgroundColor:"#fc0000",
      width:310,
      height:50,
      justifyContent:"center"
      
    }
});

export default PokeSearchResults;
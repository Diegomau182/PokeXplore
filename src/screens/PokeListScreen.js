//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList,StyleSheet, Text, View,Dimensions} from "react-native";
import {Input, Spinner,Card,Button, CardItem, Container} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import backend from "../api/backend";
const fondo = {uri: "https://media.discordapp.net/attachments/684522611488849983/770751505724080138/fondo.png"}
//variable que contiene la pantalla(renderizar)
const PokeListScreen = ({navigation}) => {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);
    const [Search, setSearch] = useState("");

    const getPokemon = async () => {
      try 
      {
         const rempose = await backend.get(`pokemon?limit=807`);
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
            data={pokemon.results}
            keyExtractor={(item) => item.name}
            ListEmptyComponent={<Text>¡No se han encontrado ningun pokemon!</Text>}
            renderItem={({ item }) => {
              return (
                <View> 
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Data Pokemon", { name: item.name })
                    }
                  >
                    <Card style={styles.cardPokemom}>
                      <Text style={{color:"#ffffff", textAlign:"center", fontSize:23}}>{item.name}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            }}
          /> 
       </View>
      </CardItem>
      <CardItem footer style={{backgroundColor:"#000000", height:90}}>
        <Input placeholder="Search" style={styles.buscar} value={Search} onChangeText={setSearch}></Input>      
        <Button style={styles.botonBuscar} onPress={() => {navigation.navigate("Resultado Busqueda", {Search})}}>
              <Text style={{color:"#ffffff", textAlign:"center"}}>Search</Text>
            </Button>
      </CardItem>
      </Card>
    </Container>
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
      height:445,
      justifyContent:"center",
      backgroundColor:"#fc0000", 
    },
    titulo:{
      width:200,
      justifyContent:"center",
      backgroundColor:"#e8cc57"
    },
    botonBuscar:{
      backgroundColor:"#fc0000",
      justifyContent:"center",
      marginLeft:20,
      marginTop:12,
      width:80,
      height:42,
    },

    buscar:{
      backgroundColor:"#ffffff",
      width:200,
      height:39
    },
    cardPokemom:{
      backgroundColor:"#fc0000",
      width:310,
      height:50,
      justifyContent:"center"
      
    }
});

export default PokeListScreen;
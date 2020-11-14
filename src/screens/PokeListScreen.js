//Importar las librerias necesarias
//import { Col } from "native-base";
import React, { useEffect, useState } from "react";
import {FlatList,StyleSheet, Text, View,Dimensions} from "react-native";
import {Input, Spinner,Card,Button, CardItem, Container} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import backend from "../api/backend";
const { width, height } = Dimensions.get("window");
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
     <View style={styles.container}>
       <View style={styles.encabezado}>
         <Text style={styles.Titulo}>PokeXplorer</Text>
       </View>
       <View style={styles.cuerpo}>
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
       <View style={styles.pie}>
       <Input placeholder="Search" style={styles.Buqueda} value={Search} onChangeText={setSearch}/>
       <Button style={styles.Boton} onPress={() => {navigation.navigate("Resultado Busqueda", {Search})}}>
              <Text style={{color:"#ffffff", textAlign:"center"}}>Search</Text>
            </Button>
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
      flex:4,
      backgroundColor:"#fc0000",
      justifyContent:"center",
    },
    pie:{
      flex:1,
      flexDirection:"row",
      justifyContent:"center",
      backgroundColor:"#000000"
    },
    Titulo:{
      color: "#e8cc57",
      marginTop: 20,
      marginLeft:10,
      fontSize:45,
    },
    Buqueda:{
      backgroundColor:"#ffffff",
      marginTop:30,
      marginStart:12,
      marginLeft:10,
      marginRight:10,
      height:50,
    },
    Boton:{
      backgroundColor:"#fc0000",
      marginTop:30,
      height:50,
      width:70,
      marginRight:30,
      justifyContent:"center",
      },
      cardPokemom:{
        backgroundColor:"#fc0000",
        height:50,
        marginRight:30,
        marginLeft:30,
        justifyContent:"center"
      }
    
});

export default PokeListScreen;
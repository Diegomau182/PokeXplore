import axios from 'axios';
import getEnvVars from '../../enviroment';

const { apiurl } = getEnvVars();
//Crear una instacia de conexion
const instance = axios.create({
   baseURL: apiurl
 });

 export default instance;


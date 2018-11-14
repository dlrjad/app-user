import axios from 'axios'
import {store} from '../store/store.js'

export default class RestResource {

  getConfig() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": store.state.token
      }
    }
    return axiosConfig
  }

  getHeaderslogin() {
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }
    return axiosConfig;
  }
  
  getUsers() {
    
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + '/users', this.getConfig()).then(
        response => {
          let myData = response.data.map(e => {
            return {
              "user_id": e.user_id,
              "name": e.name,
              "password": e.password,
              "mail": e.mail,
              "roles": e.roles
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudieron obtener los usuarios');
        },
        () => {
          console.info("Peticion completa");
        })
    })
  }

  getUser(id) {
    return axios.get(process.env.ROOT_API + '/user/' + id,  this.getConfig())
  }

  getUserByMailPassword(mail, password) {  
    let data = {
      mail: mail,
      password: password,
    }
    //console.log(data)

    return axios.post("http://localhost:8090/login", data, this.getHeaderslogin())
  }

  deleteUser(id) {
    return axios.delete(process.env.ROOT_API + '/user/' + id, this.getConfig());
  }

  addUser(name, password, mail) {
    return axios.post(process.env.ROOT_API + '/user/', {
      name: name,
      password: password,
      mail: mail
    },
    this.getConfig());
  }

  updateUser(id, name, password, mail, roles) {
    return axios.put(process.env.ROOT_API + '/user/' + id, {
      name: name,
      password: password,
      mail: mail,
      roles: roles
    },
    this.getConfig())
  }

}
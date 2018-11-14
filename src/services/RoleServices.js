import axios from 'axios'
import {store} from '../store/store.js'
export default class RestResource {

  getConfig() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": store.state.token
      }
    }
    return axiosConfig
  }

  /*getRoles() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + '/roles', this.getConfig()).then(
        response => {
          let myData = response.data.map(e => {
            console.log(e)
            return {
              "role_id": e.role_id,
              "name": e.name,
              "privileges": e.privileges
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudieron obtener los roles');
        },
        () => {
          console.info("Peticion completa");
        })
    })
  }*/
  getRoles(){
    return axios.get(process.env.ROOT_API + '/roles', this.getConfig());
  }
  getRole(id) {
    return axios.get(process.env.ROOT_API + '/role/' + id, this.getConfig())
  }

  deleteRole(id) {
    return axios.delete(process.env.ROOT_API + '/role/' + id, this.getConfig());
  }

  addRole(name) {
    return axios.post(process.env.ROOT_API + '/role/', {
      name: name
    },
    this.getConfig());
  }

  updateRole(id, name, privileges) {
    return axios.put(process.env.ROOT_API + '/role/' + id, {
      name: name,
      privileges: privileges
    },
    this.getConfig());
  }

}
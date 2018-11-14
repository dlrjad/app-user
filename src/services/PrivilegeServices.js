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

  getPrivileges() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + '/privileges', this.getConfig()).then(
        response => {
          let myData = response.data.map(e => {
            return {
              "privilege_id": e.privilege_id,
              "name": e.name
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudieron obtener los privilegios');
        },
        () => {
          console.info("Peticion completa");
        })
    })
  }

  getPrivilege(id) {
    return axios.get(process.env.ROOT_API + '/privilege/' + id, this.getConfig())
  }

  deletePrivilege(id) {
    return axios.delete(process.env.ROOT_API + '/privilege/' + id, this.getConfig());
  }

  addPrivilege(name) {
    return axios.post(process.env.ROOT_API + '/privilege/', {
      name: name
    },
    this.getConfig());
  }

  updatePrivilege(id, name) {
    return axios.put(process.env.ROOT_API + '/privilege/' + id, {
      name: name
    },
    this.getConfig());
  }

}
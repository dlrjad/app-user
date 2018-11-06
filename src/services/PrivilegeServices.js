import axios from 'axios'
export default class RestResource {
  getPrivileges() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + '/privileges').then(
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
    return axios.get(process.env.ROOT_API + '/privilege/' + id + '')
  }

  deletePrivilege(id) {
    return axios.delete(process.env.ROOT_API + '/privilege/' + id + '');
  }

  addPrivilege(name) {
    return axios.post(process.env.ROOT_API + '/privilege/', {
      name: name
    });
  }

  updatePrivilege(id, name) {
    return axios.put(process.env.ROOT_API + '/privilege/' + id + '', {
      name: name
    });
  }

}
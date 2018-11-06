import axios from 'axios'
export default class RestResource {
  /*getRoles() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8090/api/roles').then(
        response => {
          let myData = response.data.map(e => {
            return {
              "role_id": e.role_id,
              "name": e.name
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
    return axios.get(process.env.ROOT_API + '/roles');
  }
  getRole(id) {
    return axios.get(process.env.ROOT_API + '/role/' + id + '')
  }

  deleteRole(id) {
    return axios.delete(process.env.ROOT_API + '/role/' + id + '');
  }

  addRole(name) {
    return axios.post(process.env.ROOT_API + '/role/', {
      name: name
    });
  }

  updateRole(id, name, privileges) {
    return axios.put(process.env.ROOT_API + '/role/' + id + '', {
      name: name,
      privileges: privileges
    });
  }

}
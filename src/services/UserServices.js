import axios from 'axios'
export default class RestResource {
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.ROOT_API + '/users').then(
        response => {
          let myData = response.data.map(e => {
            return {
              "user_id": e.user_id,
              "name": e.name,
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
    return axios.get(process.env.ROOT_API + '/user/' + id + '')
  }

  deleteUser(id) {
    return axios.delete(process.env.ROOT_API + '/user/' + id + '');
  }

  addUser(name, mail) {
    return axios.post(process.env.ROOT_API + '/user/', {
      name: name,
      mail: mail
    });
  }

  updateUser(id, name, mail, roles) {
    return axios.put(process.env.ROOT_API + '/user/' + id + '', {
      name: name,
      mail: mail,
      roles: roles
    })
  }

}
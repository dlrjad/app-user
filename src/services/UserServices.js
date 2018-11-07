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
    return axios.get(process.env.ROOT_API + '/user/' + id + '')
  }

  getUserByNamePassword(name, password) {
    return axios.get(process.env.ROOT_API + '/user/' + name + '/' + password + '')
  }

  deleteUser(id) {
    return axios.delete(process.env.ROOT_API + '/user/' + id + '');
  }

  addUser(name, password, mail) {
    return axios.post(process.env.ROOT_API + '/user/', {
      name: name,
      password: password,
      mail: mail
    });
  }

  updateUser(id, name, password, mail, roles) {
    return axios.put(process.env.ROOT_API + '/user/' + id + '', {
      name: name,
      password: password,
      mail: mail,
      roles: roles
    })
  }

}
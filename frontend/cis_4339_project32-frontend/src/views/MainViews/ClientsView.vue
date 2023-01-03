<template>
  <div>
    <h1 class="mb-3 mt-3">Clients</h1>
    <div class="row justify-content-center">
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Phone</th>
            <th>Language</th>
            <th>Email</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
        <tr v-for="client in clients" :key="client.client_id">
            <td>{{ client.client_id }}</td>
            <td>{{ client.first_name }}</td>
            <td>{{ client.last_name }}</td>
            <td>{{ client.birthday.split("T")[0] }}</td>
            <td>{{ client.phone_number }}</td>
            <td>{{ client.language}}</td>
            <td>{{ client.email}}</td>
            <td class="d-flex justify-content-start">
              <router-link :to="{name: 'edit client', params: { client_id: client.client_id }}" class="btn btn-success ">Edit</router-link>
              <button @click.prevent="deleteClient(client.client_id)" class="btn btn-danger mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        clients: []
      }
    },
    created() {
      // Get all the clients from database
      axios.get('http://localhost:3001/api/clients')
      .then(res => {
        this.clients = res.data
      }).catch(err => {
        alert("Data could not be fetched")
      })
    },
    methods: {
      // Handles deleting of clients
      deleteClient(client_id){
        if (window.confirm("Do you really want to delete this client?")) {
          axios.delete(`http://localhost:3001/api/clients/${client_id}`).then(() => {
            this.clients.splice(this.clients.findIndex(i => i.client_id === client_id), 1);
          }).catch(error => {
            alert("Client could not be deleted")
          });
        }
      }
    }
  }

  
</script>

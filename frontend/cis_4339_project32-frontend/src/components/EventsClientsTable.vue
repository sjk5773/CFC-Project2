<template>
  <div>
    <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.client_id">
            <td>{{ client.client_id }}</td>
            <td>{{ client.first_name + " " + client.last_name }}</td>
            <td>
              <div class="d-flex align-items-stretch">
                <router-link :to="{name: 'create activity', params: { client_id: client.client_id, event_id: event_id }}" class="btn btn-success">Add Activity</router-link>
                <button @click.prevent="deleteClient(client.client_id)" class="btn btn-danger mx-2">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <form @submit.prevent="addClientToEvent(selected_client)">
        <div class="form-group">
            <label for="event_org">Add a client: </label>
            <select v-model="selected_client">
              <option v-for="client in all_clients" :key="client.client_id" :value="client.client_id">{{client.first_name + " " + client.last_name }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Add</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        clients: Array,
        event_id: String
    },
    data(){
      // Create a empty array of clients to pick from
      return {
        all_clients: [],
        selected_client: null
      }
    },
    mounted(){
      // Populate the list of all clients
      let apiURL = 'http://localhost:3001/api/clients';
        axios.get(apiURL).then(res => {
          // Only add clients that are not attending the event
          // We do not want to add clients twice
            this.clients.forEach(org_client =>{
              res.data = res.data.filter(item => item.client_id != org_client.client_id)
            })
            this.all_clients = res.data
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
      deleteClient(id){
        let indexOfArrayItem = this.clients.findIndex(i => i.client_id === id);

        // Delete the client
        if(window.confirm("Are you sure you want to delete this client?")){
          axios.delete(`http://localhost:3001/api/events/${this.event_id}/client/${id}`)
          .then(res => {
            this.clients.splice(indexOfArrayItem, 1);
            alert("Client has been deleted from the event")
            location.reload()
          }).catch(err => {
            alert("Client not deleted from event")
          })
        }
      },
      addClientToEvent(id){
        // Add the client to the event
        axios.patch(`http://localhost:3001/api/events/${this.event_id}/client/${id}`)
        .then(res => {
          alert('Client has been added to event')
          location.reload()
        }).catch(err => {
          alert("Client not added to event")

        })
      }
    }
}
</script>

<template>
<!-- start the template that will contain the page content -->
  <div class="row justify-content-center">
   <h1 class="mb-3 mt-3">Events</h1>
      <table class="table table-striped">
      <thead class="table-dark">
        <tr>
        <th>Event ID</th>
          <th>Event Name</th>
           <th>Event Date</th>
          <th>Event Address</th>
          <th>Event Description</th>
          <th>Event Type</th>
          <th>Clients Attending</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>   
        <tr v-for="event in Events" :key="event._id">
            <td>{{  event.event_ID }}</td>
          <td>{{ event.event_name }}</td>
          <td>{{  new Date(event.date).toDateString()}}</td>
          <td>{{  event.address.Address + "\n" + event.address.City + ", " + event.address.State + ", " + event.address.zip}}</td>
          <td>{{  event.event_description}}</td>
          <td>{{  event.program_type}}</td>
          <td>{{ event.clients.length }}</td>
          <td>
              <div class="d-flex justify-content-start">
                <router-link :to="{name: 'edit events', params: { event_id: event.event_ID }}" class="btn btn-success ">Edit</router-link>
                <button @click.prevent="deleteEvent(event.event_ID)" class="btn btn-danger mx-2">Delete</button>
              </div>
          </td>
        </tr>
      </tbody>
    </table>    
 </div>
</template>
<script>
    import axios from "axios";
// import the axios module so that we can use the axios methods
    export default {
        data() {  // data to be stored
            return {
                Events: []  //stores the events data into an array 
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3001/api/events';
            axios.get(apiURL).then(res => {
                this.Events = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {  
            deleteEvent(id){   // when delete form button is clicked, this function gets called which deletes the data using the endpoint below.
                let apiURL = `http://localhost:3001/api/events/${id}`;
                let indexOfArrayItem = this.Events.findIndex(i => i._id === id);

                if (window.confirm("Are you sure you want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Events.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>

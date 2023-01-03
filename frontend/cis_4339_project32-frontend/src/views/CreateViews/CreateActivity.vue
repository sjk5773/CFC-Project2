<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <!-- Form to add activity for a client at an event -->
    <form class="mb-5" v-if="validEventAndClient" @submit.prevent="AddActivity">
          <h3 class="text-center fw-bold">Create event activity for client</h3>
        <h5>Add Activity for {{ client.first_name + " " + client.last_name }} at event '{{ event.event_name }}'</h5>
          <div class="form-group">
              <label>Time Spent in Hours</label>
              <input type="number" step=".01" v-model="activity.time_spent" required>
          </div>
          <div class="form-group">
              <label>Notes</label>
              <input type="text" v-model="activity.short_notes" required>
          </div>
          
      <button type="submit" class="btn-md mt-3">Submit</button>   
    </form>
    <h1 class="text-center fw-bold" v-else>Invalid client or event </h1>
   </div>
  </div>
</template>

<script>
// import axios to use api methods
import axios from "axios"  


export default ({
  data(){
    return {   // create the model for the activity schema that will be submitted to the api endpoint
      activity: {
        short_notes: null,
        time_spent: null
      },
      client: {},
      event: {},
      validEventAndClient: false
    }
  },
  beforeMount(){
    // Get the client from database to ensure client exists 
    axios.get(`http://localhost:3001/api/clients/${this.$route.params.client_id}`)
    .then(res => {
      if(res.data != null){
        this.client = res.data;
        // get the event from database to ensure the event exists
         axios.get(`http://localhost:3001/api/events/${this.$route.params.event_id}`)
         .then(event_response => {
           if(res.data != null){
             // Set the data for events
             this.event = event_response.data
             this.validEventAndClient = true
           }
         })
      }
    }).catch((err) => {
      alert("Server Error: Failed to fetch")
    })
  },
  methods: {
    AddActivity(){
      this.activity.client_id = this.client.client_id
      this.activity.event_id = this.event.event_ID

      // Make a call to database to create or update activity
      axios.patch("http://localhost:3001/api/activity", this.activity)
      .then(res => {
        alert("Activity has been updated for this client")
      }).catch(err => {
        alert("Server Error")
      })
    }
  }
})
</script>

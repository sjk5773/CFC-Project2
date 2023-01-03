<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <h2 class="mb-3 mt-3">Create an Event</h2>
    <form @submit.prevent="handleSubmitForm" class="mb-5">
        <h5>Event Information</h5>
        <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" v-model="event.event_name" required>
                </div>
                <!-- EVENT ADDRESS INFORMATION -->
                <div class="form-group">
                    <label>Event Address</label>
                    <input type="text" class="form-control" v-model="event.address.Address" required>
                </div>
                <div class="form-group">
                    <label>Event City</label>
                    <input type="text" class="form-control" v-model="event.address.City" required>
                </div>
                <div class="form-group">
                    <label>Event State</label>
                    <input type="text" class="form-control" v-model="event.address.State" required>
                </div>
                <div class="form-group">
                    <label>Event Zip Code</label>
                    <input type="number" min="10000" max="99999" class="form-control" v-model="event.address.zip" required>
                </div>
                <div class="form-group">
                    <label>Event County</label>
                    <input type="text" class="form-control" v-model="event.address.County" required>
                </div>
                <div class="form-group">
                    <label>Event Description</label>
                    <input type="text" class="form-control" v-model="event.event_description" required>
                </div>
                <div class="form-group">
                    <label>Event Date</label>
                    <input type="date" class="form-control" style="width: 200px" v-model="event.date" required>
                </div>
                <!-- EVENT ORGANIZATION INFORMATION -->
                <div class="form-group">
                    <label for="event_org">Organization: </label>
                    <select v-model="event.organization_id" id="event_org">
                        <option :value="org.organization_id" v-for="org in organizations" :key="org.organization_id">{{ org.organization_name }}</option>
                    </select>
                </div>
                <!-- PROGRAM TYPE INFORMATION -->
                 <div class="col">
                <label class="form-label">Program Type</label>
                    <input class="form-control" list="Program Type" placeholder="Type to search..." name="programType" v-model="event.program_type" required>
                    <datalist id="Program Type">
                        <option value="Adult Education"> </option>
                        <option value="Family Support Services"></option>
                        <option value="Youth Services"></option>
                        <option value="Early Childhood"> </option>
                        <option value="Others"></option>
                    </datalist>
                </div>  
            <button type="submit" class="btn btn-primary mt-3">Submit</button>   
    </form>
   </div>
  </div>
</template>


<script>
import axios from 'axios';
 // import axios to use api methods

export default {
    data(){
        return {  // create the model for the event schema that will be submited to the api endpoint
            event: {
                event_name: "",
                address: {
                    Address: "",
                    City: "",
                    State: "",
                    County: "",
                    zip: ""
                },
                event_description: "",
                date: "",
                program_type: "",
                organization_id: ""
            },
            organizations: []
        }
    },
    created(){  
            axios.get('http://localhost:3001/api/organizations').then(res => { // GET (READ): get organization information.
                this.organizations = res.data;
            }).catch(error => {
                console.log(error)
            });
    },
    methods: {
        handleSubmitForm(){
            axios.post("http://localhost:3001/api/events", this.event)  // POST (CREATE): Add event record.
            .then(res => {
                alert(res.data)
            }).catch(err => {
                alert("Event not created")
            })
        }
    }
}
</script>

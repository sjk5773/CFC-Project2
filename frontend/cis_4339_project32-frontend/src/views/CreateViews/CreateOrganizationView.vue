<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <form @submit.prevent="handleSubmitForm" class="mb-5" v-if="organization !== null">
        <h2 class="mb-3 mt-3" >Create an Organization</h2>
        <h5>Organization Information</h5>
        <div class="form-group">
            <label>Organization Name</label>
            <input type="text" class="form-control" v-model="organization.organization_name" required>
        </div>
        <div class="form-group">
            <label>Organization Description</label>
            <input type="text" class="form-control" v-model="organization.organization_desc" required>
        </div>
        <div class="form-group">
            <label>Organization Address</label>
            <input type="text" class="form-control" v-model="organization.Address.Address" required>
        </div>
        <div class="form-group">
            <label>Event City</label>
            <input type="text" class="form-control" v-model="organization.Address.City" required>
        </div>
        <div class="form-group">
            <label>Event State</label>
            <input type="text" class="form-control" v-model="organization.Address.State" required>
        </div>
        <div class="form-group">
            <label>Event Zip Code</label>
            <input type="number" min="10000" max="99999" class="form-control" v-model="organization.Address.zip" required>
        </div>
        <div class="form-group">
            <label>Event County</label>
            <input type="text" class="form-control" v-model="organization.Address.County" required>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>        
    </form>
    <h1 class="mb-3 mt-3 fw-bold text-center" v-else>Organization not found</h1>
   </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        create: Boolean
    },
    data(){
        // Empty organization
        return {  // create the model for the organization schema that will be submited to the api endpoint
            organization: {
                organization_name: "",
                organization_desc: "",
                Address: {
                    Address: "",
                    City: "",
                    State: "",
                    County: "",
                    zip: ""
                },
            }
        }
    },
    created(){
        if(!this.create){
            // if we want to update, fetch the organization given from api
            axios.get(`http://localhost:3001/api/organizations/${this.$route.params.organization_id}`)
            .then(res => {
                this.organization = res.data
            }).catch((e) => {
                alert("Organization not found")
            })
        }
    },
    methods: {
        handleSubmitForm(){
            // Create a organization
            if(this.create){
                axios.post("http://localhost:3001/api/organizations", this.organization)
                .then(res => {
                    alert(res.data)
                    location.reload();
                }).catch(err => {
                    alert("Organization not created")
                })
            }
            // Update organization
            else {
                axios.put(`http://localhost:3001/api/organizations/${this.organization.organization_id}`, this.organization)
                .then(res => {
                    alert(res.data)
                    location.reload();
                }).catch(err => {
                    alert("Organization not updated")
                })
            }
        }
    }
}
</script>


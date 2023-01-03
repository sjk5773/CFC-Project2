<template>
  <div class="row justify-content-center">
   <h1 class="mb-3 mt-3">Organizations</h1>
      <table class="table table-striped">
      <thead class="table-dark">
        <tr>
        <th>Organization ID</th>
          <th>Organization Name</th>
          <th>Organization Description</th>
          <th>Organization Address</th>
        <th>Actions</th>
        </tr>
      </thead>
      <tbody>   
        <tr v-for="organization in Organizations" :key="organization.organization_id">
            <td>{{ organization.organization_id }}</td>
            <td>{{ organization.organization_name }}</td>
            <td>{{  organization.organization_desc}}</td>
            <td>{{  organization.Address.Address + "\n" + organization.Address.City + ", " + organization.Address.State + ", " + organization.Address.zip}}</td>
          <td class="d-flex justify-content-start">
            <router-link :to="{name: 'edit organization', params: { organization_id: organization.organization_id }}" class="btn btn-success ">Edit</router-link>
            <!-- <router-link :to="{name: 'clients', params: { id: organization.organization_ID }}" class="btn btn-info">Clients</router-link> -->
             <!-- <router-link :to="{name: 'events', params: { id: organization.organization_ID }}" class="btn btn-info">Events</router-link> -->
            <button @click.prevent="deleteOrganization(organization.organization_id)" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>    
 </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                Organizations: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3001/api/organizations';
            axios.get(apiURL).then(res => {
                this.Organizations = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteOrganization(id){
                let apiURL = `http://localhost:3001/api/organizations/${id}`;
                let indexOfArrayItem = this.Organizations.findIndex(i => i.organization_id === id);
                if (window.confirm("Are you sure you want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Organizations.splice(indexOfArrayItem, 1);
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

<template>
  <div class="row justify-content-center">
   <h1 class="mb-3 mt-3">Health</h1>
      <table class="table table-striped">
      <thead class="table-dark">
        <tr>
            <th>Client ID</th>
            <th>Health Insurance</th>
            <th>Food Stamp</th>
            <th>Food Stamp Amount</th>
            <th>Food Stamp Reason</th> 
        </tr>
      </thead>
      <tbody>   
        <tr v-for="health in Health" :key="health._id">
            <td>{{  health.client_id }}</td>
            <td>{{ health.has_Health_Insurance }}</td>
            <td>{{ health.has_Food_Stamps }}</td>
            <td>{{ health.food_Stamps_Amount }}</td>
            <td>{{ health.food_Stamps_Reason }}</td>
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
                Health: []
            }
        },
        // Get all health information for clients
        created() {
            let apiURL = 'http://localhost:3001/api/health';
            axios.get(apiURL).then(res => {
                this.Health = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>
<template>
  <div class="row justify-content-center">
   <h1 class="mb-3 mt-3">Workers</h1>
      <table class="table table-striped">
      <thead class="table-dark">
        <tr>
         <th>Worker ID</th>
         <th>First Name</th>
         <th>Last Name</th>
         <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worker in Workers" :key="worker.worker_id">
         <td>{{  worker.worker_id }}</td>
          <td>{{ worker.first_name }}</td>
          <td>{{  worker.last_name }}</td> 
          <td class="d-flex justify-content-start">
            <router-link :to="{name: 'edit worker', params: { worker_id: worker.worker_id }}" class="btn btn-success ">Edit</router-link>
            <button @click.prevent="deleteWorker(worker.worker_id)" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>    
 </div>
</template>
<script>
    import axios from "axios";  // import the axios module so that we can use the axios methods
    export default {
        data() {
            return {
                Workers: []  //stores the workers data into an array 
            }
        },
        // this is using created hook 
        created() {     // Get all the clients from database
            let apiURL = 'http://localhost:3001/api/workers';
            axios.get(apiURL).then(res => {     
                this.Workers = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteWorker(id){    // when delete form button is clicked, this function gets called which deletes a worker using the endpoint below.
                console.log(id)
                let apiURL = `http://localhost:3001/api/workers/${id}`;
                let indexOfArrayItem = this.Workers.findIndex(i => i.worker_id === id);
                if (window.confirm("Are you sure you want to delete this worker?")) {
                    axios.delete(apiURL).then(() => {
                        this.Workers.splice(indexOfArrayItem, 1);
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
 

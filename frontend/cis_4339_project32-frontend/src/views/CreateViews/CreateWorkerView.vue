<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <form @submit.prevent="handleSubmitForm" class="mb-5" v-if="worker !== null">
        <h2 class="mb-3 mt-3" >Create a worker</h2>
        <h5>Worker Information</h5>
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="worker.first_name" required>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="worker.last_name" required>
        </div>
       <button type="submit" class="btn btn-primary mt-3">Submit</button>      
    </form>
    <h1 class="text-center fw-bold" v-else>Worker not found</h1>
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
        // create a empty worker
        return {
            worker: {
                first_name: "",
                last_name: "",
            }
        }
    },
    created() {
        if(!this.create){
            // If we want to update a worker, fetch from api and see if the worker exists
            axios.get(`http://localhost:3001/api/workers/${this.$route.params.worker_id}`)
                .then(res => {
                    this.worker = res.data
                }).catch((e) => {
                    this.worker = null
                })
        }
    },
    methods: {
        handleSubmitForm(){
            if(this.create){
                // Creating a worker
                axios.post("http://localhost:3001/api/workers", this.worker)
                .then(res => {
                    alert(res.data)
                    location.reload();
                }).catch(err => {
                    alert("worker not created")
                })
            }
            else{
                // Updating a worker
                axios.put(`http://localhost:3001/api/workers/${this.worker.worker_id}`, this.worker)
                    .then(res => {
                        alert(res.data)
                        location.reload();
                    }).catch(err => {
                        alert("Worker not updated")
                    })
            }
        }
    }
}
</script>

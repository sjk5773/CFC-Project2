<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <h2 class="mb-3 mt-3">Create a Health for Client</h2>
    <form @submit.prevent="handleSubmitForm" class="mb-5">
        <h5>Health Information</h5>
                <div class="form-group">
                    <label for="client">Choose a Client: </label><br>
                    <select v-model="health.client_id" id="client">
                        <option :value="client.client_id" v-for="client in clients" :key="client.client_id">{{ client.first_name+" "+client.last_name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Has Health Insurance?</label><br>
                    <select name="option" id="option" v-model="health.has_Health_Insurance" required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <!-- <input type="text" class="form-control" v-model="health.has_Health_Insurance" required> -->
                </div>
                <div class="form-group">
                    <label>Has Food Stamps?</label><br>
                    <select name="option2" id="option2" v-model="health.has_Food_Stamps" required>
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                    </select>
                    <!-- <input type="text" class="form-control" v-model="health.has_Health_Food_Stamps" required> -->
                </div>
                <div v-if="health.has_Food_Stamps == true" class="form-group">
                    <label>Food Stamp Amount</label><br>
                    <input type="number" v-model="health.food_Stamps_Amount" required>
                </div>
                <div v-if="health.has_Food_Stamps == true" class="form-group">
                    <label>Food Stamp Reason</label><br>
                    <input type="text" v-model="health.food_Stamps_Reason" required>
                </div>
                
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
   </div>
  </div>
</template>


<script>
    import axios from 'axios';


    export default {
        data(){
            // Create an empty health object
            return {
                clients: [],
                health: {
                    client_id: "",
                    has_Health_Insurance: "",
                    has_Food_Stamps: "",
                    food_Stamps_Amount: "",
                    food_Stamps_Reason: "",
                },
            }
        },
        created(){
            // Get the list of clients 
            axios.get('http://localhost:3001/api/clients').then(res => {
                this.clients = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            handleSubmitForm(){
                // Update or create health info for a client
                axios.patch(`http://localhost:3001/api/health/${this.health.client_id}`, this.health)
                .then(res => {
                    alert(res.data)
                }).catch(err => {
                    alert("Health not created")
                })
            }
        }
    }
</script>

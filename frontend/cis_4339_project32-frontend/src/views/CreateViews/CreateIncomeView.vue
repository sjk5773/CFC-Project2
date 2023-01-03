<template>
  <div class="row justify-content-center">
   <div class="col-md-6">
    <h2 class="mb-3 mt-3">Create a Income for Client</h2>
    <form @submit.prevent="handleSubmitForm" class="mb-5">
        <h5>Income Information</h5>
                <div class="form-group">
                    <label for="client">Choose a Client</label><br>
                    <select v-model="income.client_id" id="client">
                        <option :value="client.client_id" v-for="client in clients" :key="client.client_id">{{ client.first_name+" "+client.last_name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Is head of household?</label><br>
                    <select name="option" id="option" v-model="income.is_head_of_household" required>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Monthly Income</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.monthly_Income" required>
                </div>
                <div class="form-group">
                    <label>Spousal Support?</label><br>
                    <select name="option2" id="option2" v-model="income.spousal_Support" required>
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Work Compensation</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.work_comp" required>
                </div>
                <div class="form-group">
                    <label>Child Support</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.child_support" required>
                </div>
                <div class="form-group">
                    <label>Temporary Assistance for Needy Familiy</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.tanf" required>
                </div>
                <div class="form-group">
                    <label>Supplemental Security Income</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.ssi" required>
                </div>
                <div class="form-group">
                    <label>Unemployment</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.unemployment" required>
                </div>
                <div class="form-group">
                    <label>Other Income</label>
                    <input type="number" class="form-control" style="width: 150px" v-model="income.other_Income" required>
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
            // create a empty income object
            return {
                clients: [],
                income: {
                    client_id: "",
                    is_head_of_household: "",
                    monthly_Income: "",
                    spousal_Support: "",
                    work_comp: "",
                    child_support: "",
                    tanf: "",
                    ssi: "",
                    unemployment: "",
                    other_Income: "",
                },
            }
        },
        created(){
            // Get all the clients
                axios.get('http://localhost:3001/api/clients').then(res => {
                    this.clients = res.data;
                }).catch(error => {
                    console.log(error)
                });
        },
        methods: {
            handleSubmitForm(){
                // Update or create a income for a client
                axios.patch(`http://localhost:3001/api/income/${this.income.client_id}`, this.income)
                .then(res => {
                    alert(res.data)
                }).catch(err => {
                    alert("Income not created")
                })
            }
        }
    }
</script>

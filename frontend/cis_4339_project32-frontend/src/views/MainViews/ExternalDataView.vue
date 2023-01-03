<template>
    <div class="row justify-content-center">
        <div class="col-6">
            <h3 class="mb-3 mt-3">Search External Client Database</h3>
            <form @submit.prevent="handleSubmission">
                <div>
                        <label for="client">First Name</label>
                        <input type="text" class="form-control" placeholder="John" style="width: 500px" v-model="client.first_name" required>
                </div>
                <div class="form-group">
                        <label for="client">Last Name</label>
                        <input type="text" class="form-control" placeholder="Doe" style="width: 500px" v-model="client.last_name" required>
                </div>
                <div class="form-group">
                        <label for="client">Phone Number</label>
                        <input type="text" placeholder="000-000-0000" class="form-control" style="width: 500px" v-model="client.phone_number" required>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
            <table class="table table-striped mt-3" v-if="ext_client != null">
                <thead class="table-dark">
                <tr>
                    <th>CHW ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Mental Health Referral</th>
                    <th>Last Mental Health Referral</th>
                    <th>Legal Council Referral</th>        
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{ ext_client.CHW_id }}</td>
                    <td>{{ ext_client.first_name  }}</td>
                    <td>{{ ext_client.last_name  }}</td>
                    <td>{{ ext_client.phone_number }}</td>
                    <td>{{ ext_client.mental_health_referral }}</td>
                    <td>{{ ext_client.date_last_mental_health_referal.split('T')[0] }}</td>
                    <td>{{ ext_client.legal_councel_referal }}</td>
                </tr>
                </tbody>
            </table>
            <h3 v-if="client_not_found">Client Not Found</h3>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
// axios to call api methods
export default {
    data(){
        return{
            ext_client: null,
            client_not_found: false,
            client: {}
        }
    },
    methods: {   // endpoint to fetch data from an external api
        handleSubmission(){
            axios.get(`http://localhost:3001/api/external/${this.client.first_name}/${this.client.last_name}/${this.client.phone_number}`)
            .then(res => {
                this.ext_client = res.data[0]
            }).catch(err => {
                console.log(err)
                this.client_not_found = true
            })
        }
    }
}
</script>

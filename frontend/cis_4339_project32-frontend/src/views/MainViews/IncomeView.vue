<template>
  <div class="row justify-content-center">
   <h1 class="mb-3 mt-3">Income</h1>
      <table class="table table-striped">
      <thead class="table-dark">
        <tr>
            <th>Client ID</th>
            <th>Head of Household</th>
            <th>Monthly Income</th>
            <th>Spousal Support</th>
            <th>Work Company</th> 
            <th>Child Support</th>
            <th>TANF</th>
            <th>Supplemental Security Income</th>
            <th>Unemployment</th>
            <th>Other Income</th>
        </tr>
      </thead>
      <tbody>   
        <tr v-for="income in Income" :key="income._id">
            <td>{{  income.client_id }}</td>
            <td>{{ income.is_head_of_household }}</td>
            <td>{{ income.monthly_Income }}</td>
            <td>{{ income.spousal_Support }}</td>
            <td>{{ income.work_comp }}</td>
            <td>{{ income.child_support }}</td>
            <td>{{ income.tanf }}</td>
            <td>{{ income.ssi }}</td>
            <td>{{ income.unemployment }}</td>
            <td>{{ income.other_Income }}</td>
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
                Income: []
            }
        },
        created() {
            // Get all incomes for clients
            let apiURL = 'http://localhost:3001/api/income';
            axios.get(apiURL).then(res => {
                this.Income = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>

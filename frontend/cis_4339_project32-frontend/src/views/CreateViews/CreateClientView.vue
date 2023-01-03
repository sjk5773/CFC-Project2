<template>
  <div>
    <form @submit.prevent="handleSubmitForm" v-if="client !== null">
        <h2 class="mb-3 mt-3">Create a Client</h2>
        <h5>Basic Information</h5>
        <!-- GENERAL INFORMATION -->
        <div class="row">
            <div class="col-5">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="Ezekiel" name="first_name" v-model="client.first_name" required>
            </div>
            <div class="col-2">
                <label>Middle Name</label>
                <input type="text" class="form-control" placeholder="Wimberly" name="middle_name" v-model="client.middle_name" required>
            </div>
            <div class="col-5">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Cullen" name="last_name" v-model="client.last_name" required>
            </div>
            <div class="col-5">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="jdoe21@abcco.com" v-model="client.email" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Date of Birth</label>
                <input type="date" class="form-control" name="birthday" v-model="client.birthday" required>
            </div>
            <div class="col">
                <label>Phone Number</label>
                <input type="text" class="form-control" placeholder="000-000-0000" name="phone_number" v-model="client.phone_number" pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required>
            </div>
            <div class="col">
                <label class="form-label">Gender</label>
                    <input class="form-control" list="genders" placeholder="Type to search..." v-model="client.gender" name="gender" required>
                    <datalist id="genders">
                        <option value="Male"> </option>
                        <option value="Female"></option>
                        <option value="Other"> </option>
                    </datalist>
            </div>
            <div class="col">
                <label class="form-label">Race</label>
                    <input class="form-control" list="race" placeholder="Type to search..." name="race" v-model="client.race" required>
                    <datalist id="race">
                        <option value="Asian"> </option>
                        <option value="White"></option>
                        <option value="Black or African American"> </option>
                        <option value="American Indian or Alaska Native"> </option>
                        <option value="Native Hawaiian or Other Pacific Islander"> </option>
                    </datalist>
            </div>
            <!-- EDUCATION INFORMATION -->
            <div class="col">   
                <label class="form-label">Education Attainment</label>
                    <input class="form-control" list="edu" placeholder="Type to search..." name="highest_education_completed" v-model="client.highest_education_completed" required>
                    <datalist id="edu">
                        <option value="No Schooling"> </option>
                        <option value="Some Grade School"></option>
                        <option value="High School Graduate"> </option>
                        <option value="Some College"> </option>
                        <option value="Associates degree"> </option>
                        <option value="Bachelor’s degree"> </option>
                        <option value="Masters’s degree"> </option>
                        <option value="Doctorate degree"> </option>
                    </datalist>
            </div>
             <div class="col">
                <label>Language</label>
                <input type="text" class="form-control" placeholder="English" name="language" v-model="client.language" required>
            </div>
        </div>
        <!-- RESIDENCE INFORMATION -->
        <div class="row mb-2 mt-2">
            <h5>Address</h5>
            <div class="col">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="4800 Calhoun Rd" name="address" v-model="client.address.Address" required>
            </div>
            <div class="col">
                <label>City</label>
                <input type="text" class="form-control" placeholder="Houston" name="city" v-model="client.address.City" required>
            </div>
            <div class="col">
                <label>State</label>
                <input type="text" class="form-control" placeholder="Texas" name="state" v-model="client.address.State" required>
            </div>
            <div class="col">
                 <label>Zip</label>
                <input type="number" class="form-control" placeholder="77004" maxlength="5" v-model="client.address.zip" name="zip" required>
            </div>
            <div class="col">
                 <label>County</label>
                <input type="text" class="form-control" v-model="client.address.County" name="county" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Senior Citizen?</label>
                <input type="checkbox" name="is_65_or_older" value="true" v-model="client.is_65_or_older">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Veteran?</label>
                <input type="checkbox" name="is_veteran" v-model="client.is_veteran" value="true">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Vaccinated?</label>
                <input type="checkbox" name="is_vaccinated"  v-model="client.is_vaccinated" value="true">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Employed?</label>
                <input type="checkbox" name="is_Employed" v-model="client.is_Employed" value="true">
            </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
    <h1 class="fw-bold text-center" v-else>Client not found</h1>
  </div>
</template>

<script>
   // import axios to use api methods
    import axios from 'axios';

    export default {
        props: {
            create: Boolean 
        },
        data() {
            return {  // create the model for the client scheme that will be submitted to the api endpoint
                client: {
                    first_name: "",
                    last_name: "",
                    middle_name: "",
                    birthday: "",
                    ssn: "",
                    gender: "",
                    phone_number: "",
                    email: "",
                    language: "",
                    race: "",
                    is_65_or_older: false,
                    is_veteran: false,
                    highest_education_completed: "",
                    is_Employed: false,
                    is_vaccinated: false,  
                    address: {
                        Address: "",
                        City: "",
                        State: "",
                        County: "",
                        zip: "",
                    },
                }                
            }
        },
        created(){
            if(!this.create){   
                axios.get(`http://localhost:3001/api/clients/${this.$route.params.client_id}`)   // GET(READ):get the client information using parameter
                .then(res => {
                    res.data.birthday = new Date(res.data.birthday).toISOString().split('T')[0]
                    this.client = res.data
                }).catch((e) => {
                    this.client = null
                })
            }
        },
        methods: {  
            handleSubmitForm(){
                if(this.create){
                    axios.post("http://localhost:3001/api/clients", this.client)   //when client information is submitted, the data gets sent to the endpoint using axios.
                    .then(res => {
                        alert(res.data)
                        location.reload();
                    }).catch(err => {
                        alert("Client not created")
                    })
                }
                else{   // if the client already exist, then update the client.
                    axios.put(`http://localhost:3001/api/clients/${this.client.client_id}`, this.client)   // PUT(UPDATE): update client record.
                    .then(res => {
                        alert(res.data)
                        location.reload();
                    }).catch(err => {
                        alert("Client not updated")
                    })
                }
            }
        }
    }
</script>

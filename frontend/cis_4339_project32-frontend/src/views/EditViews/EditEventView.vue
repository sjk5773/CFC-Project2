<template>
    <div class="row" v-if="event !== null">
      <h2 class="mb-3 mt-3">Edit Event</h2>
      <div class="col-4">
        <form @submit.prevent="handleSubmitForm" class="mb-5" >
          <h5>Event Information</h5>
          <div class="form-group">
            <label>Event Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Son"
              name="event_name"
              v-model="event.event_name"
              required
            />
          </div>
          <div class="form-group">
            <label>Event Address</label>
            <input
              type="text"
              class="form-control"
              v-model="event.address.Address"
              required
            />
          </div>
          <div class="form-group">
            <label>Event City</label>
            <input
              type="text"
              class="form-control"
              v-model="event.address.City"
              required
            />
          </div>
          <div class="form-group">
            <label>Event State</label>
            <input
              type="text"
              class="form-control"
              v-model="event.address.State"
              required
            />
          </div>
          <div class="form-group">
            <label>Event Zip Code</label>
            <input
              type="number"
              min="10000"
              max="99999"
              class="form-control"
              v-model="event.address.zip"
              required
            />
          </div>
          <div class="form-group">
            <label>Event County</label>
            <input
              type="text"
              class="form-control"
              v-model="event.address.County"
              required
            />
          </div>
          <div class="form-group">
            <label>Event Description</label>
            <input
              type="text"
              class="form-control"
              v-model="event.event_description"
              required
            />
          </div>
          <div class="form-group">
            <label>Event Date</label>
            <input
              type="date"
              class="form-control"
              style="width: 200px"
              v-model="event.date"
              required
            />
          </div>
          <div class="form-group">
            <label for="event_org">Organization: </label>
            <select v-model="event.organization_id" id="event_org">
              <option
                :value="org.organization_id"
                v-for="org in organizations"
                :key="org.organization_id"
              >
                {{ org.organization_name }}
              </option>
            </select>
          </div>
          <div class="col">
            <label class="form-label">Program Type</label>
            <input
              class="form-control"
              list="Program Type"
              placeholder="Type to search..."
              name="programType"
              v-model="event.program_type"
              required
            />
            <datalist id="Program Type">
              <option value="Adult Education"></option>
              <option value="Family Support Services"></option>
              <option value="Youth Services"></option>
              <option value="Early Childhood"></option>
              <option value="Others"></option>
            </datalist>
          </div>
          <!-- Add Client -->
          <!-- <div class="form-group">
                        <label>Add Client</label>
                        <input type="text" class="form-control" v-model="event.address.County" required>
                    </div> -->
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    <div class="col-4">
      <h5>Clients</h5>
      <clients-table v-if="event.clients_info != null" :clients="event.clients_info" :event_id="event.event_ID"></clients-table>
      
    </div>
    <div class="col-4">
      <h5>Workers</h5>
      <events-workers-table v-if="event.worker_info != null" :workers="event.worker_info" :event_id="event.event_ID"></events-workers-table>
    </div>
  </div>
    <h1 class="fw-bold text-center" v-else>Event not found</h1>
</template>

<script>
import axios from "axios";
import ClientsTable from '../../components/EventsClientsTable.vue'
import EventsWorkersTable from '../../components/EventsWorkersTable.vue';

export default {
  components: { ClientsTable, EventsWorkersTable },
  data() {
    return {
      // Store the event information
      event: {
        event_name: "",
        address: {
          Address: "",
          City: "",
          State: "",
          County: "",
          zip: "",
        },
        event_description: "",
        date: "",
        program_type: "",
        organization_id: "",
        clients_info: null,
        worker_info: null
      },
      organizations: [],
    };
  },
  created() {
    // Make api call to get event information
      axios
        .get(`http://localhost:3001/api/events/${this.$route.params.event_id}`)
        .then((res) => {
          res.data.date = new Date(res.data.date).toISOString().split('T')[0]
          this.event = res.data;
        })
        .catch((e) => {
          this.event = null
        });
      // Get the list of all organizations
      axios
        .get(`http://localhost:3001/api/organizations`)
        .then((res) => {
          this.organizations = res.data;
        })
        .catch((e) => {
          alert("Organizations not found")
        });
  },

  methods: {
    handleSubmitForm() {
      // Make a call to update the client record on form submission
        axios
          .put(
            `http://localhost:3001/api/events/${this.event.event_ID}`,
            this.event
          )
          .then((res) => {
            alert(res.data);
            location.reload();
          })
          .catch((err) => {
            alert("Event not updated");
          });
    },
  },
};
</script>

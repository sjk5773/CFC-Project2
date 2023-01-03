<template>
  <div>
    <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Worker ID</th>
            <th>Name</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
        <tr v-for="worker in workers" :key="worker.worker_id">
            <td>{{ worker.worker_id }}</td>
            <td>{{ worker.first_name + " " + worker.last_name }}</td>
            <td>
              <button @click.prevent="deleteWorker(worker.worker_id)" class="btn btn-danger mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form @submit.prevent="addWorkerToEvent(selected_worker)">
        <div class="form-group">
            <label for="event_org">Add a worker: </label>
            <select v-model="selected_worker">
              <option v-for="worker in all_workers" :key="worker.worker_id" :value="worker.worker_id">{{worker.first_name + " " + worker.last_name }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Add</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        workers: Array,
        event_id: String
    },
    data(){
      // Create a empty array of workers to pick from
      return {
        all_workers: [],
        selected_worker: null
      }
    },
    mounted(){
      let apiURL = 'http://localhost:3001/api/workers';
      axios.get(apiURL).then(res => {
      // Only add workers that are not attending the event
      // We do not want to add workers twice
      this.workers.forEach(org_worker =>{
          res.data = res.data.filter(item => item.worker_id != org_worker.worker_id)
      })
          this.all_workers = res.data
      }).catch(error => {
          console.log(error)
      });
    },
    methods: {
      deleteWorker(id){
        let indexOfArrayItem = this.workers.findIndex(i => i.worker_id === id);
        // Delete a worker
        if(window.confirm("Are you sure you want to delete this worker?")){
          axios.delete(`http://localhost:3001/api/events/${this.event_id}/worker/${id}`)
          .then(res => {
            this.workers.splice(indexOfArrayItem, 1);
            alert("Worker has been deleted from the event")
            location.reload()
          }).catch(err => {
            alert("Worker not deleted from event")
          })
        }
      },
      addWorkerToEvent(id){
        // add the chosen worker for the event
        axios.patch(`http://localhost:3001/api/events/${this.event_id}/worker/${id}`)
        .then(res => {
          alert('Worker has been added to event')
          location.reload()
        }).catch(err => {
          alert("Worker not added to event")

        })
      }
    }
}
</script>

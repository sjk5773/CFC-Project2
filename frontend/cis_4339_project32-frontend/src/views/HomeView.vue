

<template>
  <div class="mb-3">
    <h1>Dashboard</h1>
    <div class="row">
      <div class="col-6">
          <BarChart :chartData="AverageClientIncomeAtEvent" :options="ACIE_OPTIONS" />
      </div>
      <div class="col-6">
            <BarChart :chartData="NumberOfEventsByOrganization" :options="NEBO_OPTIONS" />
      </div>
    </div>
      <BarChart :chartData="ActivityTimePerEvent" :options="ATPE_OPTIONS" />
    <div class="row">
      <div class="col-4">
          <PieChart :chartData="NumberOfClientsAttendedEvents" :options="NCAT_OPTIONS" />
      </div>
      <div class="col-4">
        <PieChart :chartData="HealthInsuranceStatus" :options="HIS_OPTIONS" />
      </div>
      <div class="col-4">
        <PieChart :chartData="FoodStampsStatus" :options="FSS_OPTIONS" />
      </div>
    </div>
  </div>
</template>

<script>
// import our chart library and import the required charts
import { PieChart, DoughnutChart, LineChart, BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import axios from 'axios';

Chart.register(...registerables);
export default {
  components: { PieChart, DoughnutChart, LineChart, BarChart},
  data() {
    return {
      // Storing chart data in the below objects
      NumberOfClientsAttendedEvents: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      AverageClientIncomeAtEvent: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      NumberOfEventsByOrganization: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      ActivityTimePerEvent: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      HealthInsuranceStatus: {
        labels: ["Yes", "No"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#00FF00", "#FF0000"],
          },
        ],
      },
      FoodStampsStatus: {
        labels: ["Yes", "No"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#FF0000", "#00FF00"],
          },
        ],
      },
      // Chart config objects
      NCAT_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'How many clients attended each event',
            font: {
              size: 20
            }
          },
        },
      },
      ACIE_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'Average client income at event',
            font: {
              size: 20
            }
          },
          legend: {
            display: false
          }
        }
      },
      NEBO_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'How many events put on by an organization',
            font: {
              size: 20
            }
          },
          legend: {
            display: false
          }
        }
      },
      ATPE_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'How many combined hours of activity at event',
            font: {
              size: 20
            }
          },
          legend: {
            display: false
          }
        }
      },
      HIS_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'How many clients have health insurance',
            font: {
              size: 20
            }
          },
        },
      },
      FSS_OPTIONS:{
        plugins:{
          title: {
            display: true,
            text: 'How many clients receive food stamps',
            font: {
              size: 20
            }
          },
        },
      },
    }
  },
  mounted(){
    // Get events 
    axios.get("http://localhost:3001/api/events")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        this.NumberOfClientsAttendedEvents.labels.push(res.data[index].event_name);
        this.NumberOfClientsAttendedEvents.datasets[0].data.push(res.data[index].clients_info.length);
        this.NumberOfClientsAttendedEvents.datasets[0].backgroundColor.push(this.getRandomColor());
      }
    })

    // get average event income
     axios.get("http://localhost:3001/api/summary/event-average-income")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        this.AverageClientIncomeAtEvent.labels.push(res.data[index].event_name);
        this.AverageClientIncomeAtEvent.datasets[0].data.push(res.data[index].AverageClientIncome);
        this.AverageClientIncomeAtEvent.datasets[0].backgroundColor.push(this.getRandomColor());
      }
    })

     // get number of events by organization
     axios.get("http://localhost:3001/api/summary/events-by-organization")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        this.NumberOfEventsByOrganization.labels.push(res.data[index].organization_name);
        this.NumberOfEventsByOrganization.datasets[0].data.push(res.data[index].events.length);
        this.NumberOfEventsByOrganization.datasets[0].backgroundColor.push(this.getRandomColor());
      }
    })

    // activity per event
    axios.get("http://localhost:3001/api/summary/activity-per-event")
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        this.ActivityTimePerEvent.labels.push(res.data[index].event_name);
        this.ActivityTimePerEvent.datasets[0].data.push(res.data[index].CombinedClientActivityTime);
        this.ActivityTimePerEvent.datasets[0].backgroundColor.push(this.getRandomColor());
      }
    })
    // Get the insurance status of all clients
    axios.get("http://localhost:3001/api/summary/health-insured-status")
    .then((res) => {
      this.HealthInsuranceStatus.datasets[0].data.push(res.data.Insured)
      this.HealthInsuranceStatus.datasets[0].data.push(res.data.notInsured)
      this.FoodStampsStatus.datasets[0].data.push(res.data.HasFoodStamps)
      this.FoodStampsStatus.datasets[0].data.push(res.data.NoFoodStamps)
    })
  },
  methods: {
    // Get Random color for charts
    // https://stackoverflow.com/questions/1484506/random-color-generator
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
}
</script>


<style>
/* default styling */
@import "../assets/base.css";
</style>


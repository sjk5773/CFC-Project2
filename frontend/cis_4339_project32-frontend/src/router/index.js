import { createRouter, createWebHistory } from 'vue-router'

// Import Views
import HomeView from '../views/HomeView.vue'
import ClientsView from '../views/MainViews/ClientsView.vue'
import EventsView from '../views/MainViews/EventsView.vue'
import OrganizationsView from '../views/MainViews/OrganizationsView.vue'
import WorkersView from '../views/MainViews/WorkersView.vue'
import HealthView from '../views/MainViews/HealthView.vue'
import IncomeView from '../views/MainViews/IncomeView.vue'
import ExternalDataView from '../views/MainViews/ExternalDataView.vue'

// Import create views
import CreateClientView from '../views/CreateViews/CreateClientView.vue'
import CreateEventView from '../views/CreateViews/CreateEventView.vue'
import CreateOrganizationView from '../views/CreateViews/CreateOrganizationView.vue'
import CreateWorkerView from '../views/CreateViews/CreateWorkerView.vue'
import CreateHealthView from '../views/CreateViews/CreateHealthView.vue'
import CreateIncomeView from '../views/CreateViews/CreateIncomeView.vue'
import CreateActivity from '../views/CreateViews/CreateActivity.vue'

// Import edit views
import EditEventView from '../views/EditViews/EditEventView.vue'
import { propsToAttrMap } from '@vue/shared'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clients',
      name: 'client',
      component: ClientsView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/organizations',
      name: 'organization',
      component: OrganizationsView
    },
    {
      path: '/workers',
      name: 'workers',
      component: WorkersView
    },
    {
      path: '/Health',
      name: 'health',
      component: HealthView
    },
    {
      path: '/Income',
      name: 'income',
      component: IncomeView
    },
    {
      path: '/external',
      name: 'external',
      component: ExternalDataView
    },
    // Create routes
    {
      path: '/clients/create',
      name: 'create client',
      component: CreateClientView,
      props: {create: true}
    },
    {
      path: '/events/create',
      name: 'create events',
      component: CreateEventView
    },
    {
      path: '/organizations/create',
      name: 'create organizations',
      component: CreateOrganizationView,
      props: {create: true}
    },
    {
      path: '/workers/create',
      name: 'create workers',
      component: CreateWorkerView,
      props: {create: true}
    },
    {
      path: '/health/create',
      name: 'create health',
      component: CreateHealthView
    },
    {
      path: '/income/create',
      name: 'create income',
      component: CreateIncomeView
    },
    {
      path: '/events/:event_id/clients/:client_id',
      name: 'create activity',
      component: CreateActivity
    },
    // Edit Routes
    {
      path: '/clients/edit/:client_id',
      name: 'edit client',
      component: CreateClientView,
      props: {create: false}
    },
    {
      path: '/events/edit/:event_id',
      name: 'edit events',
      component: EditEventView
    },
    {
      path: '/organizations/edit/:organization_id',
      name: 'edit organization',
      component: CreateOrganizationView,
      props: {create: false}
    },
    {
      path: '/workers/edit/:worker_id',
      name: 'edit worker',
      component: CreateWorkerView,
      props: {create: false}
    }
  ]
})

export default router

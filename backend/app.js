const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Require mongoose library
const morgan = require("morgan");
require("dotenv").config(); // Require the dotenv
const axios = require("axios"); // Require axios library to make API calls
const app = express();

app.use(cors());

const port = 3001;

// Connect to our database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode

// Main Schemas
let ClientSchema = require("./Models/Clients");
let OrganizationSchema = require("./Models/Organizations");
let EventsSchema = require("./Models/Events");
let WorkersSchema = require("./Models/Workers");

// Other Schemas
let activitySchema = require("./Models/Activity");
let healthSchema = require("./Models/Health");
let incomeSchema = require("./Models/Income");
const res = require("express/lib/response");

// API Base Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Client Routes

// CREATE - Clients
app.post("/api/clients", (req, res, next) => {
  ClientSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send("Client has been added to the database");
    }
  });
});

//  READ - All Clients
app.get("/api/clients", (req, res, next) => {
  ClientSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//  READ - Client by ID
app.get("/api/clients/:clientID", (req, res, next) => {
  ClientSchema.findOne({ client_id: req.params.clientID }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

// UPDATE - Clients by ID
app.put("/api/clients/:clientID", (req, res, next) => {
  ClientSchema.findOneAndUpdate(
    { client_id: req.params.clientID },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Client is updated");
      }
    }
  );
});

// DELETE - Clients by ID
app.delete("/api/clients/:clientID", (req, res, next) => {
  ClientSchema.findOneAndRemove(
    { client_id: req.params.clientID },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Client is deleted");
      }
    }
  );
});

// Organization Routes

// CREATE - Organizations
app.post("/api/organizations", (req, res, next) => {
  OrganizationSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("Organization has been added to the database");
    }
  });
});

// READ - All Organizations
app.get("/api/organizations", (req, res, next) => {
  OrganizationSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

//  READ - Organizations by ID
app.get("/api/organizations/:organizationID", (req, res, next) => {
  OrganizationSchema.findOne(
    { organization_id: req.params.organizationID },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// UPDATE - Organizations by ID
app.put("/api/organizations/:organizationID", (req, res, next) => {
  OrganizationSchema.findOneAndUpdate(
    { organization_id: req.params.organizationID },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Organization is updated");
      }
    }
  );
});

// DELETE - Organizations by ID
app.delete("/api/organizations/:organizationID", (req, res, next) => {
  OrganizationSchema.findOneAndRemove(
    { organization_id: req.params.organizationID },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Organization is deleted");
      }
    }
  );
});

// Events Routes

// POST(CREATE): an endpoint that will add an event data to Database
app.post("/api/events", (req, res, next) => {
  EventsSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("Event is added to the database");
    }
  });
});

// TODO - aggregate events to find the client info
// GET (READ) gets all of the events in the database
app.get("/api/events", (req, res, next) => {
  // EventsSchema.find(
  //   {},
  //   { applicants: 0 }, //excludes the applicant fields because we don't need to see all of that data
  //   (error, data) => {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       res.json(data);
  //     }
  //   }
  // );

  EventsSchema.aggregate([
    {
      $lookup: {
        from: "client",
        localField: "clients",
        foreignField: "client_id",
        as: 'clients_info'
      },
    }], (err, data) => {
      console.log(err)
      res.json(data)
    }
  )
});

// GET(READ) retrieve a single event by ID
app.get("/api/events/:eventID", (req, res, next) => {
  // EventsSchema.findOne({ event_ID: req.params.eventID }, (error, data) => {
  //   if (error) {
  //     return next(error);
  //   } else if (data === null) {
  //     res.status(404).send("Event information not found");
  //   } else {
  //     res.json(data);
  //   }
  // });

  EventsSchema.aggregate([
    {
      $match: {event_ID: req.params.eventID}
    },
    {
      $lookup: {
        from: "client",
        localField: "clients",
        foreignField: "client_id",
        as: 'clients_info'
      },
    },
    {
      $lookup: {
        from: "worker",
        localField: "workers",
        foreignField: "worker_id",
        as: 'worker_info'
      }
    }
    ], (err, data) => {
      console.log(err)
      res.json(data[0])
    }
  )

});

// (UPDATE) endpoint to update an event by ID
app.put("/api/events/:eventID", (req, res, next) => {
  EventsSchema.findOneAndUpdate(
    { event_ID: req.params.eventID },
    { $set: req.body },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send("The event has been updated.");
      }
    }
  );
});

// (UPDATE) add a client to an event
app.patch("/api/events/:eventID/client/:clientID", (req, res, next) => {
  EventsSchema.findOneAndUpdate(
    { event_ID: req.params.eventID },
    {
      // Add the new client to the array of clients in the event
      $push: { clients: req.params.clientID },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send("The client has been added to event.");
      }
    }
  );
});

// (UPDATE) add a worker to an event
app.patch("/api/events/:eventID/worker/:workerID", (req, res, next) => {
  EventsSchema.findOneAndUpdate(
    { event_ID: req.params.eventID },
    {
      // Add the new worker to the array of workers for the event
      $push: { workers: req.params.workerID },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log(data)
        res.send("The worker has been added to event.");
      }
    }
  );
});

// DELETE - Events
app.delete("/api/events/:eventID", (req, res, next) => {
  // Removes an event using the event ID
  EventsSchema.findOneAndRemove(
    { event_ID: req.params.eventID },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Event is deleted");
      }
    }
  );
});

app.delete("/api/events/:eventID/client/:clientID", (req, res, next) => {
  EventsSchema.findOneAndUpdate(
    { event_ID: req.params.eventID },
    {
      // Delete client from event
      $pull: { clients: req.params.clientID },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send("The client has been deleted from the event.");
      }
    }
  );
});

app.delete("/api/events/:eventID/worker/:workerID", (req, res, next) => {
  EventsSchema.findOneAndUpdate(
    { 
      event_ID: req.params.eventID 
    },
    {
      // Add the new worker to the array of workers for the event
      $pull: { workers: req.params.workerID },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send("The worker has been deleted from the event.");
      }
    }
  );
});
// Workers Routes

// POST(CREATE): an endpoint that will insert an worker info into Database
app.post("/api/workers", (req, res, next) => {
  WorkersSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("Worker is added to the database.");
    }
  });
});

// GET(READ): an endpoint to get all worker information
app.get("/api/workers", (req, res, next) => {
  WorkersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

// GET(READ): an endpoint to retrieve specific worker info by work ID
app.get("/api/workers/:workerID", (req, res, next) => {
  WorkersSchema.findOne({ worker_id: req.params.workerID }, (error, data) => {
    if (error) {
      return next(error);
    } else if (data === null) {
      res.status(404).send("Worker information not found");
    } else {
      res.json(data);
    }
  });
});

// PUT(Update): an endpoint to edit a record by work ID
app.put("/api/workers/:workerID", (req, res, next) => {
  WorkersSchema.findOneAndUpdate(
    { worker_id: req.params.workerID },
    { $set: req.body },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Worker has been updated");
      }
    }
  );
});

// DELETE: an endpoint to delete a record by work ID
app.delete("/api/workers/:workerID", (req, res, next) => {
  WorkersSchema.findOneAndRemove(
    { worker_id: req.params.workerID },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Worker is deleted");
      }
    }
  );
});

// Other Routes

// Create - Activity for an event and client
app.patch("/api/activity", (req, res, next) => {
  activitySchema.updateOne(
    {$and: [{event_id: req.body.event_id}, {client_id: req.body.client_id}]},
    {$set: req.body},
    {upsert: true}, 
    (error, data) => {
    if (error) {
      return next(error);
    } else {
      res
        .status(200)
        .send(
          "Activity for this client and event has been added to the database"
        );
    }
  });
});

// Get all activity for an event using the event ID
app.get("/api/activity/event/:eventID", (req, res, next) => {
  activitySchema.find({ event_id: req.params.eventID }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

//  READ - All Clients having health info
app.get("/api/health", (req, res, next) => {
  healthSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// // Create - Health for a client
// app.post("/api/health", (req, res, next) => {
//   healthSchema.updateOne(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).send("Health for this client has been created");
//     }
//   });
// });

// Update Health for a client using client ID
app.patch("/api/health/:clientID", (req, res, next) => {
  healthSchema.updateOne(
    { client_id: req.params.clientID },
    { $set: req.body },
    { upsert: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Health for this client has been updated");
      }
    }
  );
});

// Get Health for a client using client ID
app.get("/api/health/:clientID", (req, res, next) => {
  healthSchema.findOne({ client_id: req.params.clientID }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

//  READ - All Clients having income info
app.get("/api/income", (req, res, next) => {
  incomeSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// // Create - Income for a client
// app.post("/api/income", (req, res, next) => {
//   incomeSchema.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).send("Income for this client has been created");
//     }
//   });
// });

// Update or create Income for a client by client ID
app.patch("/api/income/:clientID", (req, res, next) => {
  incomeSchema.updateOne(
    { client_id: req.params.clientID },
    { $set: req.body },
    { upsert: true},
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).send("Income for this client has been updated");
      }
    }
  );
});

// Get Income for a client by client ID
app.get("/api/income/:clientID", (req, res, next) => {
  incomeSchema.findOne({ client_id: req.params.clientID }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    }
  });
});

// Request to external API route

// Listing all client data from external API
app.get("/api/external", (req, res) => {
  let apiURL = `https://cis-4339.herokuapp.com/api/v1/data`;
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).json(response.data.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// Listing a single client's data
app.get("/api/external/:first_name/:last_name/:phone_number", (req, res) => {
  let first_name = req.params.first_name;
  let last_name = req.params.last_name;
  let phone_number = req.params.phone_number;
  // create the url using the parameters
  let apiURL = `https://cis-4339.herokuapp.com/api/v1/data/${first_name}/${last_name}/${phone_number}`;
  // make the request
  axios
    .get(apiURL)
    .then((response) => {
      // if the request is successful, send the data back to the client
      if (response.status === 200) {
        res.status(200).json(response.data.data);
      } else {
        return next({ statusCode: 404, message: "Client not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// Aggregation Routes
app.get("/api/summary/events-by-organization", (req, res) => {
  OrganizationSchema.aggregate([
    {
      $lookup:{
        from: "event",
        localField: "organization_id",
        foreignField: "organization_id",
        as: "events"
      }
    }
  ], (error, data) => {
    if(error) return next(error)
    // Returning the result back to client
    else {
      res.status(200).json(data)
    }
  } 
  )
});

app.get("/api/summary/event-average-income", (req, res) => {
  EventsSchema.aggregate([
    {
      $lookup:{
        from: "income",
        localField: "clients",
        foreignField: "client_id",
        as: "incomes"
      },
    },
    {
      $project: {
        _id: 0,
        event_ID: 1,
        event_name: 1,
        date: 1,
        incomes: 1,
        AverageClientIncome: {$avg: "$incomes.monthly_Income"}
      },
    }
  ], (error, data) => {
    if(error) return next(error)
    // Returning the result back to client
    else {
      res.status(200).json(data)
    }
  })
});

app.get("/api/summary/worker-attended-events", (req, res) => {
  res.status(503).send("This API route is under construction")
});

// app.get("/api/summary/events-attended-by-client", (req, res, next) => {
//   ClientSchema.aggregate([
//     {
//       $lookup: {
//         from: "events",
//         let: {event_clients: "$clients"},
//         pipeline: [
//           {$in: ['client_id' ,'$$event_clients']}
//         ],
//         as: 'events'
//       }
//     },
//     // {
//     //   $project:{
//     //     _id: 0,
//     //     events: 1,
//     //     client_id : 1,
//     //     first_name: 1,
//     //     last_name :1
//     //   }
//     // }
//   ], (error, data) => {
//     if(error) return next(error)
//     // Returning the result back to client
//     else {
//       res.status(200).json(data)
//     }
//   })
// });

app.get("/api/summary/activity-per-event", (req, res, next) => {
  EventsSchema.aggregate([
  {
    $lookup: {
      from: "activity",
      localField: "event_ID",
      foreignField: "event_id",
      as: "activity"
    }
  },
  {
    $project: {
      _id: 0,
      event_ID: 1,
      event_name: 1,
      date: 1,
      activity: 1,
      CombinedClientActivityTime: {$sum: "$activity.time_spent"}
    }
  }
  ], (error, data) => {
    if(error) return next(error)
    // Returning the result back to client
    else {
      res.status(200).json(data)
    }
  })

});

app.get("/api/summary/health-insured-status", (req, res, next) => {
  healthSchema.find(
  {
  }, (error, data) => {
    if(error) return next(error)
    // Returning the result back to client
    else {

      let newRes = {
        Insured: 0,
        notInsured: 0,
        AverageFoodStamps: 0,
        HasFoodStamps: 0,
        NoFoodStamps: 0
      }
      for(var i in data){
        if(data[i].has_Health_Insurance) newRes.Insured += 1
        else newRes.notInsured += 1
        
        if(data[i].has_Food_Stamps) newRes.HasFoodStamps += 1
        else newRes.NoFoodStamps += 1

        newRes.AverageFoodStamps += data[i].food_Stamps_Amount
      }

      newRes.AverageFoodStamps = newRes.AverageFoodStamps / data.length
      res.status(200).json(newRes)

      
    }
  })

});

app.listen(port, () => {
  console.log("Server is online");
});

// For error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  // send a error 500 for any error
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

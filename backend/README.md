# BOL and CFC API documentation

This repository contains the documentation for BOL and CFC API.

## Contents:

1.  Introduction.

2. How to Run

3.  Resources.

4.  Testing.

## I. Introduction:

        BOL and CFC API is a full stack web application that joins two different organizations
        to design a one functional consolidated application. The backend offers all the API functionalities
        and endpoints to access the services. CRUD operations is used to interact with database (MongoDB).

## II. How to Run
        1. Run 'npm install' while in the backend directory
        2. Start local MongoDB instance and follow the instructions in the .env file to run locally. 
           Disregard this step if you want to use the Atlas cloud server.
        3. Run 'nodemon app.js' while in the backend directory to start the server.

## III. Resources

The API has a variety of endpoints that return different information using (GET, POST, PUT, PATCH, DELETE). methods.

### Client Routes

        GET /api/clients ======================== return all clients
        GET /api/clients/:clientID ============== return a specific client by ID
        POST /api/clients ======================= create new clients
                Request Body Example: {
                                        "first_name": "Michael",
                                        "last_name": "Jordan",
                                        "middle_name": "Oh",
                                        "birthday": "1999-07-14",
                                        "ssn": "12345",
                                        "gender": "Male",
                                        "phone_number": "123-1234-0000",
                                        "email": "mjordan@gmail.com",
                                        "language": "English",
                                        "race": "African American",
                                        "is_65_or_older": true,
                                        "is_veteran": false,
                                        "highest_education_completed": "College",
                                        "is_Employed": true,
                                        "drivers_license": "dfe36gf4",
                                        "is_getting_vaccine": true,
                                        "is_vaccinated": true,
                                        "vaccine_preference": "Pfizer",
                                        "address": {
                                        "Address": "124 Crescent",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "78304"
                                                }
                                        }
        PUT /api/clients/:clientID ============== edit a client by ID
                Request Body Example: {
                                        "first_name": "Michael",
                                        "last_name": "Jordan",
                                        "middle_name": "Ohw",
                                        "birthday": "1979-07-14",
                                        "ssn": "54321",
                                        "gender": "Male",
                                        "phone_number": "123-1234-0000",
                                        "email": "mjordan@gmail.com",
                                        "language": "French",
                                        "race": "African American",
                                        "is_65_or_older": true,
                                        "is_veteran": false,
                                        "highest_education_completed": "College",
                                        "is_Employed": true,
                                        "drivers_license": "dfe36gf4",
                                        "is_getting_vaccine": true,
                                        "is_vaccinated": true,
                                        "vaccine_preference": "Pfizer",
                                        "address": {
                                        "Address": "124 Crescent",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "78304"
                                                }
                                        }
        DELETE /api/clients/:clientID =========== delete a client by ID

### Organizations Routes

        POST /api/organizations ================= create a organization
                Request Body Example: {
                                        "organization_name": "Right",
                                        "organization_desc": "Supplier",
                                        "Address": {
                                        "Address": "3333 Estese",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "77007"
                                                }
                                        }
        GET /api/organizations ================== get all organization
        GET /api/organizations/:organizationID == get organization by ID
        PUT /api/organizations/:organizationID == update an organization by ID
                Request Body Example: {
                                        "organization_name": "Right",
                                        "organization_desc": "Manufacturer",
                                        "Address": {
                                        "Address": "7777 Bingle Rd",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "77736"
                                                }
                                        }
        DELETE /api/organizations/:organizationID delete an organization by ID

### Events Routes

        POST /api/events ======================== create new event
                Request Body Example: {
                                        "event_name": "Picnic Day",
                                        "event_description": "Picnic",
                                        "program_type": "Children Program",
                                        "date": "2020-04-20",
                                        "workers": "[]",
                                        "organization_id": "2",
                                        "address": {
                                        "Address": "2323 Green Dr",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "88045"
                                        },
                                        "clients": []
                                        }
        GET /api/events ========================= get all events
        GET /api/events/:eventID ================ get an event by ID
        PATCH /api/events/:eventID ============== update an event by ID
                Request Body Example:{
                                        "event_name": "Picnic Day",
                                        "event_description": "Family picnic with fun activities and foods!",
                                        "program_type": "Children Program",
                                        "date": "2020-04-20",
                                        "workers": "[]",
                                        "organization_id": "2",
                                        "address": {
                                        "Address": "2323 Green Dr",
                                        "City": "Houston",
                                        "State": "TX",
                                        "County": "US",
                                        "zip": "88045"
                                        },
                                        "clients": []
                                        }
        PATCH /api/events/:eventID/client/:clientID = add a client to an event
        PATCH /api/events/:eventID/worker/:workerID = add a worker to an event
        DELETE /api/events/:eventID ============= delete an event by ID

### Workers Routes

        GET /api/workers ======================== get all worker
        GET /api/workers/:workerID ============== get worker by ID
        POST /api/workers ======================= create new worker
                Request Body Example: {
                                        "first_name": "Khal",
                                        "last_name": "Drogo"
                                        }
        PUT /api/workers/:workerID ============== update a worker by ID
                Request Body Example: {
                                        "first_name": "Khalee",
                                        "last_name": "Drogonov"
                                        }
        DELETE /api/workers/:workerID =========== delete a worker by ID

### Activity Routes

        GET /api/activity/event/:eventID ======== get an activity for an event
        POST /api/activity ====================== Create an activity
                Request Body Example:{ 
                                        "client_id": "7",
                                        "event_id": "2",
                                        "time_spent": "10"
                                        }
                                       

### Health Routes

        POST /api/health ======================== create a health information for a client
                Request Body Example: {
                                        "client_id":"3" ,
                                         "has_Health_Insurance": "false",
                                         "has_Food_Stamps": "true",
                                         "food_Stamps_Amount":"450",
                                         "food_Stamps_Reason":"low income",
                                         "modify_At":"03-04-2022"
                                          }
                                          
                
        GET /api/health/:clientID =============== get health information for a client
        PATCH /api/health/:clientID ============= update health information for a client
                Request Body Example:  {
                                        "client_id":"3" ,
                                        "has_Health_Insurance": "true",
                                        "has_Food_Stamps": "true",
                                        "food_Stamps_Amount":"375",
                                        "food_Stamps_Reason":"low income",
                                        "modify_At":"03-04-2022"
    
                                        }

### Income Routes

        POST /api/income ======================== create a new income information for a client
                Request Body Example:{
                                        "client_id":"3e2dd300-9b8c-11ec-bea9-23b77b969694" ,
                                        "is_head_of_household": "true",
                                        "monthly_Income": "1800",
                                        "spousal_Support": "150",
                                        "work_comp": "5",
                                        "child_support": "225",
                                        "tanf": "700",
                                        "ssi": "330",
                                        "unemployment": "500",
                                        "social_Security": "5555",
                                        "other_Income": "50",
                                        "modify_At": "03-04-2022"
                                        } 
                
        PATCH /api/income/:clientID ============= update a income information for a client
        GET /api/income/:clientID =============== get an income information for a client

### External API Routes

        GET /api/external ======================= get all client data from external API
        GET /api/external/:first_name/:last_name/:phone_number
        ================= Get a client data from external API
        ================= that matches to the client's first name, last name, and phone number.

## III. Testing

       This part is to test our CRUD methods using postman. See the 'cis4339_project.postman_collection.json' file for 
       the full postman collection for all the routes.

### Images

![image](https://user-images.githubusercontent.com/66269867/156435756-cf28d3e7-537e-4984-ad2f-fa2463e8e03a.png)

![image](https://user-images.githubusercontent.com/66269867/156440957-272868cd-a170-41cc-8412-14f866ca697a.png)

![image](https://user-images.githubusercontent.com/66269867/156441171-2fb122a6-d474-4218-820f-c729e6088fcc.png)

![image](https://user-images.githubusercontent.com/66269867/156442251-0008484e-253b-4e53-9ddd-aa533d976448.png)

![image](https://user-images.githubusercontent.com/66269867/156442388-57d49f42-019e-467b-9940-ecf6ecc4f74b.png)

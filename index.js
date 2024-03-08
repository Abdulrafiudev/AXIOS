import express from "express";
import axios from "axios";

const app = express();
const port = 3000;


//TODO 1: Fill in your values for the 3 types of auth.
let your_username = "Abdulrafiu";
let your_password = 789602;
let your_api_key  = "8eed563c-abe9-4e72-94cd-a81d63b4d143";
let your_bearer_token = "64f71ad6-a877-4a52-b705-0d11f3e860f0";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    let response = await axios.get(`https://secrets-api.appbrewery.com/random`)
    let result = response.data
    let content = JSON.stringify(result)
    console.log(content)
    res.render(`index.ejs`, {content})

  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {error})
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try{
    let response = await axios.get(`https://secrets-api.appbrewery.com/all?page=2`, {
      auth: {
        username : your_username,
        password : your_password
      }
    })
    let result = response.data
    let content = JSON.stringify(result)
    console.log(content)
    res.render(`index.ejs`, {content})

  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {error})
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try{
    let response = await axios.get(` https://secrets-api.appbrewery.com/filter?score=5`, {
      params: {
       
        apiKey: your_api_key
      }
    })
    let result = response.data
    let content = JSON.stringify(result)
    console.group(content)
    res.render(`index.ejs`, {content})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {error})
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  try{
    let response = await axios.get(` https://secrets-api.appbrewery.com/secrets/42`, {
      headers:{
        Authorization: `Bearer ${your_bearer_token}`
      }
    })
    let result = response.data
    let content = JSON.stringify(result)
    res.render(`index.ejs`, {content})

  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {error})
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

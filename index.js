import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "zaid";
const yourPassword = "ILoveWeb";
const yourAPIKey = "1b4a893f-e7da-4f91-9a3a-49761b2ccaef";
const yourBearerToken = "c256d754-7c6e-4e0a-8053-c883603a30a7";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  
  try{
    const response=await axios.get(API_URL+"random");
    console.log(response.data);
    const jsonResponse=JSON.stringify(response.data);
    res.render("index.ejs",{content:jsonResponse});
  }
  catch(error)
  {
    res.status(404).send(error.message);;
  }
});

app.get("/basicAuth",async (req, res) => {
 try{
  const response=await axios.get(API_URL+"all",
  {
    auth:{
      username:yourUsername,
      password:yourPassword
     }
  }
  
   );
   const jsonResponse=JSON.stringify(response.data);
   res.render("index.ejs",{content:jsonResponse});
 }
 catch(error){
  res.status(404).send(error.message);
 }
 
});

app.get("/apiKey", async(req, res) => {
  
  try{
    const response=await axios.get(API_URL+`filter?score=5&apiKey=${yourAPIKey}`);
    const jsonResponse=JSON.stringify(response.data);
    res.render("index.ejs",{content:jsonResponse});
  }
  catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  
 try{
  const response=await axios.get(API_URL+"secrets/42",{
    headers:{
      Authorization:`Bearer ${yourBearerToken}`

    }
  })
  const jsonResponse=JSON.stringify(response.data);
  res.render("index.ejs",{content:jsonResponse});
 }
 catch(error){
  res.status(404).send(error.message);
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

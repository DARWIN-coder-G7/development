//This Server is hosted on http://localhost:8383  127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383;

let localDb = [];

let data = {
    res: "Dummy data as of now without DB",
    pages: [
        {
            Endpoints: {
                websiteEndpoints: 'returns an html or status codes or plain string',
                apiEndpoints: 'return an data as JSON',
            }
        }
    ]
};

//MiddleWare
app.use(express.json());


//can create both website Endpoints and API Endpoints
//ENDPOINT -- HTTP Verbs(or Methods)  && Routes (or Paths)

//The method informs the nature(type) of the request 
// and the route is a further subdirectory (basically we direct the request to the body of the code to
// respond appropriately, and these locations or routes are called as endpoints)

// TYPE 001 WEBSITE ENDPOINTS ::  blue color doc icon
// endpoint number 001 ---- /
app.get('/', (req, res) => {
    console.log("hey Endpoint got hit", req.method);
    // res.sendStatus(201);
    //can see created in browser
    console.log("will be in server only not in browser")
    res.send(`
        <body>
        <h1>Can Post Data to BackEnd</h1>
        <div>
        <label>Name</label>
         <input id="name"/>
        </div>
        <div>
        <label>Job</label>
         <input id="job"/>
        </div>
        <button type="button" id="post" >Post</button>
        <button type="button" id="delete"  >Delete Last One</button>
        <a href="/dashboard">DashBoard</a>
        </body>
<script>
const postbutton = document.getElementById('post');
postbutton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const job = document.getElementById('job').value;
    const postData = {
        name: name,
        job: job,
        userId: 1,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };
    fetch('http://localhost:8383/api/data', options) .then(response => {
 
    return response.json(); 
  })
  .then(data => {
    console.log('Success:', data); 
  })
  .catch(error => {
    console.error('Error during fetch:', error); 
  });
});
const deletebutton = document.getElementById('delete');
deletebutton.addEventListener('click', () => {
    fetch('http://localhost:8383/api/data', {method:'DELETE'}) .then(response => {
    return response.json(); 
  })
  .then(data => {
    console.log('Success:', data); 
  })
  .catch(error => {
    console.error('Error during fetch:', error); 
  });
});
</script>
        `)
});

app.get('/dashboard', (req, res) => {
    res.send(
        `<body style="background:aliceblue">
        <h1>An Html can be Returned</h1>
        <a href="/">HomePage</a>
        </body>
        <script>console.log("can be helpful to write our Api endpoint logics")</script>
        <script>console.log("This is the only console in browser  I mean this console will be in browser only will not be in server")</script>
        `
    );
});

// TYPE 002 API ENDPOINTS :: orange color Api icon
// CRUD  Create-post Read -get Update-post Delete-delete 
app.get('/api/data', (req, res) => {
    res.status(200).send(localDb);
});

app.post('/api/data', (req, res) => {
    localDb.push(req.body);
    res.sendStatus(201);
});

app.delete('/api/data', (req, res) => {
    localDb.pop(req.body);
    res.sendStatus(203);
});

app.listen(PORT, () => {
    console.log(`Server has started and Running Successfully on port number :${PORT}`)
});


# DevTinder

## Implementation

- Create a repository
- Initializa the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to a port
- Write request handlers '/test', '/hello'
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde
- Play with ROutes and route extensions ex: /hello, /, /hello2, /xyz
- Explore routing and use of ?, +, () , \* in the routes
- Use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes
- Play with route handlers - handling multiple routes
- next() function and errors along with res.send()
- What is middleware? Why do we need it?
- How Express JS basically handles requests behind the scenes?
- Difference between app.use and app.all?
- Error handling in using err in route handler or in middleware.
- Create a cluster in mongoDb official website. >> MongoDB Atlas
- Install mongoose library.
- Connect your application to the database <connection-url>/DevTinder
- Call the connectDB function and connect to database before starting application on port.
- Create a User schema.
- Create /signup api to add user data in mongodb.
- Difference between JSON and JS Objects
- Add the express.json() middleware.
- Make your signup api dynamic api from the end user.
- Make api /feed -> get all the users from the database.
- Create a delete User API. -> '/user'
- Update user data API. -> '/user'
- Schema Validations
- Add API level validations on /signup api
- Add API level validations on patch api
- Add validator library and use it for email and password validations
- Validate data in sign up api.
- Login API.
- Bcrypt for password store.
- JWT Auth token create and verify.
- Cookies set and recieved.
- Token expiry
- userAuth Middleware.
- Create schema method to getJWT()
- Read about indexes in mongoDB?
- Why do we need index?
- What is the advantages or disadvantages of creating indexes?
- Logical queries

## API List

### authRouter

- POST /signup
- POST /login
- POST /logout

### profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/paasword

### connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter

- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles for other users.

## Frontend

- Created a Vite + React Project & Remove unnecessary code.
- For Design using Tailwind CSS. https://v3.tailwindcss.com/docs/guides/vite
- DaisyUI -> Compatilble with Tailwind, Components UI. (Gives us Tailwind CSS UI) https://daisyui.com/docs/install/
- Add NavBar Component.
- Add Routing -> React Router.
- Create Outlet.
- Create Footer.
- Create Login Page.
- Install axios.
- Install cors, add middleware with configuration origin and credentials: true
- Making an api call, pass withCredentials: true
- Install Redux toolkit. (configure store, add provider in your app.js, create slice and export and add reducer to store)
- Login and see if your data is coming properly.
- Navbar should update as soon as user logs in.
- You should not be able to access other routes without login.
- If token is not present redirect user to login page.
- Logout
- Get the feed and build the userCard.
- Profile page
- Connections page
- Requests page - see all requests
- Sign up flow.
- Sent the connection requests.
- Accept and reject the requests.
- Testing all api's

## Deplyoment
- Sign up on AWS
- Launch instance
- Modify the permission in pem file: chmod 400 <secret>.pem
- Connect to your cloud machine using ssh command.
- Install Nodejs: Download and install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
- Install the same node version which you're using on local system nvm install 23.3.0
- Clone the project on the machine from github.
- Frontend Deplyoment
    - npm install , Installs the dependencies
    - Build the frontend project : npm run build & create a dist folder for your frontend (compiled code)
    - sudo apt update
    - sudo apt update install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist folder to  /var/www/html/
    - cd Frontend
    - sudo scp ~r dist/* /var/www/html
    - nginx host on port 80 and aws blocks all the ports, so enable port 80 of your instance.
    - AWS Instance > Security > Inbound Rules ans edit inbound rules and give access.
    - Now copy the public IP address from the instance and you load it, your frontend will load the application.
- Backend Deplyoment
    - Update DB password if required.
    - Allowed ec2 instance public IP on mongoDB server.
    - Install PM2 npm install pm2 ~g
    - pm2 start npm -- start //Start the process
    - pm2 logs -> To check the logs
    - pm2 flush npm -> Remove the logs (npm is the name of application)
    - pm2 stop npm -> Stop the application/process.
    - pm2 delete npm -> Delete the process
    - pm2 list
    - pm2 start npm  --name “backend” -- start // Start application behind the schenes with name backend.
    - Config ngnix: 
            server {
            listen 80;

            server_name yourdomain.com;

            location /api/ {
                proxy_pass http://localhost:3001/;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;

                # WebSockets support (if needed)
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
            }
        }
    - Now /api path should work.
    - Change the base_url from frontend to /api.
    - Push the code git hub , take the pull and redeploy frontend again.
    - Now frontend and backend should work.
- Adding custom Domain name
    - Purchased domain name from goDaddy.
    - Signup on cloudflare & Add a new domain name.
    - Change the name servers on goDaddy and point it to cloudflare.
    - Wait for sometime till your name servers are updated.
    - Edit the domain name with your IP with dns record (A record The most basic type of DNS record, which maps a domain name to an IP address.).
    - Now it's done , your IP is mapped to domain name.
    - Enable SSL on clouflare on website.
- Keeping Our Credentials Safe using .env file.
- Razorpay Payment gateway integration.
    - Signup on the Razorpay and complete KYC.
    - We will get the access of razorpay dashboard.
    - Go to the test mode.
    - Create UI for premium page.
    - Create /createOrder API on backend.
    - Added razzorpay and secret in env file.
    - Initialize razorpay.
    - Creating order on razorpay.
    - Created payment schema.
    - Saved the order in payment collection.
    - Make the API dynamic
    - Set up Razorpay webhook.
- Chat Feature (Real time communication | Websockets | Socket.io)
    - Build the UI of chat window on /chat/:targetUserId
    - Install socket.io
    - Set up Frontend socket.io-client
    - Intitialize the chat.
    - create socket connection.
    - Listen to events.
    - Add auth in websockets (Can't send messages , who is not my friend-> targetUserId and userId must be friends)
    - Build a feature show green symbol when online?- last seen feature





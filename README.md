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

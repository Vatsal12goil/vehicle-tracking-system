# Tracking System
## About
* This is a GPS based - Institutional vehicle tracking system.
* A new user can `Sign Up` as a `Driver`, `Admin`, `Student`, `Parent` or a `Teacher`.
	* When the user tries to signup using an already existing username, he/she is alerted with a message saying `An account with the same username already exists! Please try a different one`.
* An existing user can login using his `username` and `password`.
	* Incase the username or password is not valid, the user is redirected to a login failure page.
* When logged in, each of the users can view the route by filling in the Route Number form with their respective route number, given to them at the time of registration.
	** If the entered Route Number is invaild an alert message saying `The entered Route Number is invalid!` is displayed.
* The server keeps a track of the driver's location and updates others of his/her where abouts every 2 minutes.
* If the driver is not logged in, other users recieve an alert saying `Driver not logged in!!` and their maps centred at the location `lat : 0, long : 0`.
* When the driver is logged in the alert reads `Running...` for all the users logged in.
* The Admin can add routes to the database. The routes have a `Route Number`, a `source`, a `destination` and `waypoints` i.e. bus stop locations.
	* The Admin fills in all the details required, and can add waypoints by pressing the `Add Waypoints` button present on the page.
	* The `source`, `destination` and the `waypoints` are auto-complete boxes and the `admin` has to choose from the suggestions list to add a particular marker.
	* The route is displayed on the map in the right side panel as soon as the `source` and `destination` are selected.
	* The route updates as and when the `waypoints` are added.
	* If the Admin tries to reuse a `Route Number` he is prompted with `The route number already exists!` alert.
	* The `add` button pushes the particular route to the database, which can now be viewed by other users.
	* The `back` button redirects the admin to his accounts homepage.

## Installation and Execution
* `cd` into the project's directry.
* Replace my google maps API key with yours in these files:
	* `add_route.ejs`, `admin.ejs`, `student.ejs` and `driver.ejs`.
* Make the database directory to store the route and user information using :
	* `mkdir -p data/db`
* Install the npm packages required by using :
	* `npm install`
* Run the mongo deamon on port number `8081` using :
	* `mongod -port 8081 --dbpath data/db`
* Now run the server.js script on a separate terminal :
	* `node server.js`
* Open your browser and type in `localhost:8080` or `127.0.0.1:8080` to view the login/signup page.

## Contents
* The `views` folder contains the entire front-end part.
* The `app` folder contains the user and route database schema intitializing scripts and the `route.js` file which is responsible for catering to all the client requests.
* The `config` folder contains the passport.js script.
* `server.js` is the main node.js script linking all others to successfully run the website.
* The `screenshots` folder has some of the pictures of the website in action.
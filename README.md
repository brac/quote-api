# RESTful Routing Using Files

## Goal
### To create a RESTful API using Express which will store and access data in ```.json``` files.

**API Contract:**
| Method | URL               | Body Params                                  | Response                                                                                                    | Sample Response |
|--------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| GET    | /api/quotes/:id   | -                                            | Reads and returns contents of the file `<id>.json`, where `id` is the url parameter                         | {"quote": "Learn rules like a pro, so you can break them like an artist.", "author": "Pablo Picasso"} |
| POST   | /api/quotes       | {"quote": "`<quote>`", author: "`<author>`"} | Creates a file called `<next-id>.json`, where `<next-id>` is the next number available for unique filenames | {"message": "Successfully created the file 4.json"}                                                   |
| PUT    | /api/quotes/:id   | {"quote": "`<quote>`", author: "`<author>`"} | Updates the file `<id>.json`, where `<id>` is the number parsed from the url params                         | {"message": "Successfully updated the file 6.json"}                                                   |
| DELETE | /api/quotes/:id   | -                                            | Deletes the file `<id>.json`, where `<id>` is the number parsed from the url params                         | {"message": "Successfully deleted the file 7.json"}                                                   |


###Example Usage
```
POST /api/quotes
body: {"quote": "If you can't explain it simply, then you don't understand it well enough", author: "Einstein"}
=> Should `create` a file called `1.json` with the quote and the author inside the json file.
(Notice that the name of the file chosen was `1.json`. You will have to maintain a counter to keep track of the names of the files.)

GET /api/quotes/1
=> Should `read` and return the contents of the file `1.json`

PUT /api/quotes/1
body: {"quote": "If you can't explain it simply, then you don't understand it well enough", author: "Albert Einstein"}
=> Should `update` the contents of the file `1.md` with the contents specified in the body

DELETE /api/quotes/1
=> Should `delete` the the file `1.json`
```

####Initial thoughts:
The extened spec is to return a status of 404 if the id is not found. Sounds easy enough?

Since we will have to save our data in files we will use nodes built in ```fs``` module to read and write the files _asynchronously_.

We should remeber to abstract each function as much as possible, reducing it to only doing one thing when possible.

####Inital Plan:

* Express
  * listening:3000
* fs
  * triggered by routes
* Counter
  * let counter = 1
    * Used enviornment variable and nodemon config ignores
* Routes
  * GET
    * fs readFile
  * POST
    * fs writeFile
    * counter++
  * PUT
    * fs writeFile
  * DELETE
   * fs deleteFile(?)
* Middlewear
  * writeFile
  * readFile
* Error Handler
  * error.status || 500
  ? Use the following
```javascript
res.json({
  errors: [
    'Missing some property',
    'Missing some other property'
  ]
})
```
* Ensure specs are met
? Refactor



## Review
```package.json```
I went with a environment variable to keep track of the counter. In order to get that working with nodemon I removed the ```main``` entry and added a ```start``` entry in the scripts section. This way I was able to set the environment variable when launching the app with nodemon:
```json
"start": "CNTR=1 node app.js",
```
Of note, I found that nodemon would reset the app whenever a new file was written within the directory structure. I was able to add a ```nodemonConfig``` entry that takes an array of key value pair which can _ignore_ certain folders. This way I was albe to write files and maintain the counter without having the app restart through nodemon:
```json
"nodemonConfig": {
    "ignore": ["quotes/*", "README.md"]
```

```app.js```
This is where I started, by bootstrapping the app and getting something that I could play with.

Our dependencies were express, our routes and bodyParser. I set the standard bodyParser config for json, registered the api routes as well as a root route. I used these basic routes to at first confirm the basic functionality and then built on top of that.

Before starting the server I wrote a basic error handler, based off the express documentation.
```javascript
// Error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    console.log('Headers have already been sent \nPassing to default error handler')
    return next(error)
  }

  res.status(error.status || 500).json({
    errors: [{ message: error.message }]
  })
})
```
Ok so this guy is defined after all our other routes and middle wear. It takes 4 params, which is the key for getting express to recognize this ```.use()``` call as an error handler.

Now two things go down in this. First, if the hearders have already been sent, we log such to the console and then ```return next(error)```. When ```next(error)``` get's called and there is no other error handler to catch the error, then Express will use it's default error handler. Maybe not to be used in production but a proof of concept.

Secondly, if the previous check was false, then we set the status code of the response object, which will take whatever the status of the error already is, or lacking that, 500 as a standard internal server error. Then we ```.json()``` call that with a ```error``` key, which has a value of an array that returns the error message. This seemed to work well.

```quotes.js```
This file is our routes that I wrote for the standard CRUD operations in a RESTful design. Following the patterns I've seen in previous tutorials and readings I had the actual file minapulation be handled in another module, ```../helpers.js``` and used the quotes file handle calling the appropriate quote read/write function.

So, our dependencies are express, from which we instantiate a router. We also require all the file manipulation functions that we will need.

So first up we have our ```router.route('/')``` and we define our ```.get()``` and ```.post``` methods. Worth nothing is that after we call our ```writeQuote()``` function, which returns a promise, we increment up our couter which is really just an environment variable.

Also look how nice our success / fail callbacks are at the end of our promises. There seems to be much variation in formatting when writting these promise chains, this is Jared's recommendation so I'm going with that.

Things are pretty straight forward here, olny our ```.post``` has anything different, and not much at that.

```helpers.js```
Finally, our helpers file. This module handels the actual file minipulation, as well as some logic for determining if a file is in place or not. This is our most complicated module, and perhaps we could refacort this into sepearte files.

Anyway, let's look at these functions.

#### readQuote(id)
This is our basic reader function. This function as with all of them we return a new Promise. We do this because this is an asynchronous operation we are doing so we need to account for that and promises are nice.

So, within this promise we call our ```fs.readFile``` and pass it the file location. This guy doesn't do promises so we handle it with callbacks. If we get an error during that read then we set the status to 404. This is probably not so great but for our purposes it's ok. We also set a message and then ```return reject(error)``` to send the error up the stack to our error handler.

#### readQuote(reqBody,id)
Here we parse some data from the reqBody just for ease of reading, then we stringify that data so it can be written.

Now this is a little tricky, We plan on using this function for either updating or creating a new quote record. So we had to define our counter, which will also be our file name, _conditionally_. If id is undefined, then we pull the value from ```process.env.CNTR```, if it's not then we just use whatever that was passed. This way we can use this function for our ```updateQuote()``` without having to retype code.

Moving on, we then call our ```fs.writeFile()```, pass it the file name the data and again handle any error / resolve a success message.

#### updateQuote(reqBody, id)
Alright so right off we fire our previous function, ```readQuote(id)```. Assumed we don't get an error which would be rejected, we had to do something a little tricky. We loop through the keys in ```reqBody```, and assign each key/value pair to the results that came from our ```readQuote()``` call. This way, no matter which or how many properties were provided by the user, we will only loop through the object the minimum number of times needed to get the new data. Nice.

After that we just write our new quote with our ```writeQuote()``` function, handle any errors and resolve a success message.

#### deleteQuote(id)
Ok so for this guy we first try to read the file. If we get an error than we are assume it is because the file was not found. That may not be right but for this it's fine.

Now for our success callback after ```readQuote()``` we just ```fs.unlink()``` the correct file, handle any errors and resolve a success message.

Boom cha-kaow

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
- Routes
  * GET
    * fs readFile
  * POST
    * fs writeFile
    * counter++
  - PUT
    - fs writeFile
  - DELETE
   - fs deleteFile(?)
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
- Ensure specs are met
- Refactor




















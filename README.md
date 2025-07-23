### Test Flask app for that inital project Tereko asked me to do

###### For the nginx to serve the SwaggerUI:

- npm run build on the frontend. this creates a _/dist_ folder in frontend
- past the _/documentation_ and _/static_ folder into this _/dist_ folder
- go into the nginx file and use `start nginx`
- go into /backend and `python app.py` to start backend
- **boom.** reverse proxy.

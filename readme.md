Priotix

Clone Project from github

Create database with name "priotix" for production and "priotix_dev" for development and testing.

Run "npm run create-dev-db" to create tables and seed.

Run "npm run compile" to compile typescript code.

Run "npm run start-dev" to run Project on development mode.


Endpoints

All endpoits starting with localhost:3001/api/v1

all auth endpoints starting with /auth

GET /get-csrf

POST /sign-in
    body {email, password}
    header {Authorization: `Basic ${base64.encode("email:password")}`}

POST /sign-out
    authorization header with jwt token

PUT /refresh-token
    refreshToken in cookies
    authorization header with jwt token


all user endpoints starting with /user

create user
POST /
    body {first_name, last_name, email, password}
    authorization header with jwt token

update user
PATCH /:id
    body {first_name?, last_name?, email?, password?}
    params {id}
    authorization header with jwt token

delete user
DELETE /:id
    params {id}
    authorization header with jwt token


assign device
POST /:id/:device_id
    params {id, device_id}
    authorization header with jwt token

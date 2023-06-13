# C23-PS223 | Cloud Computing | UrMood

# Table of Contents

1. About
2. Tools
3. Contact
4. How to deploy
5. API documentation


# About
UrMood is an application to detect user depression level with PSS-10 (Perceived Stress Scale) based test and giving some tips, article, and online consultation.
This API was deployed using Google Cloud Run service which connected to Google Cloud SQL database.
This repository contains 3 branches:

1. Main, this branch contains the API auth for register, log in, log out, and get user data.
2. Article, this brach contans the API for article and tips fiture.
3. Service, this branch contans the API for save user's answer and give consulting service contacts for depression test fiture.

# Tools

1. Node.js: v18.13.0
2. Google Cloud Platform
3. Postman (testing the API endpoints)

# Contact
For further information:

1. laninastrid@gmail.com (Lanina Astrid Chrysant Vrij)
2. zsalsabilla1104@gmail.com (Zahra Salsabilla)

# How to deploy
To use these endpoint, you should deploy the API using Cloud Run and connect it to Cloud SQL in Google Cloud Platform.
Here are some steps to deploy it:
1. Clone all the branch (Main, Article, and Service) form repo
2. Create Cloud SQL database
3. Set up all the requirement environment variable (check the connection.js)
4. Build the container image using Dockerfile
5. Deploy the container image to Cloud Run
6. Test the connection by clicking on the endpoint link

# Documentation
Read the details of API documentation on:
https://documenter.getpostman.com/view/26401567/2s93mBwJSP


Mapify App
-
This web application calculates the sentiment of tweets. Based on the value obtained, it displays their coordinates on a world canvas in three different colors: green (positive), red (negative), yellow/orange (neutral).

Features
-----

 Zoom In/Out of canvas
 Sentiment Calculator
 Geo-location Scale
 Twitter API Stream

This project used Twitter's API

Deployed using Heroku


Installation
--
Ensure that _mongo_ is installed on your machine. [Instructions here](http://docs.mongodb.org/v2.4/tutorial/install-mongodb-on-os-x/)

Seed your local mongo database with some data in the backup folder

Required Tokens to do so :
>TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET
TWITTER_API_KEY
TWITTER_API_SECRET

Run `npm install` for all the dependencies.

Run `npm start`

Node is set up to use an environment variable _PORT_ , so you'd need to export it like: ` echo export "PORT=3000" >> ~/.bash_profile`


Cross-Origin Resources (CORS)
-
If you're hosting this application on the same domain that stores your tweets , then congratulations! You have no problems. However, if you're going through a CDN, then you'll probably encounter some cross-domain security issues; at which time you have two options:

Follow this excellent [MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) about configuring "Access-Control-Allow-Origin" headers. You'll need to enable these headers on your CDN, at which time the Mapify app should be able to request images from it.

Another work-around that solves this problem:

 1. Download and Install an _Allow-Control-Allow-Origin_ [Chrome Add-on](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)
 2. Enable Cross-origin resource sharing everytime you run

----------


Contributing
-
[![Stories in Ready](https://badge.waffle.io/adrianw1832/mapify.png?label=Ready&title=Ready)](http://waffle.io/adrianw1832/mapify)
 1. Create your feature branch (`git checkout -b my-new-feature`)
 2. Commit your changes (`git commit -am 'Add some feature'`)
 3. Push to the branch (`git push origin my-new-feature`)
 4. Create a new _Pull Request_

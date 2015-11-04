Mapify App
-
This is the final project from the final two weeks of the Makers Academy course.

This web application plots all the tweets based on the user's search term. It
plots them based on the location where the tweet came from and it also
calculates the sentiment of the tweets. Based on the value obtained, it displays
them on the canvas in red, green or yellow colour.

Live Version deployed with Heroku and MongoLab [here](https://mapifyapp.herokuapp.com/)

 Features
-----
 - Zoom In/Out of canvas
 - Sentiment Calculator
 - Geo-location Scale
 - Twitter API Stream

Installation
--
Ensure that _mongo_ is installed on your machine and seed it with some data. [Instructions here](http://docs.mongodb.org/v2.4/tutorial/install-mongodb-on-os-x/)

Run `npm install` for all the dependencies.

Node is set up to use an environment variable _PORT_ , so you'd need to export it like: ` echo export "PORT=3000" >> ~/.bash_profile`

Run `npm start`


Cross-Origin Resources (CORS)
-
If you're hosting this application on the same domain that stores your tweets , then congratulations! You have no problems. However, if you're going through a CDN, then you'll probably encounter some cross-domain security issues; at which time you have two options:

Follow this excellent [MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) about configuring "Access-Control-Allow-Origin" headers. You'll need to enable these headers on your CDN, at which time the Mapify app should be able to request images from it.

Another work-around that solves this problem:

 1. Download and Install an _Allow-Control-Allow-Origin_ [Chrome Add-on](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)
 2. Enable Cross-origin resource sharing every time application data is served through CDN and running from local.

Technologies used
--
Javascript, jQuery, Mongo, Express, Node, HTML5 Canvas

Jasmine, Mocha/ Chai

----------

Contributing
-
[![Stories in Ready](https://badge.waffle.io/adrianw1832/mapify.png?label=Ready&title=Ready)](http://waffle.io/adrianw1832/mapify)
 1. Create your feature branch (`git checkout -b my-new-feature`)
 2. Commit your changes (`git commit -am 'Add some feature'`)
 3. Push to the branch (`git push origin my-new-feature`)
 4. Create a new _Pull Request_

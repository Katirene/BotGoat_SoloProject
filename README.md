#BotGoat - Prime Academy Solo Project

##TEAN Stack Application
```
	* Twitter
	* ExpressJS
	* AngularJS
	* NodeJS
```

##Project Purpose
To fulfill my desire to work with automation an develop withing the bounds of technical limitation, I chose as my Solo project to expand on my passion for bots and build a UI configuration for a Twitter Bot.

##Available Tweeting Modes

- Set tweets based on a time schedule.  All time based modes are in Cron format.
- Listen for a specifc hashtag in the twitter stream and responsed with a predetermined status.
- Listen for an @ mention in the twitter stream and respond with a predetermined status.



##Installation
```
1. NPM install
2. Include at root directory your own .env file with your own consumer keys, secrets and API keys.
3. Replace the {track: '@BotGoatBasics'} on line 205 in posttime.js with your own twitter handle 
   so that the application listens for an @ mention of your own bot.
```

###Future Expansion
1. Passport will be integrated.
2. App will be modified so that multiple users can manage and configure their bots from BotGoat.  Hosting and Deployment would shift from user to application.

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
- Listen for a specific hashtag in the twitter stream and responded with a predetermined status.
- Listen for an @ mention in the twitter stream and respond with a predetermined status.


##Installation
```
1. NPM install
2. Include at root directory your own .env file with your own consumer keys, secrets and API keys.
3. Replace the {track: '@BotGoatBasics'} on line 205 in postTime.js with your own twitter handle
   so that the application listens for an @ mention of your own bot.
```

###Future Expansion
1. Passport will be integrated.
2. App will be modified so that multiple users can manage and configure their bots from BotGoat.  Hosting and Deployment would shift from user to application.

###BotGoat 2.0
Project will be reimagined and rewritten in Go.
1. Users will register and login with Google Auth
2. Users will supply there own secrets they generate.
3. Users will configure one off bots
4. And e-mail will be sent to their Gmail with a link that will start a script and run the bot in their Google Drive Spreadsheets.
5. App will be modified so that multiple users can manage and configure their bots from BotGoat.  Hosting and Deployment would shift from user to application.


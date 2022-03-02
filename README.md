# Agenda - NodeJS and MongoDB
Agenda made with NodeJS and MongoDB.
You can see and test it (deployed on my AWS server) - [Agenda](https://agendanodejs.sytes.net/)

## Table of Contents
* [General Info](#general-information)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)


## General Information

This Agenda project was made with the purpose of developing a platform where each person can have their personal contacts saved and that they can access anywhere.

## Setup
To run this Agenda project in your machine, you need to download and unzip the code. If you don´t have NodeJS, you need to [install it first](https://nodejs.org/en/).

First of all, you need to go on [MongoDB](https://www.mongodb.com/) website and register on MongoDB Atlas. After you have an account in MongoDB Atlas, you need to make a cluster. You can see how to do that in google, it´s easy to do.

Next you need to create a file named '.env' in your project folder with the following:
```
CONNECTIONSTRING=mongodb+srv://YOURUSERNAME:YOURPASSWORD@cursojs.ifpiy.mongodb.net/DATABASENAME?retryWrites=true&w=majority
```
You need to replace 'YOURUSERNAME', YOURPASSWORD and DATABASENAME for your credentials. MongoDB Atlas gives you that string with your credentials already filled.

After that, you need do run the following command to install all dependencies:
```
npm i
```
To run this app in you local machine, you need to run this command to run a local server:
```
npm start
```
Now, you can test it in your [localhost]('http://localhost:3000/')

If you change anything in frontend folder, you need to run Webpack (generate a javascript file to ensure that javascript runs in all browsers).
To run Webpack:
```
npm run dev
```

## Usage



## Contact
If you have any question, feel free to [contact me](https://www.linkedin.com/in/lu%C3%ADs-costa-793a2414b/)


# 4 Devs 1 Game - [Brackets]

![image](https://user-images.githubusercontent.com/25436568/140655196-48a430b1-4fc0-484a-948c-5c6c406f136f.png)

* [Features](#features)
* [Usage](#usage)
  + [Setup](#setup)
  + [Login](#login)
* [Third-party Libraries](#third-party-libraries)

## Features
[Brackets] is a tournament management software which allows users to join, participate in, and organize tournaments.

## Usage
### Setup
[Brackets] is a React app. Hence, you will need `npm` installed locally to run the React development server. To start it:
```
git clone https://github.com/csc309-fall-2021/team05.git
cd team05/frontend
npm install         # Install all dependencies locally
npm start           # Start dev server
```
At this point, the dev server should automatically redirect you to the localhost URL. By default, this is http://localhost:3000/

### Login
Currently, login is supported for two users. They are
* Username `user`, password `user` for a generic user account.
* Username `admin`, password `admin` for a generic admin account.

### User's Experience 
Upon start up of the development server, the user is presented with the landing page. From here the user can either log in or register. Registering at the current moment is just a form that captures data, no real functional registering can be done without a backend so proceed to loggin in with the mock accounts.

1. Proceed to the login button on the top right of the navbar.
2. Enter credential Username `user`, Password `user` for the user account.

Two options on the navbar are now present, the user's dashboard where they can mange all their tournaments and the user's profile information.

For profile updates:
1. Click on the profile tab to enter the user's profile
2. Here fields can be changed to update the user's information. Since this is mocked static data, no actual changes are made to the user's account.

Attending Tournaments:

1. Navigate to the dashboard tab
2. Click on Join a tournament
3. Presented are list of tournaments that are open.
4. User can navigate through each of these tournaments and view the current members, etc..
5. Joining functionality is not available as a server call will be required to add the user to the proper tournament.




## Third-party Libraries
[Brackets] uses the following third-party libraries:
1. React
2. Material UI

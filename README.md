# 4 Devs 1 Game - [Brackets]

![image](https://user-images.githubusercontent.com/25436568/140655196-48a430b1-4fc0-484a-948c-5c6c406f136f.png)

* [Features](#features)
* [Usage](#usage)
  + [Setup](#setup)
  + [User Instructions](#user-instructions)
    - [Registration](#registration)
    - [Login](#login)
    - [Profile updates](#profile-updates)
    - [Attending Tournaments](#attending-tournaments)
    - [Starting/Ending/Updating Tournaments](#startingendingupdating-tournaments)
    - [Creating a new Tournament](#creating-a-new-tournament)
  + [Admin Instructions](#admin-instructions)
    - [Login](#login-1)
    - [Admin Dashboard activities](#admin-dashboard-activities)
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

### User Instructions
#### Registration
1. Click the login button on the top right of the navbar.
2. Enter the required information into the form, then click `Register` to create a new account. At this time, no users will be created, since a backend is required.

#### Login
1. Click the login button on the top right of the navbar.
2. Enter `user` for username and `user` for password to log in to the user account.

#### Profile updates
Log in as a user first. Then,
1. Click on the profile button in the navbar.
2. Enter your new details in the fields. 
3. Enter the current password `user` to have the changes be accepted. Since this functionality requires a backend, it is not currently implemented.

#### Attending Tournaments
Log in as a user first. Then,
1. Click on the dashboard button in the navbar.
2. Click on `Join a Tournament` under 'Current Tournaments (attending)'. A list of tournaments to join will be presented.
3. Click on the `View Event Details` button of a tournament to see more information about it, such as the host, number of members, etc.
4. Click on `Join Event` to join the tournament. Currently, this is not implemented as a backend is required.

#### Starting/Ending/Updating Tournaments
Log in as a user first. Then,
1. Click on the dashboard button in the navbar.
2. Click on the `View Event Details` button of a tournament listed under 'Current Tournaments (hosting)'.
3. Click on the `Start Tournament` button to start the tournament.
4. If a tournament is ongoing, click the `End Tournament` button to end it.
5. At any time, click the `Update The Tournament` button to change the description of the tournament.

#### Creating a new Tournament
Log in as a user first. Then,
1. Click on the dashboard button in the navbar.
2. Click on the `Create a Tournament` button under 'Current Tournaments (hosting)'.
3. Fill in the presented form with the required parameters, then click `Create` to make the new tournament.

### Admin Instructions
#### Login
1. Click the login button on the top right of the navbar.
2. Enter `admin` for username and `admin` for password to log in to the user account.

#### Admin Dashboard activities
On the admin dashboard, one can manage all registered users, view all current, past, ongoing, and tournaments yet to start, as well as logs of all user activities.
1. Click the `Admin Dashboard` button in the navbar.
2. To manage users, click the `Manage Users` button. This will bring up a page where individual users can be banned or unbanned by clicking the `Ban Player` button.
3. To view all tournaments, those which are ongoing, and those yet to start, click the corresponding button in the `Tournaments` card.
4. To view past tournaments and user logs, click the corresponding button in the `Archive` card.

In addition to these, the admin can do all the activites that the user can do. See the [User Instructions](#user-instructions) section for more details. The only things admins cannot do that users can do is register for an account; admin account creation will be handled by the system administrator of the server.

## Third-party Libraries
[Brackets] uses the following third-party libraries:
1. React, as the web framework 
2. Material UI, for a consistent and clear user interface
3. `react-brackets`, for rendering tournament brackets

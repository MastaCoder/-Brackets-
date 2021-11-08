# 4 Devs 1 Game - [Brackets]

![image](https://user-images.githubusercontent.com/25436568/140655196-48a430b1-4fc0-484a-948c-5c6c406f136f.png)

- [Features](#features)
- [Usage](#usage)
  - [Setup](#setup)
  - [Login](#login)
- [Third-party Libraries](#third-party-libraries)

## Features

[Brackets] is a tournament management software which allows users to join, participate in, and organize tournaments. The feature set vary differently for regular users and admins.

Users are able to perform various different things in the website. Firstly, users are able to login/logout and update their account information. Although there is no proper authentication currently, the view for reseting password and other information is implemented. Users can create tournaments themselves, view any previously hosted tournaments and view previously attended events. For events that they have created, there are a few settings that allow you to start/end tournaments and update tournament information. Users can view the event details and teams with other registered users to the event and view the tournament bracket.

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

- Username `user`, password `user` for a generic user account.
- Username `admin`, password `admin` for a generic admin account.

## Third-party Libraries

[Brackets] uses the following third-party libraries:

1. React
2. Material UI

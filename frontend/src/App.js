import ProvideAuth from "./components/Authentication/ProvideAuth";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./views/Profile/ProfilePage";
import HomePage from "./views/Home/HomePage";
import LoginPage from "./views/Login/LoginPage";
import RegisterPage from "./views/Register/RegisterPage";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./views/Dashboards/AdminDashboard/AdminDashboard";
import UserDashboardPage from "./views/User/Dashboard/UserDashboardPage";
import UserHistoryPage from "./views/User/History/UserHistoryPage";
import UserJoinPage from "./views/User/Join/UserJoinPage";
import OrganizerCreatePage from "./views/Organizer/Create/OrganizerCreatePage";
import OrganizerHistoryPage from "./views/Organizer/History/OrganizerHistoryPage";
import AdminViewUserPage from "./views/Admin/Users/AdminViewUsers";
import AdminViewUserLogs from "./views/Admin/Archive/AdminViewUserLogs";
import DataContext from "./contexts/dataContext";
import data from "./data/data";
import { useState } from "react";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6984E1",
      },
    },
  });

  const dataState = useState(data);

  return (
    <DataContext.Provider value={dataState}>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <PrivateRoute exact path="/settings">
                <ProfilePage
                  username="user"
                  email="user@user.com"
                  password="user"
                />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard">
                <AdminDashboard />
              </PrivateRoute>
              <PrivateRoute exact path="/admin/users">
                <AdminViewUserPage />
              </PrivateRoute>
              <PrivateRoute exact path="/admin/userLogs">
                <AdminViewUserLogs />
              </PrivateRoute>
              <PrivateRoute exact path="/user">
                <UserDashboardPage />
              </PrivateRoute>
              <PrivateRoute exact path="/user/history">
                <UserHistoryPage />
              </PrivateRoute>
              <PrivateRoute exact path="/user/join">
                <UserJoinPage />
              </PrivateRoute>
              <Route exact path="/org/create">
                <OrganizerCreatePage />
              </Route>
              <Route exact path="/org/history">
                <OrganizerHistoryPage />
              </Route>
              <Route exact path="/tournament/:id">
                {/* Add your Tournament view here */}
              </Route>
              {/*<PrivateRoute exact path="/user">*/}
              {/*  <Dashboard />*/}
              {/*</PrivateRoute>*/}
            </Switch>
          </Router>
        </ThemeProvider>
      </ProvideAuth>
    </DataContext.Provider>
  );
}

export default App;

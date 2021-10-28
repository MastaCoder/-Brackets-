import Button from "../../../components/Button/Button";
import Styles from "./AdminDashboard.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    userCount: 1103,
    activeTournaments: 2,
    totalTournaments: 40,
  });
  const [bannedUsers, setBannedUsers] = useState([
    { username: "BigGuy49", offence: "being too good" },
    { username: "SmallGuylittle", offence: "being too good" },
    { username: "Chickenlittle72", offence: "being too good" },
    { username: "Cowslayer1337", offence: "being too good" },
    { username: "LittleBoi42", offence: "being too good" },
  ]);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Admin Dashboard</h1>

      <div style={{ margin: "0 4rem" }}>
        <div>
          <h4>Website Stats</h4>
          <p>{stats.userCount} registered users</p>
          <p>{stats.activeTournaments} active tournaments</p>
          <p>{stats.totalTournaments} total tournaments</p>
        </div>

        <br></br>
        <div>
          <h4>Banned Users</h4>
          <ul style={{ paddingLeft: "2rem" }}>
            {bannedUsers.slice(0, 4).map((user, index) => {
              return <li key={index}>{user.username}</li>;
            })}
          </ul>
          {bannedUsers.length > 4 && <Link to="/">View More</Link>}
        </div>

        <br></br>
        <div>
          <h4>Archive</h4>
          <div>
            <Button className={Styles.btn}>User Logs</Button>
            <Button className={Styles.btn}>Past Tournaments</Button>
          </div>
        </div>

        <br></br>
        <div>
          <h4>User Options</h4>
          <Link to="/profile" style={{textDecoration: "none"}}>
            <Button className={Styles.btn}>Edit User Settings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

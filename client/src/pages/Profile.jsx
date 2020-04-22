import React, { useContext } from "react";
import UserContext from "context/UserContext";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Portal,
  Snackbar,
} from "@material-ui/core";
import useStyle from "pages/Profile.css";

import MainContainer from "components/MainContainer";

const Profile = () => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  return (
    <MainContainer>
      {console.log(user)}
      <div className={classes.MainWrapper}>
        <div className={classes.gridRow1}>
          <div className={classes.userAvatar}>
            <Avatar src={user && user.image} />
          </div>
          <Typography className={classes.userName}>{user.name}</Typography>
          <Typography className={classes.title}>{user.title}</Typography>
        </div>

        <div className={classes.gridRow2}>
          <div>
            <Typography className={classes.text}>{user.years}</Typography>
            <Typography className={classes.text}>
              Years of Experience
            </Typography>
          </div>
          <div>
            <Typography className={classes.text}>24</Typography>
            <Typography className={classes.text}>Reviews</Typography>
          </div>
          <div>
            <Typography className={classes.text}>4.8</Typography>
            <Typography className={classes.text}>Ratings</Typography>
          </div>
        </div>

        <div className={classes.gridRow3}>
          {user.experience.map((exp) => (
            <div>
              <Typography className={classes.text}>{exp.language}</Typography>
              <Typography className={classes.text}>{exp.level}</Typography>
            </div>
          ))}
        </div>

        <div className={classes.gridRow4}>
          <div className={classes.text}>some content</div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Profile;

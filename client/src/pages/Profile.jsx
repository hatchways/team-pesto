import React, { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import axios from "axios";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Portal,
  Snackbar,
} from "@material-ui/core";
import { getToken } from "utils/storage";
import useStyle from "pages/Profile.css";

import MainContainer from "components/MainContainer";

const Profile = (props) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    years: "",
    experience: [],
  });

  useEffect(() => {
    const getProfile = async (id) => {
      try {
        const { data } = await axios.get(`/api/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    getProfile(props.match.params.id || user.id);
  }, []);

  console.log(profile);

  return (
    <MainContainer>
      <div className={classes.MainWrapper}>
        <div className={classes.gridRow1}>
          <div className={classes.userAvatar}>
            <Avatar src={profile && profile.image} />
          </div>
          <Typography className={classes.profileName}>
            {profile.name}
          </Typography>
          <Typography className={classes.title}>{profile.title}</Typography>
        </div>

        <div className={classes.gridRow2}>
          <div>
            <Typography className={classes.text}>{profile.years}</Typography>
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
          {profile.experience.map((exp) => (
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

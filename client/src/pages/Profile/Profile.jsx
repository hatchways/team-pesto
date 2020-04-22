import React, { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import axios from "axios";
import { Typography, Avatar, Portal, Snackbar } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { getToken } from "utils/storage";
import useStyle from "pages/Profile/Profile.css";
import MainContainer from "components/MainContainer";
import EditProfile from "pages/Profile/EditProfile";

const Profile = (props) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);

  const [showEditOption, setShowEditOption] = useState(true);
  const [open, setOpen] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState("");
  const [experience, setExperience] = useState([]);
  const [image, setImage] = useState("");

  const [editedName, setEditedName] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYears, setEditedYears] = useState("");
  const [editedExperience, setEditedExperience] = useState([]);
  const [editedImage, setEditedImage] = useState("");

  useEffect(() => {
    const getProfile = async (id) => {
      try {
        const { data } = await axios.get(`/api/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        setProfileId(data["_id"]);
        setName(data.name);
        setTitle(data.title);
        setYears(data.years);
        setExperience(data.experience);
        setImage(data.image);

        setEditedName(data.name);
        setEditedTitle(data.title);
        setEditedYears(data.years);
        setEditedExperience(data.experience);
        setEditedImage(data.image);
      } catch (err) {
        console.error(err);
      }
    };

    getProfile(props.match.params.id || user.id);
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "title":
        setEditedTitle(value);
        break;
      case "years":
        setEditedYears(value);
        break;
      default:
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setName(editedName);
    setTitle(editedTitle);
    setYears(editedYears);

    try {
      await axios.put(
        "/api/users/me",
        {
          id: profileId,
          name: editedName,
          title: editedTitle,
          years: editedYears,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContainer>
      <form className={classes.MainWrapper}>
        <div className={classes.gridRow1}>
          <div className={classes.userAvatar}>
            <Avatar src={image} />
          </div>
          <Typography className={classes.profileName}>{name}</Typography>

          <Typography className={classes.title}>{title}</Typography>

          <div
            className={classes.editHeader}
            style={showEditOption ? { display: "block" } : { display: "none" }}
          >
            <EditIcon className={classes.editIcon} onClick={handleClickOpen} />
          </div>
        </div>

        <div className={classes.gridRow2}>
          <div>
            <Typography className={classes.text}>{years}</Typography>

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
          {experience.map((exp) => (
            <div>
              <Typography className={classes.text}>{exp.language}</Typography>
              <Typography className={classes.text}>{exp.level}</Typography>
            </div>
          ))}
        </div>

        <div className={classes.gridRow4}>
          <div className={classes.text}>some content</div>
        </div>
      </form>

      <EditProfile
        open={open}
        onClose={handleClose}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        name={editedName}
        title={editedTitle}
        years={editedYears}
        experience={editedExperience}
        image={editedImage}
      />
    </MainContainer>
  );
};

export default Profile;

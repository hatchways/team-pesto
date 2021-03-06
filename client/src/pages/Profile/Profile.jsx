import React, { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import axios from "axios";
import { Typography, Avatar, Portal, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";

import { getToken } from "utils/storage";
import socket from "utils/socket";
import useStyle from "pages/Profile/Profile.css";
import MainContainer from "components/MainContainer";
import EditProfile from "pages/Profile/EditProfile";
import ImageUpload from "pages/Profile/ImageUpload";

const Profile = (props) => {
  const classes = useStyle();
  const { user } = useContext(UserContext);

  const [showEditOption, setShowEditOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [profileId, setProfileId] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState("");
  const [reviews, setReviews] = useState(0);
  const [totalRatingsScore, setTotalRatingsScore] = useState(0);
  const [experience, setExperience] = useState([]);
  const [image, setImage] = useState("");

  const [editedName, setEditedName] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYears, setEditedYears] = useState("");
  const [editedExperience, setEditedExperience] = useState([]);
  const [editedImage, setEditedImage] = useState("");

  const getProfile = async (id) => {
    try {
      const { data } = await axios.get(`/api/users/profile/${id}`);

      const { profile } = data;

      if (profile["_id"] === user.id) {
        setShowEditOption(true);
      }

      setProfileId(profile["_id"]);
      setReviews(profile.totalRatings);
      setTotalRatingsScore(profile.totalRatingsScore);
      setName(profile.name);
      setTitle(profile.title);
      setYears(profile.years);
      setExperience(profile.experience);
      setImage(profile.image);

      setEditedName(profile.name);
      setEditedTitle(profile.title);
      setEditedYears(profile.years);
      setEditedExperience(profile.experience);
      setEditedImage(profile.image);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile(props.match.params.id || user.id);

    socket.subscribe("profile", (data) => {
      const { type, payload } = data;
      switch (type) {
        case "new-image":
          setImage(payload);
          return;
        default:
      }
    });

    // useEffect returns a callback for unsubscribing when it unmounts
    return () => socket.unsubscribe();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

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

  const handleAvatarClickOpen = () => {
    setAvatarOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAvatarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      editedExperience.some((obj) => obj.language === "" || obj.level === "")
    ) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "No empty input fields allowed.",
      });
    } else if (editedExperience.length === 0) {
      setSnackbar({
        open: true,
        severity: "warning",
        message: "You must select at least one language.",
      });
    } else {
      setName(editedName);
      setTitle(editedTitle);
      setYears(editedYears);
      setExperience(editedExperience);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Profile updated!",
      });

      try {
        await axios.put(
          "/api/users/me",
          {
            id: profileId,
            name: editedName,
            title: editedTitle,
            years: editedYears,
            experience: editedExperience,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        handleClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const options = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    cpp: "C++",
    ruby: "Ruby",
  };

  const levels = {
    0: "Beginner",
    1: "Intermediate",
    2: "Advanced",
  };

  return (
    <MainContainer>
      <form className={classes.MainWrapper}>
        <div className={classes.headerWrapper}>
          <div className={classes.subHeaderWrapper}>
            <div className={classes.avatarWrapper}>
              <Avatar
                className={
                  showEditOption
                    ? `${classes.userAvatar} ${classes.userAvatarHover}`
                    : classes.userAvatar
                }
                src={image}
                onClick={showEditOption ? handleAvatarClickOpen : null}
              />
            </div>
            <Typography className={classes.profileName} variant="h3">
              {name}
            </Typography>

            <Typography className={classes.title}>{title}</Typography>
          </div>
          <div
            className={classes.editHeader}
            style={showEditOption ? { display: "block" } : { display: "none" }}
          >
            <EditIcon className={classes.editIcon} onClick={handleClickOpen} />
          </div>
        </div>

        <div className={classes.contentWrapper}>
          <div className={classes.gridRow2}>
            <div>
              <Typography className={classes.decorativeText}>
                {years || "N/A"}
              </Typography>

              <Typography className={classes.text}>
                Years of Experience
              </Typography>
            </div>
            <div>
              <Typography className={classes.decorativeText}>
                {reviews}
              </Typography>
              <Typography className={classes.text}>Reviews</Typography>
            </div>
            <div>
              <Typography className={classes.decorativeText}>
                {reviews
                  ? Math.round((totalRatingsScore / reviews) * 10) / 10
                  : "N/A"}
              </Typography>
              <Typography className={classes.text}>Average Rating</Typography>
            </div>
          </div>

          <div className={classes.gridRow3}>
            {experience.map((exp, index) => (
              <div key={index}>
                <Typography className={classes.decorativeText}>
                  {options[exp.language]}
                </Typography>
                <Typography className={classes.text}>
                  {levels[exp.level]}
                </Typography>
              </div>
            ))}
          </div>
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
        options={options}
        levels={levels}
        setEditedExperience={setEditedExperience}
        setSnackbar={setSnackbar}
      />

      <ImageUpload open={avatarOpen} onClose={handleClose} />

      <Portal>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Portal>
    </MainContainer>
  );
};

export default Profile;

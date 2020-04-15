import React, { useEffect } from "react";

import { Button } from "@material-ui/core";

import MainContainer from "components/MainContainer";

import socket from "utils/socket";

const Profile = () => {

  useEffect(() => {
    socket.socket.on("5 seconds", () => console.log("5 SECONDS HAVE PASSED!"))
  }, []);

  return (
    <MainContainer>
      <Button
        onClick={() => {
          socket.socket.emit("pressed button")
        }}
      >
        BUTTON
      </Button>
    </MainContainer>
  );
};

export default Profile;

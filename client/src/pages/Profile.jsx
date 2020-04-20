import React from "react";

import MainContainer from "components/MainContainer";

// REMOVE THESE AFTER TESTING:
import axios from "axios";
import { useContext } from "react";
import UserContext from "context/UserContext";

const Profile = () => {

  const { user } = useContext(UserContext);

  return (
    <MainContainer>
      <button
        onClick={() => {
          (async function () {
            await axios.post("/api/notifications", {
              reviewId: 1,
              recipient: {
                id: `${user.id}`
              },
              counterpart: {
                name: 'some name'
              },
              code: 2,
            })
          })()
        }}
      >
        TEST
      </button>
    </MainContainer>
  );
};

export default Profile;

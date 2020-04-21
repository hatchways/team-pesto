import React, { useContext } from "react";
import UserContext from "context/UserContext";

import MainContainer from "components/MainContainer";
import GridTemplateContainer from "components/GridTemplateContainer";

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <MainContainer>
      <GridTemplateContainer>
        {console.log(user)}
        <p>{user.name}</p>
        {user.experience.map((exp) => (
          <p>exp.language</p>
        ))}
      </GridTemplateContainer>
    </MainContainer>
  );
};

export default Profile;

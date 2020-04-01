const REQUIRED_LENGTH = 6;

const validatePassword = password => {
  if (!password) return false;

  const isValid = password.length > REQUIRED_LENGTH;
  return isValid;
};

module.exports = validatePassword;

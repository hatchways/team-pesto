const validateExperience = (experience) => {
  if (!experience) return false;

  if (!Array.isArray(experience)) return false;

  if (experience.length <= 0) return false;

  return true;
};

module.exports = validateExperience;

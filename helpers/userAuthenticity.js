const userAuthenticity = (token_user_id, current_id) => {
  if (token_user_id === current_id) return true;
  return false;
};

module.exports = userAuthenticity;

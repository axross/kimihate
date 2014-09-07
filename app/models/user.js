var signin = function(token, tokenSecret, profile, callback) {
  console.log(token);
  console.log(tokenSecret);
  console.log(profile.username);
  console.log(profile.photos[0].value);

  callback(null, profile.id)
};

module.exports = {
  signin: signin
};

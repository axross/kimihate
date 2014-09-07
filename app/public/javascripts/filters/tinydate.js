module.exports = function(app) {
  app.filter('tinydate', function() {
    return function(value) {
      var dateString = value.replace(/-/g, '/');
          dateString = value.replace('Z', '+09:00');
      var valueDate  = new Date(dateString);
      var argDateSec = Math.floor(valueDate.getTime() / 1000);
      var nowDateSec = Math.floor(new Date().getTime() / 1000);

      var diffSec = nowDateSec - argDateSec;
      var retval;

      if (diffSec > 0) {
        if (diffSec < 60) {
          retval = 'たった今';
        } else if (diffSec < 3600) {
          retval = Math.floor(diffSec / 60) + '分前';
        } else if (diffSec < 86400) {
          retval = Math.floor(diffSec / 3600) + '時間前';
        } else if (diffSec >= 86400 ) {
          retval = Math.floor(diffSec / 86400) + '日前';
        } else {
          retval = 'ERROR';
        }
      } else {
        retval = 'たった今';
      }

      return retval;
    };
  });
};

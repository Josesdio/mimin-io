//[Detail Javascript]

$(function () {
  "use strict";

  // Slim scrolling
  $('.slimscroll-messages').slimScroll({
    height: '600px',
    start: 'bottom'
  });
  $('.slimscroll-members').slimScroll({
    height: '310px'
  });
  $('.slimscroll-files').slimScroll({
    height: '360px'
  });

}); // End of use strict
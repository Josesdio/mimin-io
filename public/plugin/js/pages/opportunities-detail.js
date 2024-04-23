//[List Javascript]


$(function () {
  "use strict";

  // Select2
  $('#quickview-select-person').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search person",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Person</b></a>";
        }
    }
  });
  
  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '800px'
  });

}); // End of use strict

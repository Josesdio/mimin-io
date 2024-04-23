//[List Javascript]


$(function () {
  "use strict";

  // Select2
  $('#quick-companies-1-1').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  
  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '800px'
  });

}); // End of use strict

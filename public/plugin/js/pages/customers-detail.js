//[List Javascript]


$(function () {
  "use strict";

  // DataTables INIT
  DataTablesInit('#datatable1', 0, 1, [6], [2, 3, 4, 5], []);
  DataTablesInit('#datatable2', 0, 1, [6], [2, 3, 4, 5], []);
  DataTablesInit('#datatable3', 0, 1, [8], [2, 3, 4, 7], [5, 6]);
 
  // Quick view open/close
  $('.btn-quickview-trigger').on( 'click', function (e) {
    e.stopPropagation();
    var itemid = $(this).data('item-id');
    $('.quickview-sidebar').addClass('control-sidebar-open');
  } );
  // Close Quickview Sidebar on clicking close button
  $('.quickview-sidebar-close').on( 'click', function () {
    $('.quickview-sidebar').removeClass('control-sidebar-open');
  } );
  // Close Quickview Sidebar on clicking inside page content
  $('.content-wrapper').on( 'click', function () {
    $('.quickview-sidebar').removeClass('control-sidebar-open');
  } );

  // Select2
  $('#quick-companies').select2({
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

//[List Javascript]


$(function () {
  "use strict";

  // DataTables INIT
  DataTablesInit('#datatable1', 0, 1, [8], [2, 3, 4, 7], [5, 6]);
  DataTablesInit('#datatable2', 0, 1, [9], [2, 3, 4, 5, 8], [6, 7]);
 
  // Quick view open/close
  $('.btn-quickview-trigger').on( 'click', function (e) {
    e.stopPropagation();
    var itemid = $(this).data('item-id');
    $('.quickview-sidebar-'+itemid).addClass('control-sidebar-open');
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
  $('#quick-companies-2-1').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  $('#quick-companies-2-2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });

}); // End of use strict

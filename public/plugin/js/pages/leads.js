//[List Javascript]


$(function () {
  "use strict";

  // Grid Stacks (Movable Dashboard Widgets)
  $('.grid-stack').gridstack({
      width: 12,
      cellHeight: 30,
      minWidth: 1024,
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      resizable: {
          handles: 'e, se, s, sw, w'
      }
  });

  // DataTables INIT
  DataTablesInit('#datatable1', 0, 1, [8], [2, 3, 4, 7], [5, 6]);
 
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
  $('#quick-companies-1-2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  $('#create-select-person-1').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select or Add New",
    language: {
        noResults: function () {
             return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
        }
    }
  });
  $('#create-select-person-2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select or Add New",
    language: {
        noResults: function () {
             return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
        }
    }
  });
  $('#create-select-person-3').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select or Add New",
    language: {
        noResults: function () {
             return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
        }
    }
  });
  $('#create-select-cp-person').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select or Add New",
    language: {
        noResults: function () {
             return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
        }
    }
  });
  $('#create-select-cp-person2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select or Add New",
    language: {
        noResults: function () {
             return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
        }
    }
  });
  $('#create-select-company').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  $('#addcp-select-company').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  $('#create-select-cp-company').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });
  $('#create-select-cp-company2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Company</b></a>";
        }
    }
  });

  //Date picker
  $('#convert-closedate').datepicker({
    autoclose: true
  });
  $('#addtodo-duedate').datepicker({
    autoclose: true
  });

  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '700px'
  });

}); // End of use strict

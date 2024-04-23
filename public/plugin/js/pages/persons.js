//[List Javascript]


$(function () {
  "use strict";
  
  // Tooltips
  $( document ).tooltip({
    items: "[data-tooltip-content]",
    content: function() {
      var element = $( this );
      var text = element.data('tooltip-content');
      return text;
    }
  });

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
  DataTablesInit('#datatable1', 0, 1, [8], [2, 3, 4, 5, 7], [6]);
 
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
  var select2template = $(".select2template").html();
  $('#quick-companies-1-1').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return select2template;
        }
    }
  });
  $('#quick-companies-2-1').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return select2template;
        }
    }
  });
  $('#quick-companies-2-2').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return select2template;
        }
    }
  });
  $('#create-select-company').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a company",
    language: {
        noResults: function () {
             return select2template;
        }
    }
  });

}); // End of use strict

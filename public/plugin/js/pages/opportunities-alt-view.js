//[List Javascript]


$(function () {
  "use strict";

  // Grid Stacks (Movable Dashboard Widgets)
  $('#gridstack').gridstack({
      width: 12,
      cellHeight: 30,
      minWidth: 1024,
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      resizable: {
          handles: 'e, se, s, sw, w'
      }
  });
 
  // Nestable for Kanban
  var updateOutput = function (e) {
      var list = e.length ? e : $(e.target)
          , output = list.data('output');
          console.log(list);
      if (window.JSON) {
          output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
      }
      else {
          output.val('JSON browser support required for this demo.');
      }
  };
  $('#nestable-1').nestable({
      group: 1,
      maxDepth: 1
  }).on('change', updateOutput);
  updateOutput($('#nestable-1').data('output', $('#nestable-1-output')));

  $('#nestable-2').nestable({
      group: 1,
      maxDepth: 1
  }).on('change', updateOutput);
  updateOutput($('#nestable-2').data('output', $('#nestable-2-output')));

  $('#nestable-3').nestable({
      group: 1,
      maxDepth: 1
  }).on('change', updateOutput);
  updateOutput($('#nestable-3').data('output', $('#nestable-3-output')));

  $('#nestable-4').nestable({
      group: 1,
      maxDepth: 1
  }).on('change', updateOutput);
  updateOutput($('#nestable-4').data('output', $('#nestable-4-output')));

  

 
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
  $('#create-select-person').select2({
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

  //Date picker
  $('#convert-closedate').datepicker({
    autoclose: true
  });
  $('#addtodo-duedate').datepicker({
    autoclose: true
  });
  
  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '650px'
  });
  $('.slimscroll-500').slimScroll({
    height: '500px'
  });

  // Perfect Scroll
  const ps1 = new PerfectScrollbar('.perfectscroll-1', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });

}); // End of use strict

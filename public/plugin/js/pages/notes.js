//[List Javascript]

$(function() {
  "use strict";

  // Grid Stacks (Movable Dashboard Widgets)
  $(".grid-stack").gridstack({
    width: 12,
    cellHeight: 30,
    minWidth: 1024,
    alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    resizable: {
      handles: "e, se, s, sw, w"
    }
  });

  // DataTables INIT
  DataTablesInit("#datatable1", 0, 1, [], [2, 3, 4, 5, 6], []);

  // Quick view open/close
  $(".btn-quickview-trigger").on("click", function(e) {
    e.stopPropagation();
    var itemid = $(this).data("item-id");
    $(".quickview-sidebar").addClass("control-sidebar-open");
  });
  // Close Quickview Sidebar on clicking close button
  $(".quickview-sidebar-close").on("click", function() {
    $(".quickview-sidebar").removeClass("control-sidebar-open");
  });
  // Close Quickview Sidebar on clicking inside page content
  $(".content-wrapper").on("click", function() {
    $(".quickview-sidebar").removeClass("control-sidebar-open");
  });

  $("#create-disc-subject").select2({
    allowClear: true,
    escapeMarkup: function(markup) {
      return markup;
    },
    placeholder: "Select Subject",
    language: {
      noResults: function() {
        return "Not found";
      }
    }
  });

  $("#create-select-person-2").select2({
    allowClear: true,
    escapeMarkup: function(markup) {
      return markup;
    },
    placeholder: "Select or Add New",
    language: {
      noResults: function() {
        return "<a href=/'persons-add.html/'>Not found, <b>Add New Contact Person</b></a>";
      }
    }
  });

  // Slim scrolling
  $(".slimscroll").slimScroll({
    height: "700px"
  });
}); // End of use strict

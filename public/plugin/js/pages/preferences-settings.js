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
      if (window.JSON) {
          output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
      }
      else {
          output.val('JSON browser support required for this demo.');
      }
  };

  $('#nestable-3-1-b').nestable({ group: 1, maxDepth: 1 }).on('change', updateOutput);
  updateOutput($('#nestable-3-1-b').data('output', $('#nestable-3-1-b-output')));
  $('#nestable-3-1-b').nestable({ group: 1, maxDepth: 1 }).on('change', updateOutput);
  updateOutput($('#nestable-3-1-b').data('output', $('#nestable-3-1-b-output')));

  $('#nestable-4-1-a').nestable({ group: 1, maxDepth: 1 }).on('change', updateOutput);
  updateOutput($('#nestable-4-1-a').data('output', $('#nestable-4-1-a-output')));
  $('#nestable-4-1-b').nestable({ group: 1, maxDepth: 1 }).on('change', updateOutput);
  updateOutput($('#nestable-4-1-b').data('output', $('#nestable-4-1-b-output')));
  
  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '650px'
  });
  $('.slimscroll-500').slimScroll({
    height: '500px'
  });
  $('.slimscroll-160').slimScroll({
    height: '160px'
  });

  // Perfect Scroll
  const ps1 = new PerfectScrollbar('.perfectscroll-1', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });

}); // End of use strict
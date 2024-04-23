//[Dashboard Javascript]


$(function () {

  'use strict';

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder: 'sort-highlight',
    connectWith: '.connectedSortable',
    handle: '.box-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex: 999999
  });
  $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

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
  
  // Slim scrolling
  $('.inner-content-div-420').slimScroll({
    height: '420px'
  });

  // Leads-chart
  // Morris.Area({
  //   element: 'leads-chart',
  //   data: [{
  //       period: '2019-09-29',
  //       september: 0.81,
  //       october: 0
  //     }, {
  //       period: '2019-09-30',
  //       september: 0.9,
  //       october: 0
  //     }, {
  //       period: '2019-10-01',
  //       september: 0.72,
  //       october: 0
  //     }, {
  //       period: '2019-10-02',
  //       september: 0.3,
  //       october: 0.05
  //     }, {
  //       period: '2019-10-03',
  //       september: 0.12,
  //       october: 0.18
  //     }, {
  //       period: '2019-10-04',
  //       september: 0.14,
  //       october: 0.24
  //     }, {
  //       period: '2019-10-05',
  //       september: 0,
  //       october: 0.23
  //     }, {
  //       period: '2019-10-06',
  //       september: 0,
  //       october: 0.27
  //     }, {
  //       period: '2019-10-07',
  //       september: 0,
  //       october: 0.33
  //     }, {
  //       period: '2019-10-08',
  //       september: 0,
  //       october: 0.42
  //     }
  //   ],
  //   xkey: 'period',
  //   ykeys: ['september', 'october'],
  //   labels: ['September', 'October'],
  //   pointSize: 3,
  //   fillOpacity: 0,
  //   pointStrokeColors: ['#7daf9c', '#c44536'],
  //   behaveLikeLine: true,
  //   gridLineColor: '#e0e0e0',
  //   lineWidth: 3,
  //   hideHover: 'auto',
  //   lineColors: ['#7daf9c', '#c44536'],
  //   resize: true

  // });

 

  // Opportunities-chart
  // Morris.Area({
  //   element: 'opportunities-chart',
  //   data: [{
  //       period: '2019-09-29',
  //       september: 0.76,
  //       october: 0
  //     }, {
  //       period: '2019-09-30',
  //       september: 0.88,
  //       october: 0
  //     }, {
  //       period: '2019-10-01',
  //       september: 0.65,
  //       october: 0
  //     }, {
  //       period: '2019-10-02',
  //       september: 0.43,
  //       october: 0.04
  //     }, {
  //       period: '2019-10-03',
  //       september: 0.29,
  //       october: 0.12
  //     }, {
  //       period: '2019-10-04',
  //       september: 0.02,
  //       october: 0.22
  //     }, {
  //       period: '2019-10-05',
  //       september: 0,
  //       october: 0.38
  //     }, {
  //       period: '2019-10-06',
  //       september: 0,
  //       october: 0.54
  //     }, {
  //       period: '2019-10-07',
  //       september: 0,
  //       october: 0.63
  //     }, {
  //       period: '2019-10-08',
  //       september: 0,
  //       october: 0.85
  //     }
  //   ],
  //   xkey: 'period',
  //   ykeys: ['september', 'october'],
  //   labels: ['September', 'October'],
  //   pointSize: 3,
  //   fillOpacity: 0,
  //   pointStrokeColors: ['#7daf9c', '#c44536'],
  //   behaveLikeLine: true,
  //   gridLineColor: '#e0e0e0',
  //   lineWidth: 3,
  //   hideHover: 'auto',
  //   lineColors: ['#7daf9c', '#c44536'],
  //   resize: true

  // });

  // donut charts
  $('.donut').peity('donut');

  //Date range buttons
  $('#daterange-btn-1').daterangepicker(
    {
      ranges   : {
        'Today'       : [moment(), moment()],
        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate  : moment()
    },
    function (start, end) {
      $('#daterange-btn-1 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
  );

  $('#daterange-btn-2').daterangepicker(
    {
      ranges   : {
        'Today'       : [moment(), moment()],
        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate  : moment()
    },
    function (start, end) {
      $('#daterange-btn-2 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }
  );

  //opportunity-per-stage CHART
  var bar = new Morris.Bar({
    element: 'opportunity-per-stage',
    resize: true,
    data: [
      {y: '0', a: 45},
      {y: '10%', a: 24},
      {y: '20%', a: 42},
      {y: '30%', a: 71},
      {y: '40%', a: 58},
      {y: '50%', a: 140},
      {y: '60%', a: 175},
      {y: '70%', a: 198},
      {y: '80%', a: 175},
      {y: '90%', a: 143},
      {y: '100%', a: 82},
      {y: '0%', a: 57}
    ],
  barColors: ['#7daf9c'],
  barSizeRatio: 0.5,
  barGap:5,
  xkey: 'y',
  ykeys: 'a',
  labels: ['Number of Opportunity'],
  hideHover: 'auto'
  });

  //opportunity-value-per-stage CHART
  var bar = new Morris.Bar({
    element: 'opportunity-value-per-stage',
    resize: true,
    data: [
      {y: '0', a: 23100000},
      {y: '10%', a: 4020000},
      {y: '20%', a: 5980000},
      {y: '30%', a: 450000},
      {y: '40%', a: 2420000},
      {y: '50%', a: 4420000},
      {y: '60%', a: 8450000},
      {y: '70%', a: 5220000},
      {y: '80%', a: 175},
      {y: '90%', a: 0},
      {y: '100%', a: 3220000},
      {y: '0%', a: 0}
    ],
  barColors: ['#7daf9c'],
  barSizeRatio: 0.5,
  barGap:5,
  xkey: 'y',
  ykeys: 'a',
  labels: ['EUR'],
  hideHover: 'auto'
  });

}); // End of use strict

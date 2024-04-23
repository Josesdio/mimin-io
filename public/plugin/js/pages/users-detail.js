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
  $('#user-position').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a position"
  });
  $('#select-hierarchy').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search a hierarchy"
  });

  
  // ↓↓↓↓↓ KPI Params List ↓↓↓↓↓

  // Variable for receiving KPI parameter types
  var kpiParamList = [
    { value: 0 , name: 'Problems Solved'},
    { value: 1 , name: 'Problems Found'},
    { value: 2 , name: 'Research Progress'},
    { value: 3 , name: 'Projects Completed'},
    { value: 4 , name: 'Tasks Completed'},
    { value: 5 , name: 'Time Saved'},
    { value: 6 , name: 'Resources Saved'}
  ]

  // Container for the KPI List
  var kpilistcontainer = $('.kpilist');

  // Current number of KPI Param Items
  var currentIndex = kpilistcontainer.children().length;

  // Template when user clicks to add new KPI Param Item
  var getKpiParamItem = function(index) {
    var kpiParamItem = 
        '<div class="col-12 col-lg-6">' +
        '  <div class="crmitemform mb-3">' +
        '    <div class="crmitemform-header text-right">' +
        '      <button class="crmitemformdelete btn"><i class="fas fa-trash"></i></button>' +
        '    </div>' +
        '    <div class="crmitemform-content">' +
        '      <div class="row">' +
        '        <div class="col-4">' +
        '          <div class="form-group mb-0">' +
        '            <label for="user-kpi-parameter-'+index+'">Parameter</label>' +
        '            <select class="form-control select2" id="user-kpi-parameter-'+index+'" data-placeholder="Select" style="width: 100%;">' +
        '              <option disabled value selected>Select</option>';
  
    kpiParamList.forEach(function(val, key){
      kpiParamItem += '<option value="' + val.value + '">' + val.name +'</option>';
    });
  
    kpiParamItem += '            </select>' +
        '          </div>' +
        '        </div>' +
        '        <div class="col-4">' +
        '          <div class="form-group">' +
        '            <label for="user-kpi-target-'+index+'">Target</label>' +
        '            <input type="text" class="form-control" id="user-kpi-target-'+index+'" placeholder="Enter Target" value="">' +
        '          </div>' +
        '        </div>' +
        '        <div class="col-4">' +
        '          <div class="form-group">' +
        '            <label for="user-kpi-unit-'+index+'">Unit</label>' +
        '            <input type="text" class="form-control" id="user-kpi-unit-'+index+'" placeholder="Enter Unit" value="">' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' ;
    return kpiParamItem;
  };

  // Function when user clicks to add new KPI Param Item
  $(document).on('click', '.crmlist-add', function () {
    kpilistcontainer.append(getKpiParamItem(currentIndex));
    currentIndex++;
  });

  // Function when user deletes a KPI Param Item
  $(document).on('click', '.crmitemformdelete', function () {
    $(this).parent().parent().parent().remove();
  });

  // ↑↑↑↑↑ KPI Params List ↑↑↑↑↑


  // ↓↓↓↓↓ UAC Checkbox Functions ↓↓↓↓↓
  
  // Function when the Group Checkbox changes value
  $(document).on('change', '.checkbox-group-all', function () {
    var groupcheckbox = $(this);
    var groupid = groupcheckbox.attr('id');
    var ischecked = groupcheckbox.prop("checked");

    $('.'+groupid).each(function(){
      $(this).prop("checked", ischecked);
    });
  });

  // Function when the Group Member Checkbox changes value
  $(document).on('change', '.checkbox-group-member', function () {
    var membercheckbox = $(this);

    // Get the Group Checkbox
    var groupcheckbox = membercheckbox.parent().parent().parent().parent().parent().parent().find('.checkbox-group-all');

    var groupid = groupcheckbox.attr('id');
    var ischecked = true;

    // If one of the Member Checkboxes is set to false, then the Group Checkbox must be unchecked
    $('.'+groupid).each(function(){
      if(!$(this).prop("checked")) {
        ischecked = false;
      }
    });
    groupcheckbox.prop("checked", ischecked);
  });

  // Function to checkand uncheck checkboxes according to selected hierarchy

  // Variable for receiving hierarchy uac data
  var hierarchies = [
    { value: 0 , name: 'Super Admin', uac: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
    ] },
    { value: 1 , name: 'Admin', uac: [
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
    ] },
    { value: 2 , name: 'CEO', uac: [
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
    ] },
    { value: 3 , name: 'Manager', uac: [
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
    ] },
    { value: 4 , name: 'Technical', uac: [
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1],
    ] },
    { value: 5 , name: 'Sales', uac: [
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 0, 1,
          1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
          0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0],
      [0],
      [1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0],
    ] },
    { value: 6 , name: 'Auditor', uac: [
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0],
      [0],
      [1],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0],
    ] },
    { value: 7 , name: 'Advisor', uac: [
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0,
          0, 0, 0],
      [1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0],
      [0],
      [1],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0],
    ] },
    { value: 8 , name: 'No Access', uac: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0],
      [0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0],
      [0],
      [0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0],
     ] }
  ]

  var hierarchySelect = $('#select-hierarchy');
  var checkboxGroupClass = 'checkbox-group-all';
  var checkboxClass = 'checkbox-group-member';
  var checkboxPrefix = '#uac';

  var hierarchyIndex = 0;
  var dom = '';
  var checkboxGroupAllChecked = true;

  // Populate Hierarchy Selection
  hierarchies.forEach(function(val, key){
    dom += '<option value="' + val.value + '">' + val.name +'</option>';
  });
  hierarchySelect.append(dom);

  // Trigger on hierarchySelect value change
  hierarchySelect.on('change', function () {
    hierarchyIndex = $(this).val();

    // console.log(hierarchyIndex+' Selected');

    // Uncheck all checkboxes first
    $('.'+checkboxGroupClass).each(function(){
      $(this).prop("checked", false);
    });
    $('.'+checkboxClass).each(function(){
      $(this).prop("checked", false);
    });

    // Iterate through data and check checkboxes accordingly
    hierarchies[hierarchyIndex].uac.forEach(function(hierval, hierkey){

      hierval.forEach(function(checkval, checkkey){
        // console.log('-----------------------');

        // console.log('hierval');
        // console.log(hierkey+': '+hierval);

        // console.log('checkval');
        // console.log(checkkey+': '+checkval);

        // console.log('-----------------------');
        if(checkval==1) {
          $(checkboxPrefix+'-'+hierkey+'-'+checkkey).prop("checked", true);
          // console.log('check '+checkboxPrefix+'-'+hierkey+'-'+checkkey);
        } else {
          checkboxGroupAllChecked = false;
        }

      });

      // If checkboxGroupAllChecked is true (all checkbox in group is selected), check the group checkbox
      if(checkboxGroupAllChecked) {
        $(checkboxPrefix+'-'+hierkey).prop("checked", true);
        // console.log('check '+checkboxPrefix+'-'+hierkey);
      }

      // Reset checkboxGroupAllChecked
      checkboxGroupAllChecked = true;
      
    });
  });
  
  // ↑↑↑↑↑ UAC Checkbox Functions ↑↑↑↑↑


}); // End of use strict

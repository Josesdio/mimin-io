// Date Paginator
var datepaginator = function() {
  return {
    init: function() {
      $("#paginator").datepaginator({
        size: "large",
        itemWidth: "70",
        onSelectedDateChanged: function(a, t) {
          // Function to run on changing date
        }
      })
    }
  }
}();
jQuery(document).ready(function() {
  datepaginator.init();

  var selectedDate = $('#selected-date').val();

  // Select2
  $('#create-tagoptions').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Priority"
  });
  $('#edit-tagoptions').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Priority"
  });

  //Date picker
  $('#create-date').datepicker({
    autoclose: true
  });

  //Timepicker
  $('.timepicker').timepicker({
    showInputs: false
  });

  //Colorpicker
  $('.ddcolorpicker').colorpicker();

  //Is It Selected Day
  var getIsItSelectedDay = function(targetDate) {
    // console.log(targetDate +' '+ targetTime);

    // Set the datetime we're counting down to
    var countDownDate = new Date(targetDate).getTime();

    // Get selected date and time
    var selected = new Date(selectedDate).getTime();

    // Find the distance between selected date and the count down date
    var distance = countDownDate - selected;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));

    // console.log('D: '+days+' DAY '+hours+' HOUR '+minutes+' MIN');

    var isitsameday = true;

    // Return pretty string
    if(distance>0) {
      if(days>=1) {
        isitsameday = false;
      }
    }

    if(distance<=0) {
      days = (days+1)*(-1);
      if(days>=1) {
        isitsameday = false;
      }
    }

    return isitsameday;
  };

  //Time Until Calculator
  var getTimeUntil = function(targetDate, targetTime) {
    // console.log(targetDate +' '+ targetTime);

    // Set the datetime we're counting down to
    var countDownDate = new Date(targetDate +' '+ targetTime).getTime();

    // Get today's date and time
    var now = new Date('11/19/2019 07:00').getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // console.log(distance);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // console.log('D: '+days+' DAY '+hours+' HOUR '+minutes+' MIN');

    // Return pretty string
    if(distance>0) {
      result = "in ";

      if(days==1) {
        result += days + " Day ";
      }
      if(days>1) {
        result += days + " Days ";
      }

      if(hours==1) {
        result += hours + " Hour ";
      }
      if(hours>1) {
        result += hours + " Hours ";
      }

      if(minutes==1) {
        result += minutes + " Minute ";
      }
      if(minutes>1) {
        result += minutes + " Minutes ";
      }
    }

    if(distance<=0) {
      result = "expired ";

      days = (days+1)*(-1);
      hours = hours*(-1);
      minutes = minutes*(-1);

      if(days==1) {
        result += days + " Day ";
      }
      if(days>1) {
        result += days + " Days ";
      }

      if(hours==1) {
        result += hours + " Hour ";
      }
      if(hours>1) {
        result += hours + " Hours ";
      }

      if(minutes==1) {
        result += minutes + " Minute ";
      }
      if(minutes>1) {
        result += minutes + " Minutes ";
      }

      result += " ago";
    }

    return result;
  };

  // TAGS
  // Tag Types, format {index : [ 'Tag Name', 'Color', 'Is Modifiable?' ]}
  var TagTypes = {
    0   : ['URGENT', '#c44536', true],
    1   : ['HIGH', '#fc7753', false],
    2   : ['LOW', '#4daa57', false]
  }

  var refreshTagList = function() {
    // Iterate through Tags ( Types) and display them
    var tags = '';
    $.each(TagTypes, function( key, value ) {
      if(value) {
        // Check if tag is modifiable
        if(value[2]) {
          tags += '<span class="tag" style="background-color: '+value[1]+';">'+value[0]+'</span>';
        } else {
          tags += '<span class="tag" style="background-color: '+value[1]+';"><a data-index="'+key+'" class="tagbtn-edit" data-toggle="modal" data-target=".modal-tags-edit">'+value[0]+'</a><span class="tagbtns"><a data-index="'+key+'" class="tagbtn-delete" data-toggle="modal" data-target=".modal-tags-delete"><i class="fas fa-trash"></i></a></span></span>';
        }
      }
    });
    // Add Button
    tags += '<a class="tag tag-add bgcolor-primary-paper" data-toggle="modal" data-target=".modal-tags-add"><i class="fas fa-plus mr-1"></i>ADD NEW TAG</a>';
    $('.taglist').html('<div class="tags tags-with-btns-coloured">'+tags+'</div>');
  };

  var refreshTagOptionList = function() {
    // Iterate through Tags ( Types) and display them
    var tagoptions = '';
    tagoptions += '<option disabled value selected>Select</option>';
    $.each(TagTypes, function( key, value ) {
      if(value) {
        tagoptions += '<option value="'+key+'">'+value[0]+'</option>';
      }
    });
    // Add new tag to option input
    $('#create-tagoptions').html(tagoptions);
    $('#edit-tagoptions').html(tagoptions);
  };

  refreshTagList();
  refreshTagOptionList();

  // Function when user clicks to save new TAG from modal
  $(document).on('click', '.trigger-add-tag', function () {
    var tagname = $('#addtag-name').val();
    var tagcolour = $('#addtag-colour').val();
    var taglength = Object.keys(TagTypes).length;
    // console.log('ADD TAG: ['+taglength+'] '+tagname+' {'+tagcolour+'}');
    // console.log(TagTypes);
    TagTypes[taglength] = [tagname, tagcolour];

    refreshTagList();
    refreshTagOptionList();
    
    $('#addtag-name').val('');
    $('#addtag-colour').val('');
  });

  // Function when user clicks to open edit TAG modal
  $(document).on('click', '.tagbtn-edit', function () {
    var tagindex = $(this).data('index');

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('EDIT TAG: ['+tagindex+'] '+TagTypes[tagindex][0]+' {'+TagTypes[tagindex][1]+'}');

    if(TagTypes[tagindex][2]) {
      alert('CANNOT EDIT THIS TAG');
    }

    $('#edittag-index').val(tagindex);
    $('#edittag-name').val(TagTypes[tagindex][0]);
    $('#edittag-colour').val(TagTypes[tagindex][1]);
  });

  // Function when user clicks to save edited TAG from modal
  $(document).on('click', '.trigger-edit-tag', function () {
    var tagname = $('#edittag-name').val();
    var tagcolour = $('#edittag-colour').val();
    var taglength = Object.keys(TagTypes).length;
    var tagindex = $('#edittag-index').val();

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('EDIT TAG: ['+taglength+'] '+tagname+' {'+tagcolour+'}');

    // Check if tag is modifiable
    if(TagTypes[tagindex][2]) {
      alert('CANNOT EDIT THIS TAG');
    } else {
      TagTypes[tagindex] = [tagname, tagcolour];
    }

    refreshTagList();
    refreshTagOptionList();
    
    $('#edittag-name').val('');
    $('#edittag-colour').val('');
  });

  // Function when user clicks button to open delete TAG confirmation modal
  $(document).on('click', '.tagbtn-delete', function () {
    var tagindex = $(this).data('index');
    $('#deletetag-index').val(tagindex);

    if(TagTypes[tagindex][2]) {
      alert('CANNOT DELETE THIS TAG');
    }

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('DELETE TAG: ['+tagindex+'] '+TagTypes[tagindex][0]+' {'+TagTypes[tagindex][1]+'}');
  });

  // Function when user clicks to delete TAG from modal
  $(document).on('click', '.trigger-delete-tag', function () {
    var tagindex = $('#deletetag-index').val();

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('DELETE TAG: ['+tagindex+'] '+TagTypes[tagindex][0]+' {'+TagTypes[tagindex][1]+'}');

    // Check if tag is modifiable
    if(TagTypes[tagindex][2]) {
      alert('CANNOT DELETE THIS TAG');
    } else {
      TagTypes[tagindex] = null;
    }

    refreshTagList();
    refreshTagOptionList();
  });

  

  // TODOLIST
  // Var to receive Todo Items, format [{ 'subject', 'priority', 'date', 'time', 'is_checked' }] -- must be pre-sorted
  var ToDoItems = [
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 0,
      date : '11/19/2019',
      time : '09:30',
      is_checked : true },
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 0,
      date : '11/19/2019',
      time : '10:30',
      is_checked : false },
    { subject : 'Write proposal according to requirements',
      priority : 0,
      date : '11/19/2019',
      time : '11:30',
      is_checked : false },
    { subject : 'Write proposal according to requirements',
      priority : 1,
      date : '11/19/2019',
      time : '12:00',
      is_checked : false },
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 1,
      date : '11/19/2019',
      time : '14:00',
      is_checked : false },
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 0,
      date : '11/19/2019',
      time : '14:30',
      is_checked : false },
    { subject : 'Write proposal according to requirements',
      priority : 1,
      date : '11/19/2019',
      time : '16:00',
      is_checked : false },
    { subject : 'Write proposal according to requirements',
      priority : 1,
      date : '11/19/2019',
      time : '16:30',
      is_checked : false },
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 2,
      date : '11/19/2019',
      time : '17:00',
      is_checked : false },
    { subject : 'Arrange meeting to probe for interest and possible projects',
      priority : 2,
      date : '11/19/2019',
      time : '17:30',
      is_checked : true }
  ];

  var refreshToDoList = function() {

    // DOM Template for To Do Items
    var todotemplate = function(index, is_checked, subject, time, timecd, tag) {
      var tododom = '<!-- CRM Item -->' +
                    '<div class="crmitem mb-2">' +
                    '  <div class="crmitem-left">' +
                    '    <div class="crmitem-checkbox">' +
                    '      <div class="checkbox">' +
                    '        <input type="checkbox" class="trigger-completion-change" data-index="'+index+'" id="basic_checkbox_'+index+'"';
      if(is_checked) {
        tododom += 'checked' ;
      }
      tododom +=    '>' +
                    '        <label class="pl-25" for="basic_checkbox_'+index+'"></label>' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '  <div class="crmitem-right">' +
                    '    <div class="font-size-16 line-height-1-3 font-weight-600 mb-3">' +
                    '       <a href="#" class="todo-edit" data-toggle="modal" data-target=".modal-edit" data-index="'+index+'">'+subject+'</a>' +
                    '       </div>' +
                    '    <p class="mb-0"><b>'+time+'</b> ('+timecd+')</p>' +
                    '  </div>'+
                    '  <div class="crmitem-label font-weight-600" style="color:'+TagTypes[tag][1]+';">'+TagTypes[tag][0]+'</div>' +
                    '</div>' +
                    '<!-- /CRM Item -->';
      return tododom;
    }

    // Clear To DO List Containers
    $('.todo-completed').html('');
    $('.todo-urgent').html('');
    $('.todo-normal').html('');

    // Iterate through ToDoItems and display them
    $.each(ToDoItems, function( key, value ) {
      if(value) {
        if(value.is_checked) {
          $('.todo-completed').append(todotemplate(key, value.is_checked, value.subject, value.time, getTimeUntil(value.date, value.time), value.priority));
        } else if(value.priority == 0) {
          $('.todo-urgent').append(todotemplate(key, value.is_checked, value.subject, value.time, getTimeUntil(value.date, value.time), value.priority));
        } else {
          $('.todo-normal').append(todotemplate(key, value.is_checked, value.subject, value.time, getTimeUntil(value.date, value.time), value.priority));
        }
      }
    });
  };

  refreshToDoList();

  // Function when user clicks to save new ToDo/TASK from modal
  $(document).on('click', '.trigger-add', function () {
    var subject = $('#create-subject').val();
    var tagoptions = $('#create-tagoptions').val();
    var date = $('#create-date').val();
    var time = $('#create-time').val();
    var todolength = Object.keys(ToDoItems).length;

    // Check if date is today, if yes, spawn the item, if not, just save to DB
    if(getIsItSelectedDay(date)) {
      ToDoItems[todolength] = {subject: subject, priority: tagoptions, date: date, time: time, is_checked: false};
    }

    refreshToDoList();
    
    $('#create-subject').val('');
    $('#create-tagoptions').val('');
    $('#create-date').val('');
    $('#create-time').val('');
  });

  // Function when user clicks to open edit ToDo/TASK modal
  $(document).on('click', '.todo-edit', function () {
    var todoindex = $(this).data('index');

    // console.log(ToDoItems);
    // console.log(ToDoItems[todoindex].priority);

    $('#edit-index').val(todoindex);
    $('#edit-subject').val(ToDoItems[todoindex].subject);
    $('#edit-tagoptions').val(ToDoItems[todoindex].priority);
    $('#edit-tagoptions').trigger('change');
    $('#edit-date').val(ToDoItems[todoindex].date);
    $('#edit-time').val(ToDoItems[todoindex].time);
  });

  // Function when user clicks to save edited ToDo/TASK from modal
  $(document).on('click', '.trigger-edit', function () {
    var todoindex = $('#edit-index').val();
    var subject = $('#edit-subject').val();
    var tagoptions = $('#edit-tagoptions').val();
    var date = $('#edit-date').val();
    var time = $('#edit-time').val();

    // Check if date is today, if yes, spawn the item, if not, just save to DB
    if(getIsItSelectedDay(date)) {
      ToDoItems[todoindex] = {subject: subject, priority: tagoptions, date: date, time: time, is_checked: false};
    }

    refreshToDoList();
    
    $('#edit-index').val('');
    $('#edit-subject').val('');
    $('#edit-tagoptions').val('');
    $('#edit-tagoptions').trigger('change');
    $('#edit-date').val('');
    $('#edit-time').val('');
  });

  // Function when user clicks button to open delete ToDo/TASK confirmation modal
  $(document).on('click', '.openmodal-delete', function () {
    var todoindex = $('#edit-index').val();
    // console.log('delete '+todoindex);
    $('#delete-index').val(todoindex);
  });

  // Function when user clicks to delete ToDo/TASK from modal
  $(document).on('click', '.trigger-delete', function () {
    var todoindex = $('#delete-index').val();

    // console.log('delete '+todoindex);

    ToDoItems[todoindex] = null;

    refreshToDoList();
  });

  // Function when user clicks to complete/uncomplete ToDo/TASK
  $(document).on('change', '.trigger-completion-change', function () {
    var todoindex = $(this).data('index');
    var isChecked = $(this).prop('checked');

    ToDoItems[todoindex].is_checked = isChecked;

    refreshToDoList();
  });

});
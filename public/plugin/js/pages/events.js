jQuery(document).ready(function() {

  // Select2
  $('#create-tagoptions').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Type"
  });

  $('#create-event-subject').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select Subject",
    language: {
        noResults: function () {
             return "Not found";
        }
    }
  });

  $('#create-assigned-to').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select Assignee",
    language: {
        noResults: function () {
             return "Not found";
        }
    }
  });

  //Date picker
  $('#create-date').datepicker({
    autoclose: true
  });


  $('#edit-tagoptions').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Type"
  });

  $('#edit-event-subject').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select Subject",
    language: {
        noResults: function () {
             return "Not found";
        }
    }
  });

  $('#edit-assigned-to').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Select Assignee",
    language: {
        noResults: function () {
             return "Not found";
        }
    }
  });

  //Date picker
  $('#edit-date').datepicker({
    autoclose: true
  });

  //Timepicker
  $('.timepicker').timepicker({
    showInputs: false
  });

  //Colorpicker
  $('.ddcolorpicker').colorpicker();
  
  // Slim scrolling
  $('.slimscroll').slimScroll({
    height: '700px'
  });
});

// Full Calendar
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    theme: true,
    header: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    plugins: [ 'dayGrid', 'interaction' ],
    now:  '2019-10-21' ,
    defaultDate:  '2019-10-21' ,
    defaultView: 'dayGridMonth',
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      
    }
  });

  calendar.render();


  // Event Thumbnails in Calendar ###########

  // Event Tag Types, format {index : [ 'Tag Name', 'Color' ]}
  var TagTypes = {
    0   : ['Pitch', '#E3170A'],
    1   : ['Public Talks', '#59C3C3'],
    2   : ['Meeting', '#FC7753'],
    3   : ['Casual', '#4DAA57'],
    4   : ['Formal', '#2A4978'],
    5   : ['Others', '#DBD5B2']
  }

  // Events Object, format {index : [ TagTypes, TagTypes, TagTypes, ... ]}
  var events = {
    0   : [],
    1   : [4],
    2   : [0, 0],
    3   : [4, 0],
    4   : [2, 0],
    5   : [],
    6   : [],
    7   : [0],
    8   : [2, 2, 0],
    9   : [4, 2, 2, 0],
    10  : [],
    11  : [4, 5],
    12  : [],
    13  : [4, 2, 0],
    14  : [],
    15  : [2, 0],
    16  : [0, 3, 2, 4, 3, 0, 0],
    17  : [0],
    18  : [2, 0, 2],
    19  : [],
    20  : [],
    21  : [4, 4, 4],
    22  : [4, 3, 3, 4, 0, 2],
    23  : [2],
    24  : [0, 2],
    25  : [],
    26  : [],
    27  : [],
    28  : [2, 2],
    29  : [0, 2],
    30  : [4, 3, 2, 0, 2],
    31  : [0, 0],
    32  : [4, 2],
    33  : [],
    34  : [],
    35  : [],
    36  : [],
    37  : [],
    38  : [0, 1]
  };

  // Iterate through Events and place them in calendar
  var i = 0;
  $('.fc-day-top').each(function() {
    // Failsafe check if value exists
    if(events[i]) {
      var string = '';
      $.each(events[i], function( key, value ) {
        string += '<span class="tagbullet" style="background-color: '+TagTypes[value][1]+';"></span>';
      });
      $(this).append('<div class="tagbullets">'+string+'</div>');
    }
    i++;
  });

  // TAGS

  var refreshTagList = function() {
    // Iterate through Tags ( Types) and display them below the calendar
    var tags = '';
    $.each(TagTypes, function( key, value ) {
      if(value) {
        tags += '<span class="tag" style="background-color: '+value[1]+';"><a data-index="'+key+'" class="tagbtn-edit" data-toggle="modal" data-target=".modal-tags-edit">'+value[0]+'</a><span class="tagbtns"><a data-index="'+key+'" class="tagbtn-delete" data-toggle="modal" data-target=".modal-tags-delete"><i class="fas fa-trash"></i></a></span></span>';
      }
    });
    // Add Button
    tags += '<a class="tag tag-add bgcolor-primary-paper" data-toggle="modal" data-target=".modal-tags-add"><i class="fas fa-plus mr-1"></i>ADD NEW TAG</a>';
    $('.taglist').html('<div class="tags tags-with-btns-coloured">'+tags+'</div>');
  };

  var refreshTagOptionList = function() {
    // Iterate through Tags ( Types) and display them below the calendar
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

    TagTypes[tagindex] = [tagname, tagcolour];

    refreshTagList();
    refreshTagOptionList();
    
    $('#edittag-name').val('');
    $('#edittag-colour').val('');
  });

  // Function when user clicks to delete TAG
  $(document).on('click', '.tagbtn-delete', function () {
    var tagindex = $(this).data('index');
    $('#deletetag-index').val(tagindex);

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('DELETE TAG: ['+tagindex+'] '+TagTypes[tagindex][0]+' {'+TagTypes[tagindex][1]+'}');
  });

  // Function when user clicks to save edited TAG from modal
  $(document).on('click', '.trigger-delete-tag', function () {
    var tagindex = $('#deletetag-index').val();

    // console.log(TagTypes);
    // console.log(TagTypes[tagindex]);
    // console.log('DELETE TAG: ['+tagindex+'] '+TagTypes[tagindex][0]+' {'+TagTypes[tagindex][1]+'}');

    TagTypes[tagindex] = null;

    refreshTagList();
    refreshTagOptionList();
  });

});

// DataTables INIT
/*
  DataTablesInit ( 
    tableselector: the id/selector of the table
    checkboxpos: position of the selection checkbox column (from 0)
    defaultsort: position of the column used as the default sort (from 0)
    nosort: position of columns where sorting is disabled (array, from 0)
    textfilter: position of columns where you want to add a text-input filter (array, from 0)
    optionfilter: position of columns where you want to add a option-select filter (array, from 0)
  )
*/
function DataTablesInit(tableselector = "#datatable", checkboxpos = 0, defaultsort = 1, nosort = [], textfilter = [], optionfilter = []) {
  var table = $(tableselector).DataTable({
    'paging'      : true,
    'lengthChange': true,
    'searching'   : true,
    'ordering'    : true,
    'info'        : true,
    'autoWidth'   : false,
    columnDefs: [ {
      orderable: false,
      className: 'select-checkbox',
      targets:   checkboxpos,
    }, {
      orderable: false,
      targets:   nosort,
    } ],
    select: {
        style:    'os',
        selector: 'td:first-child'
    },
    order: [[ defaultsort, 'asc' ]],
    initComplete  : function () {
      var tablename = tableselector.replace(/[|&;$%@"<>()+#.,]/g, "");
      var num = 0;

      var filterdom = $('<tr class="dt-filters" id="dt-filters-'+tablename+'"></tr>')
        .appendTo( $(tableselector).find('thead') );

      this.api().columns().every( function () {
        var column = this;

        var thisfilter = $('<th></th>')
        .appendTo( $('#dt-filters-'+tablename) )

        // add text input filter
        if(textfilter.includes(num)) {
          var input = $('<input type="text" />')
              .appendTo( thisfilter )
              .on( 'keyup', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                      $(this).val()
                  );
  
                  column
                      .search( val , false, true )
                      .draw();
              } );
        }
        // add option select filter
        if(optionfilter.includes(num)) {
          var select = $('<select><option value=""></option></select>')
              .appendTo( thisfilter )
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                      $(this).val()
                  );
  
                  column
                      .search( val ? '^'+val+'$' : '', true, false )
                      .draw();
              } );
  
          column.data().unique().sort().each( function ( d, j ) {
            // Detects and clears html tags from 'd' value
            if(/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(d)) {
              d = d.replace(/(<([^>]+)>)/ig,"");
            }
            select.append( '<option value="'+d+'">'+d+'</option>' )
          } );
        }
        num++;
      } );

      // DataTable select all/deselect all row checkbox
      $(tableselector).find('.table-checkbox').html('');

      var selectall = $('<input type="checkbox" name="dtcheckall" id="dtcheckall-'+tablename+'" class="dtcheckall"><label for="dtcheckall-'+tablename+'"></label>')
        .appendTo( $(tableselector).find('.table-checkbox') )
        .on( 'change', function () {
          if ($(this).is( ":checked" )) {
            table.rows(  ).select();
          } else {
            table.rows(  ).deselect();
          }
        } );
  }
  });
  
  // DataTable Show/Hide Multiple Row Operation Buttons
  table.on( 'select deselect', function ( e, dt, type, indexes ) {
    if ( type === 'row' ) {
      if ( table.rows('.selected').data().length > 0 ) {
        $(tableselector).parent().parent().parent().find('.datatable-multibuttons').addClass('active');
        $(tableselector).parent().parent().parent().find('.datatable-multibuttons-label').text(table.rows('.selected').data().length +' row(s) selected');
      } else {
        $(tableselector).parent().parent().parent().find('.datatable-multibuttons').removeClass('active');
      }
      if ( table.rows('.selected').data().length == table.rows().data().length ) {
        $(tableselector).find('.dtcheckall').prop("checked", true);
      } else {
        $(tableselector).find('.dtcheckall').prop("checked", false);
      }
    }
  } );
};

// Favorite button on DataTable
$('.table-pinned').on( "click", function(e) {
  if ($(this).hasClass( "active" )) {
    $(this).removeClass( "active" );
    $(this).val(1);
    $(this).text(1);
  } else {
    $(this).addClass( "active" );
    $(this).val(0);
    $(this).text(0);
  }
});
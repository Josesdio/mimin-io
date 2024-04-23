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
  $('#quickview-select-person').select2({
    allowClear: true,
    escapeMarkup: function (markup) { return markup; },
    placeholder: "Search person",
    language: {
        noResults: function () {
             return "<a href=/'companies-add.html/'>Not found, <b>Add New Person</b></a>";
        }
    }
  });
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




  // HTML DOM TEMPLATES

  var secondaryContact = function(pic, name, position, mail, phone) {
    var dom =
      '<div class="crmitemform bgcolor-white mb-2">' +
      '  <div class="crmitemform-header text-right">' +
      '    <button class="crmitemformdelete btn"><i class="fas fa-trash"></i></button>' +
      '  </div>' +
      '  <div class="crmitemform-content">' +
      '    <div class="row small-gutters">' +
      '      <div class="col-3 col-md-2 col-lg-1">' +
      '        <div class="round-image">' +
      '          <img src="'+pic+'">' +
      '        </div>' +
      '      </div>' +
      '      <div class="col-9 col-md-10 col-lg-11">' +
      '        <h4 class="font-size-18 font-weight-500 color-black line-height-1-5 mb-1">'+name+'</h4>' +
      '        <p class="font-size-14 color-darkgrey line-height-1-5 mb-2">'+position+'</p>' +
      '        <p class="font-size-14 line-height-1-5 mb-2"><i class="fas fa-envelope color-beige"></i> '+mail+'</p>' +
      '        <p class="font-size-14 line-height-1-5 mb-0"><i class="fas fa-phone color-beige"></i> '+phone+'</p>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>';

      return dom;
  }


  var secondaryContactSelect = function(index) {
    var dom =
      '<div class="crmitemform mb-2" id="secondary-contact-'+index+'">' +
      '  <div class="crmitemform-header text-right">' +
      '    <a class="crmitemformdelete btn" data-target="secondary-contact-'+index+'"><i class="fas fa-trash"></i></a>' +
      '  </div>' +
      '  <div class="crmitemform-content">' +
      '    <div class="secondary-contact-person-select2-contain" id="secondary-contact-person-select2-contain-'+index+'">' +
      '      <div class="row small-gutters">' +
      '        <div class="col-12">' +
      '          <div class="form-group mb-0">' +
      '            <label for="create-select-person-'+index+'">Secondary Contact Person <span class="color-primary-red">*</span></label>' +
      '            <select class="form-control select2 secondary-contact-select-input" id="create-select-person-'+index+'" data-placeholder="Select or Add New" style="width: 100%;" required>' +
      '              <option disabled selected value>Select</option>' +
      '              <option>Anna Kerman</option>' +
      '              <option>Nina Karenina</option>' +
      '              <option>John Baker</option>' +
      '              <option>Wernher von Kerman</option>' +
      '              <option>Airi Satou</option>' +
      '              <option>Olivia Rene</option>' +
      '              <option>Prescott Bartlett</option>' +
      '              <option>Tom Kirkman</option>' +
      '              <option>Shou Itou</option>' +
      '              <option>Brielle Williamson</option>' +
      '              <option>Kiefer Sutherland</option>' +
      '              <option>Tatyana Fitzpatrick</option>' +
      '              <option>Colleen Hurst</option>' +
      '              <option>Lael Greer</option>' +
      '              <option>Sonya Frost</option>' +
      '              <option>Jena Gaines</option>' +
      '              <option>Charde Marshall</option>' +
      '              <option>Shad Decker</option>' +
      '              <option>Haley Kennedy</option>' +
      '              <option>Jebediah Kerman</option>' +
      '              <option>Paul Byrd</option>' +
      '              <option>Gloria Little</option>' +
      '              <option>Bradley Greer</option>' +
      '              <option>Gene Kerman</option>' +
      '              <option>Jenette Caldwell</option>' +
      '              <option>Yuri Berry</option>' +
      '              <option>Caesar Vance</option>' +
      '              <option>Doris Wilder</option>' +
      '              <option>Angelica Rene</option>' +
      '              <option>Gavin Joyce</option>' +
      '              <option>Herrod Chandler</option>' +
      '              <option>Brenden Wagner</option>' +
      '              <option>Fiona Green</option>' +
      '              <option>Michelle House</option>' +
      '              <option>Dinkelstein Kerman</option>' +
      '              <option>Nanba Mutta</option>' +
      '              <option>Martena Mccray</option>' +
      '              <option>Valentina Kerman</option>' +
      '              <option>Howard Hatfield</option>' +
      '              <option>Jack Bauer</option>' +
      '              <option>Vivian Harrell</option>' +
      '              <option>Timothy Mooney</option>' +
      '              <option>Jackson Bradshaw</option>' +
      '              <option>Eumon Kerman</option>' +
      '              <option>Olivia Vogelweiss</option>' +
      '              <option>Hata Koyuki</option>' +
      '              <option>John Walton</option>' +
      '              <option>Audrey Hepburn</option>' +
      '              <option>Serge Baldwin</option>' +
      '              <option>Zenaida Frank</option>' +
      '              <option>Zorita Serrano</option>' +
      '              <option>Jennifer Mooney</option>' +
      '              <option>Cara Stevens</option>' +
      '              <option>Hermione Butler</option>' +
      '              <option>Jonas Alexander</option>' +
      '              <option>Michael Bruce</option>' +
      '              <option>Donna Snider</option>' +
      '            </select>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="create-contact-person" id="create-contact-person-'+index+'">' +
      '    </div>' +
      '  </div>' +
      '</div>';

      return dom;
  }

  var secondaryContactAddNew = function(index) {
    var dom =
      '<div class="row mt-4">' +
      '  <div class="col-12 col-sm-2">' +
      '    <div class="roundy-image-uploader">' +
      '      <div class="roundy-image-prev" id="'+index+'">' +
      '        <div class="image-placeholder"><i class="fas fa-user"></i></div>' +
      '      </div>' +
      '      <div class="roundy-image-label">' +
      '        <label for="addcp-profilepicture-'+index+'"><i class="fas fa-camera"></i></label>' +
      '        <input type="file" name="addcp-profilepicture-'+index+'" id="addcp-profilepicture-'+index+'">' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="col-12 col-sm-10">' +
      '    <div class="row small-gutters">' +
      '      <div class="col-2">' +
      '        <div class="form-group has-feedback">' +
      '          <label for="addcp-title-'+index+'">Title</label>' +
      '          <select class="form-control" id="addcp-title-'+index+'">' +
      '            <option>-</option>' +
      '            <option>Mr.</option>' +
      '            <option>Ms.</option>' +
      '            <option>Mrs.</option>' +
      '            <option>Sir</option>' +
      '            <option>Madam</option>' +
      '            <option>Dr.</option>' +
      '            <option>Prof.</option>' +
      '            <option>Drs.</option>' +
      '            <option>Bapak</option>' +
      '            <option>Ibu</option>' +
      '          </select>' +
      '          <span class="fas fa-caret-down form-control-feedback"></span>' +
      '        </div>' +
      '      </div>' +
      '      <div class="col-5">' +
      '        <div class="form-group">' +
      '          <label for="addcp-firstname-'+index+'">First Name <span class="color-primary-red">*</span></label>' +
      '          <input type="text" class="form-control" id="addcp-firstname-'+index+'" placeholder="Enter First Name" required>' +
      '        </div>' +
      '      </div>' +
      '      <div class="col-5">' +
      '        <div class="form-group">' +
      '          <label for="addcp-position-'+index+'">Position</label>' +
      '          <input type="text" class="form-control" id="addcp-position-'+index+'" placeholder="Enter Position in Company">' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="row small-gutters">' +
      '      <div class="col-7">' +
      '        <div class="form-group has-feedback">' +
      '          <div class="row small-gutters">' +
      '            <div class="col-12">' +
      '              <label>Primary Phone Number <span class="color-primary-red">*</span></label>' +
      '            </div>' +
      '          </div>' +
      '          <div class="row small-gutters">' +
      '            <div class="col-3">' +
      '              <select class="form-control has-feedback" id="addcp-primary-phone-areacode-'+index+'" required>' +
      '                <option>-</option>' +
      '                <option>+1</option>' +
      '                <option>+20</option>' +
      '                <option>+31</option>' +
      '                <option>+32</option>' +
      '                <option>+33</option>' +
      '                <option>+353</option>' +
      '                <option>+354</option>' +
      '                <option>+375</option>' +
      '                <option>+43</option>' +
      '                <option>+44</option>' +
      '                <option>+44 1481</option>' +
      '                <option>+44 1534</option>' +
      '                <option>+44 1624</option>' +
      '                <option>+47</option>' +
      '                <option>+47 79</option>' +
      '                <option>+48</option>' +
      '                <option>+49</option>' +
      '                <option>+60</option>' +
      '                <option>+61</option>' +
      '                <option>+62</option>' +
      '                <option>+63</option>' +
      '                <option>+64</option>' +
      '                <option>+65</option>' +
      '                <option>+66</option>' +
      '                <option>+7</option>' +
      '                <option>+800</option>' +
      '                <option>+81</option>' +
      '                <option>+82</option>' +
      '                <option>+84</option>' +
      '                <option>+850</option>' +
      '                <option>+852</option>' +
      '                <option>+86</option>' +
      '                <option>+886</option>' +
      '              </select>' +
      '              <span class="fas fa-caret-down form-control-feedback"></span>' +
      '            </div>' +
      '            <div class="col-9">' +
      '              <input type="text" class="form-control no-label" id="addcp-primary-phone-number-'+index+'" placeholder="Enter Phone Number" value="" required>' +
      '            </div>' +
      '          </div>' +
      '          <div class="row small-gutters">' +
      '            <div class="col-12">' +
      '              <div class="errors">' +
      '              </div>' +
      '            </div>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '      <div class="col-5">' +
      '        <div class="form-group">' +
      '          <label for="addcp-emailaddress-'+index+'">Email address <span class="color-primary-red">*</span></label>' +
      '          <input type="email" class="form-control" id="addcp-emailaddress-'+index+'" placeholder="Enter email" value="" required>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="row">' +
      '  <div class="col-12">' +
      '    <div class="collapsible">' +
      '      <div class="collapsible-heading collapsible-heading-small" role="tab">' +
      '        <a class="collapsible-title collapsed" aria-controls="addcp-more-info" aria-expanded="false" data-toggle="collapse" href="#addcp-more-info-'+index+'">' +
      '          <div class="row small-gutters">' +
      '            <div class="col col-sm-2 hidden-xs-down"><hr></div>' +
      '            <div class="col-12 col-sm-10">' +
      '              <div class="collapsible-name">' +
      '                <span>Add Additional Info <i class="fas fa-angle-down"></i></span>' +
      '                <hr>' +
      '              </div>' +
      '            </div>' +
      '          </div>' +
      '        </a>' +
      '      </div>' +
      '      <div class="collapsible-collapse collapse" id="addcp-more-info-'+index+'" role="tabpanel">' +
      '        <div class="collapsible-body pt-4">' +
      '          <div class="row">' +
      '            <div class="col-12">' +
      '              <div class="row small-gutters">' +
      '                <div class="col-4">' +
      '                  <div class="form-group">' +
      '                    <label for="addcp-middlename-'+index+'">Middle Name</label>' +
      '                    <input type="text" class="form-control" id="addcp-middlename-'+index+'" placeholder="Enter Middle Name">' +
      '                  </div>' +
      '                </div>' +
      '                <div class="col-4">' +
      '                  <div class="form-group">' +
      '                    <label for="addcp-lastname-'+index+'">Last Name</label>' +
      '                    <input type="text" class="form-control" id="addcp-lastname-'+index+'" placeholder="Enter Last Name" value="">' +
      '                  </div>' +
      '                </div>' +
      '                <div class="col-2">' +
      '                  <div class="form-group">' +
      '                    <label for="addcp-prefix-'+index+'">Prefix</label>' +
      '                    <input type="text" class="form-control" id="addcp-prefix-'+index+'" placeholder="Enter Prefix" value="">' +
      '                  </div>' +
      '                </div>' +
      '                <div class="col-2">' +
      '                  <div class="form-group">' +
      '                    <label for="addcp-suffix-'+index+'">Suffix</label>' +
      '                    <input type="text" class="form-control" id="addcp-suffix-'+index+'" placeholder="Enter Suffix" value="">' +
      '                  </div>' +
      '                </div>' +
      '              </div>' +
      '              <div class="row small-gutters">' +
      '                <div class="col-12">' +
      '                  <div class="form-group">' +
      '                    <label for="addcp-secondary-phone-number-'+index+'">Secondary Phone Number</label>' +
      '                    <input type="text" class="form-control" id="addcp-secondary-phone-number-'+index+'" placeholder="Enter Secondary Phone Number">' +
      '                  </div>' +
      '                </div>' +
      '              </div>' +
      '            </div>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div class="crmitemform-footer text-right">' +
      '  <a class="crmitemformsave btn btn-sm btn-softgreen px-4" id="addcp-save-'+index+'">Save</a>' +
      '</div>';

      return dom;
  }

  // Delete Item
  var deltarget;
  $(document).on('click', '.crmitemformdelete', function (e) {
    deltarget = $(this).data('target');
    $('#'+deltarget).remove();
  });

  // Add Secondary Contact Person
  var container = $('#secondary-contact-persons');
  var indexget = container.children().length + 1;
  $('#add-secondary-contact-person').on( 'click', function (e) {
    indexget = container.children().length;
    container.append(secondaryContactSelect(indexget));
    $('#create-select-person-'+(indexget)).select2({
      allowClear: true,
      escapeMarkup: function (markup) { return markup; },
      placeholder: "Select or Add New",
      language: {
          noResults: function () {
              return '<a class="notfoundaddnew create-contact-person">Not found, <b>Add New Contact Person</b></a>';
          }
      }
    });
  });

  // Add Secondary Contact Person, Create New Contact Person
  var addtarget;
  $(document).on('click', '.create-contact-person', function (e) {

    // Get id of select2 options ul
    addtarget = $(this).parent().parent().attr('id');

    // Filter the id to get index
    addtarget = addtarget.replace("select2-create-select-person-", "");
    addtarget = addtarget.replace("-results", "");
    console.log(addtarget);

    // Remove the select input, add a form to enter data for a new contact
    $('#secondary-contact-person-select2-contain-'+addtarget).val('Create New Contact');
    $('#create-contact-person-'+addtarget).append(secondaryContactAddNew(addtarget));
  });

  // Save Secondary Contact Person
  $(document).on('click', '.crmitemformsave', function (e) {
    console.log('AAAAAAAAAAAAAAa');
    
    pic = 'placeholders/profilepictures/111111.png';
    name = 'Ms. Anna Kerman, PhD';
    position = 'CTO';
    mail = 'anna.kerman@kerbal-aerospace.com';
    phone = '+35481234567890';

    container.append(secondaryContact(pic, name, position, mail, phone));
  });

  // Add Secondary Contact Person, Selected Existing Contact Person
  $(document).on('change', '.secondary-contact-select-input', function (e) {
    console.log('AAAAAAAAAAAAAAa');
    
    pic = 'placeholders/profilepictures/111111.png';
    name = 'Ms. Anna Kerman, PhD';
    position = 'CTO';
    mail = 'anna.kerman@kerbal-aerospace.com';
    phone = '+35481234567890';

    container.append(secondaryContact(pic, name, position, mail, phone));
  });

  // Add All Secondary Contact Person
  var container = $('#secondary-contact-persons');
  var indexget = container.children().length;
  $('#add-all-secondary-contact-person').on( 'click', function (e) {
    indexget = container.children().length;
    
    pic = 'placeholders/profilepictures/111111.png';
    name = 'Ms. Anna Kerman, PhD';
    position = 'CTO';
    mail = 'anna.kerman@kerbal-aerospace.com';
    phone = '+35481234567890';

    container.append(secondaryContact(pic, name, position, mail, phone));
  });

}); // End of use strict

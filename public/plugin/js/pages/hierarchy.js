//[Hierarchy Javascript]

document.addEventListener('DOMContentLoaded', function () {
  var oc = $('#hierarchy-container').orgchart({
    'data': $('#hierarchy-data'),
    'parentNodeSymbol': '',
    'createNode': function ($node, data) {
      var deleteMenuIcon = $('<i>', {
        'class': 'fa fa-trash delete-menu-icon',
        'id': 'delete-menu-icon' + $node[0].id,
        'data-placement': 'top',
        'data-toggle': 'tooltip',
        'title': 'Delete Node',
        click: function () {

          $.ajax({
            url: "/hierarchy/ajax-compare-report-to",
            type: "POST",
            data: {
              "node_id": $node[0].id
            },
            success: function (response) {
              // console.log(response);
              if (response == "true") {
                swal("Unable to delete node", "Please move or delete the nodes under this hierarchy. <br><br> <strong style='font-weight: bold'>Warning : Deleting a node may damage the user's data.</strong>", "error");
              } else {
                if (!$node) {
                  alert('Please select one node in orgchart');
                  return;
                } else if ($node[0] === $('.orgchart').find('.node:first')[0]) {
                  if (!window.confirm('Are you sure you want to delete the whole chart?')) {
                    return;
                  }
                }
                $('.hierarchy-modal-delete-confirm').modal('show');
                $('#button_delete_confirm_hierarchy').attr("onclick", "Confirm_Delete_Hierarchy(event," + $node[0].id + ");");
              }
            }
          });
        }
      });
      var editMenuIcon = $('<i>', {
        'class': 'fa fa-edit edit-menu-icon',
        'id': 'edit-menu-icon' + $node[0].id,
        'data-placement': 'top',
        'data-toggle': 'tooltip',
        'title': 'Edit Node',
        click: function (e) {

          e.stopPropagation();

          var event;
          getDetailEditHierarchy(event, $node[0].id, $node[0].textContent, $node.closest('.nodes').prevObject[0].dataset.parent);

          $('.hierarchy-edit-panel').addClass('active');
          $('.hierarchy-select-panel').removeClass('active');
          var $this = $(this).parent();
          $('#edited-node').val($this.find('.title').text()).data('node', $this);
          
          // $('.hierarchy-edit-modal').modal('show');
          //  document.getElementById('hidden_input_edit_hierarchy_id').value = $node[0].id;
          //  document.getElementById('input_edit_hierarchy_name').value = $node[0].textContent;
          //  document.getElementById('input_edit_hierarchy_report_to').value = $node.closest('.nodes').prevObject[0].dataset.parent;

        }
      });
      $node.append(deleteMenuIcon);
      $node.append(editMenuIcon);
    }
  });

  $(document).on('click', function (event) {
    $('.hierarchy-select-panel').removeClass('active');
    $('.hierarchy-edit-panel').removeClass('active');
  });
  $(document).on('click', '.hierarchy-select-panel', function (e) {
    e.stopPropagation();
  });
  $(document).on('click', '.hierarchy-edit-panel', function (e) {
    e.stopPropagation();
  });

  $('#edit-menu-icon0').css("display", "none");
  $('#delete-menu-icon0').css("display", "none");

  oc.$chartContainer.on('click', '.node', function (e) {
    e.stopPropagation();
    $('.hierarchy-select-panel').addClass('active');
    $('.hierarchy-edit-panel').removeClass('active');
    var $this = $(this);
    $('#selected-node').val($this.find('.title').text()).data('node', $this);
  });

  oc.$chartContainer.on('click', '.orgchart', function (event) {
    if (!$(event.target).closest('.node').length) {
      $('#selected-node').val('');
    }
  });

  $('input[name="chart-state"]').on('click', function () {
    $('.orgchart').toggleClass('edit-state', this.value !== 'view');
    $('#edit-panel').toggleClass('edit-state', this.value === 'view');
    if ($(this).val() === 'edit') {
      $('.orgchart').find('tr').removeClass('hidden')
        .find('td').removeClass('hidden')
        .find('.node').removeClass('slide-up slide-down slide-right slide-left');
    } else {
      $('#btn-reset').trigger('click');
    }
  });

  $('input[name="node-type"]').on('click', function () {
    var $this = $(this);
    if ($this.val() === 'parent') {
      $('#edit-panel').addClass('edit-parent-node');
      $('#new-nodelist').children(':gt(0)').remove();
    } else {
      $('#edit-panel').removeClass('edit-parent-node');
    }
  });

  $('#btn-add-input').on('click', function () {
    $('#new-nodelist').append('<li><input type="text" class="new-node"></li>');
  });

  $('#btn-remove-input').on('click', function () {
    var inputs = $('#new-nodelist').children('li');
    if (inputs.length > 1) {
      inputs.last().remove();
    }
  });

  $('#btn-add-nodes').on('click', function () {
    var $chartContainer = $('#hierarchy-container');
    var nodeVals = [];
    $('#new-nodelist').find('.new-node').each(function (index, item) {
      var validVal = item.value.trim();
      if (validVal.length) {
        nodeVals.push(validVal);
      }
    });
    var $node = $('#selected-node').data('node');
    if (!nodeVals.length) {
      alert('Please input value for new node');
      return;
    }
    var nodeType = $('input[name="node-type"]:checked');
    if (!nodeType.length) {
      alert('Please select a node type');
      return;
    }
    if (nodeType.val() !== 'parent' && !$('.orgchart').length) {
      alert('Please create the root node firstly when you want to build up the orgchart from the scratch');
      return;
    }
    if (nodeType.val() !== 'parent' && !$node) {
      alert('Please select one node in orgchart');
      return;
    }
    if (nodeType.val() === 'parent') {
      // if (!$chartContainer.children('.orgchart').length) {// if the original chart has been deleted
      //   // oc = $chartContainer.orgchart({
      //   //   'data' : { 'name': nodeVals[0] },
      //   //   'exportButton': true,
      //   //   'exportFilename': 'SportsChart',
      //   //   'parentNodeSymbol': 'fa-th-large',
      //   //   'createNode': function($node, data) {
      //   //     $node[0].id = $node.closest('table').prevObject[0].id;
      //   //   }
      //   // });
      //   // oc.$chart.addClass('view-state');
      //   	var current_root = $chartContainer.find('.node:first')[0].id;
      //  console.log(current_root);
      //   	console.log("test");
      // } else {
      // var current_root = $chartContainer.find('.node:first')[0].id;
      // var new_root_name = nodeVals[0];
      // changeRoot(event, current_root, new_root_name);
      // console.log(current_root);
      // console.log(new_root_name);
      // oc.addParent($chartContainer.find('.node:first'), { 'name': nodeVals[0], 'id': "" });

      // }
    } else if (nodeType.val() === 'siblings') {
      if ($node[0].id === oc.$chart.find('.node:first')[0].id) {
        alert('You are not allowed to directly add sibling nodes to root node');
        return;
      }
      oc.addSiblings($node, nodeVals.map(function (item) {
        // console.log($node.closest('.nodes').prevObject[0].dataset.parent);
        addTreeToDatabase(event, $node.closest('.nodes').prevObject[0].dataset.parent, item);
        return {
          'name': item,
          'relationship': '110',
          'id': ""
        };
      }));
    } else {
      var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
      if (!hasChild) {
        var rel = nodeVals.length > 1 ? '110' : '100';
        oc.addChildren($node, nodeVals.map(function (item) {
          addTreeToDatabase(event, $node.closest('table').prevObject[0].id, item);
          return {
            'name': item,
            'relationship': rel,
            'id': ""
          };
        }));
      } else {
        oc.addSiblings($node.closest('tr').siblings('.nodes').find('.node:first'), nodeVals.map(function (item) {
          addTreeToDatabase(event, $node.closest('.nodes').prevObject[0].id, item);
          return {
            'name': item,
            'relationship': '110',
            'id': ""
          };
        }));
      }
    }
  });

  $('#btn-delete-nodes').on('click', function () {
    var $node = $('#selected-node').data('node');
    if (!$node) {
      alert('Please select one node in orgchart');
      return;
    }
    // $.ajax({
    //   url: "/hierarchy/ajax-compare-report-to",
    //   type: "POST",
    //   data: {
    //     "node_id": $node[0].id
    //   },
    //   success: function (response) {
    //     if (response == "true") {
    //       swal("Couldn't Delete The Node", "This Node Had Children, <br> Please Change The Parent Of The Children <br> or <br> Delete The Children", "error");
    //     } else {
    //       if (!$node) {
    //         alert('Please select one node in orgchart');
    //         return;
    //       } else if ($node[0] === $('.orgchart').find('.node:first')[0]) {
    //         if (!window.confirm('Are you sure you want to delete the whole chart?')) {
    //           return;
    //         }
    //       }
    //       deleteTreeToDatabase(event, $node[0].id);
    //       oc.removeNodes($node);
    //       $('#selected-node').val('').data('node', null);
    //     }
    //   }
    // });
  });

  $('#btn-reset').on('click', function () {
    $('.orgchart').find('.focused').removeClass('focused');
    $('#selected-node').val('');
    $('#new-nodelist').find('input:first').val('').parent().siblings().remove();
    $('#node-type-panel').find('input').prop('checked', false);
  });

  function addTreeToDatabase(event, data_parent_id, name)
  {
    // console.log(data_parent_id, name)
    $('#hidden_hierarchy_id').val('');
    // $.ajax({
    //   url: "/hierarchy/ajax-add-tree-to-database", 
    //   type: "POST",
    //   data: {"data_parent_id" : data_parent_id, "name" : name},
    //   success: function(response)
    //   {
    //     // console.log(response);
    //     // document.getElementById('hidden_hierarchy_id').value = response;
    //     window.location = "/hierarchy/list";
    //   }
  
    // });
  }
  
  function deleteTreeToDatabase(event, tree_node_id)
  {
    // console.log(tree_node_id);
    // $.ajax({
    //   url: "/hierarchy/ajax-delete-tree-to-database", 
    //   type: "POST",
    //   data: {"tree_node_id" : tree_node_id},
    //   success: function(response)
    //   {
        
    //   }
  
    // });
  }
  function getDetailEditHierarchy(event, id, name, report_to) {

    // $.ajax({
    //   url: "/hierarchy/ajax-get-detail-edit-tree",
    //   type: "POST",
    //   data: {
    //     "id": id
    //   },
    //   success: function (response) {
    //     $('.hierarchy-edit-modal').modal('show');
    //     $('#input_edit_hierarchy_report_to').html(response);
    //     document.getElementById('hidden_input_edit_hierarchy_id').value = id;
    //     document.getElementById('input_edit_hierarchy_name').value = name;
    //     document.getElementById('input_edit_hierarchy_report_to').value = report_to;
    //   }

    // });
  }

  function saveHierarchyNodeEdit(event) {
    var data_parent_id = $('#input_edit_hierarchy_report_to').val();
    var node_id = $('#hidden_input_edit_hierarchy_id').val();
    var name = $('#input_edit_hierarchy_name').val();

    // $.ajax({
    //   url: "/hierarchy/ajax-edit-tree-to-database",
    //   type: "POST",
    //   data: {
    //     "data_parent_id": data_parent_id,
    //     "node_id": node_id,
    //     "name": name
    //   },
    //   success: function (response) {
    //     $('.hierarchy-edit-modal').modal('hide');
    //     window.location = "/hierarchy/list";
    //   }

    // });
  }

  // Perfect Scroll
  const ps1 = new PerfectScrollbar('.perfectscroll-hierarchy', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });
  
});

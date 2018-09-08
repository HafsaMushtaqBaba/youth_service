// initialize the validator function
  validator.message.date = 'not a real date';

  // validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
  $('form')
    .on('blur', 'input[required], input.optional, select.required', validator.checkField)
    .on('change', 'select.required', validator.checkField)
    .on('keypress', 'input[required][pattern]', validator.keypress);

  $('.multi.required').on('keyup blur', 'input', function() {
    validator.checkField.apply($(this).siblings().last()[0]);
  });

  $('form').submit(function(e) {
    e.preventDefault();
    var submit = true;

    // evaluate the form using generic validaing
    if (!validator.checkAll($(this))) {
      submit = false;
    }
    if (submit){
      // this.submit();
      var form_data = new FormData(this);
        $.ajax({
            type: 'post',
            url: 'galleryDAO.php',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(answ){
                location.reload();
            }
        });
    }

    return false;
  });


$(document).ready(function() {
    

    galleryTable = $('#datatable_gallery').dataTable({
        dom: "Bfrtip",
        destroy: true,
        ajax: "galleryDAO.php",
        order: [[ 3, 'desc' ]],
        "columns": [
                {
                    title: "ID",
                    data: 'id',
                    visible: false
                },
                {
                    title: "File Name",
                    'data' : 'name'
                },
                
                {
                    title: "Updated On",
                    'data' : 'uploaded_at'
                },
                {
                    title: "Action",
                    "mData": "path_compress",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href=' +data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                }
        ],select: {
            style:    'os',
            blurable: true,
        },
        altEditor: true,
        responsive: true,
        buttons: [ 
            {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'        // do not change name
            }
        ],
        "language": {
            "emptyTable": "No records found"
        }
        
    });

});



    
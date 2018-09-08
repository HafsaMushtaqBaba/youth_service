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
            url: 'districtDAO.php',
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
  
    districtTable = $('#datatable_district').DataTable({

        dom: "Bfrtip",

        destroy: true,

        "ajax":'districtDAO.php',

        order: [[ 1, 'asc' ]],

        "columns":[

                {

                    title: "District ID",

                    data : 'district_id',

                    type: 'readonly',

                    visible: true

                },

                {   title: "District Name",

                    data : 'district_name',

                    type: 'text'

                }




        ],

        select: {

            style:    'os',

            blurable: 'true'

        },

        altEditor: true,

        responsive: false,

        buttons: [

            {

                extend: 'selected', // Bind to Selected row

                text: 'Edit',

                name: 'edit'        // do not change name

            },

            {

                extend: 'selected', // Bind to Selected row

                text: 'Delete',

                name: 'delete'        // do not change name

            },
           
            {
              extend: 'print',
              className : "btn-md",
              exportOptions: {
                  columns: ':visible'
              }
            },
            'colvis'

        ],

        "language": {

            "emptyTable": "No records found"

        }

    });
    
});
    
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
            url: 'schoolDAO.php',
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
  
    schoolTable = $('#datatable_school').DataTable({

        dom: "Bfrtip",

        destroy: true,

        "ajax":'schoolDAO.php',

        order: [[ 1, 'asc' ]],

        "columns":[

                {

                    title: "School ID",

                    data : 'school_id',

                    type: 'readonly',

                    visible: true

                },

                {   title: "School Name",

                    data : 'school_name',

                    type: 'text'

                },

                {   title: "Zone Name",

                    data : 'zone_name',
                    type: 'readonly',
                    visible: true


                },

                {   title: "District Name",

                    data : 'district_name',
                    type: 'readonly',
                    visible: true

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

function getDistricts() {
            $.ajax({
                type:'POST',
                url:'districtDAO.php',
                data:'districts= districts',
                success:function(result){
                    $("#district_name").html(result);
                }
            });
}

function getZones(district_id) {
            $.ajax({
                type:'POST',
                url:'zoneDAO.php',
                data:'district='+district_id.value ,
                success:function(result){
                    $("#zone_name").html(result);
                }
            });
}
    

$(document).ready(function() {
  
    organisationTable = $('#datatable_organisation').DataTable({

        dom: "Bfrtip",

        destroy: true,

        "ajax":'organisationDAO.php',

        order: [[ 1, 'asc' ]],

        "columns":[

                {

                    title: "ID",

                    data : 'employee_id',

                    type: 'readonly',

                    visible: false

                },

                {   title: "Name",

                    data : 'employee_name',

                    type: 'text'

                },

                {

                    title: "School",

                    data : 'employee_school',

                    type: 'readonly',

                    visible: true

                },

                {

                    title: "Zone",

                    data : 'employee_zone',

                    type: 'readonly',

                    visible: true

                },

                {

                    title: "District",

                    data : 'employee_district',

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
    

$(document).ready(function() {
    participantsTable = $('#datatable_participants').DataTable({

        dom: "Bfrtip",

        destroy: true,

        "ajax":'participantDAO.php',

        order: [[ 1, 'asc' ]],

        "columns":[

                {

                    title: "StudentID",

                    data : 'student_id',

                    type: 'readonly',

                    visible: false

                },{

                    title: "Aadhar ID",

                    data : 'student_aadhar',

                    type: 'readonly',

                    visible: true

                },

                {   title: "Name",

                    data : 'student_name',

                    type: 'text'

                },

                {   title: "Parentage",

                    data : 'student_parentage',

                    type: 'text'

                },

                {

                    title: "Class",

                    data : 'student_class',

                    type: 'readonly',

                    visible: true

                },

                {

                    title: "Age Group",

                    data : 'student_age_group',

                    type: 'readonly',

                    visible: true

                },
                {

                    title: "Games Played",

                    data : 'games_played',

                    type: 'readonly',

                    visible: true

                },

                {

                    title: "Action",

                    "mData": "student_id",

                    "bSortable": false,

                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href="certificate/production/index.php?nos='+data+'&certType=participation" target="_blank"> ' + 'Print Participation Certificate' + '</a>';

                    }

                },

                {

                    title: "Action",

                    "mData": "student_id",

                    "bSortable": false,

                    "mRender": function(data) {

                        return '<a class="btn btn-dark btn-sm" href="certificate/production/index.php?nos='+data+'&certType=merit" target="_blank"> ' + 'Print Merit Certificate' + '</a>';

                    }

                },

                {   title: "School",

                    data : 'student_school',

                    type: 'text'

                },

                {   title: "District",

                    data : 'student_district',

                    type: 'text'

                },

                {   title: "Gender",

                    data : 'student_gender',

                    type: 'text'

                },

                {   title: "DOB",

                    data : 'student_dob',

                    type: 'text'

                },

                {   title: "Account No.",

                    data : 'student_bank',

                    type: 'text'

                },

                {   title: "IFSC Code",

                    data : 'student_ifsc',

                    type: 'text'

                },
                {
                    title: "Aadhar",
                    "mData": "aadhar_path",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href='+data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                },
                {
                    title: "Birth Certificate",
                    "mData": "birth_path",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href='+data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                },
                {
                    title: "Bonafide",
                    "mData": "bonafide_path",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href='+data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                },
                {
                    title: "Indemnity Bond",
                    "mData": "bonafide_path",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href='+data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                },
                {
                    title: "Previous Marks Certificate",
                    "mData": "previous_marks_path",
                    "bSortable": false,
                    "mRender": function(data) {
                        return '<a class="btn btn-dark btn-sm" href='+data + ' target="_blank"> ' + 'View' + '</a>';
                    }
                }



        ],

        select: {

            style:    'os',

            blurable: 'true'

        },

        altEditor: true,

        responsive: true,

        buttons: [

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
    
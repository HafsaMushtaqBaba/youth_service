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
            url: 'organisationDAO.php',
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




function getDistricts() {
            $.ajax({
                type:'POST',
                url:'districtDAO.php',
                data:'districts= districts',
                success:function(result){
                    $("#district_name").html(result);
                    $("#district1_name").html(result);
                }
            });
}

function getEmployees() {
            $.ajax({
                type:'POST',
                url:'organisationDAO.php',
                data:'employees= employees',
                success:function(result){
                    $("#employee1_name").html(result);
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


function getSchools(school_id) {
            $.ajax({
                type:'POST',
                url:'schoolDAO.php',
                data:'zone='+school_id.value ,
                success:function(result){
                    $("#school_name").html(result);
                }
            });
}  



function getZones1(district_id) {
            $.ajax({
                type:'POST',
                url:'zoneDAO.php',
                data:'district='+district_id.value ,
                success:function(result){
                    $("#zone1_name").html(result);
                }
            });
}


function getSchools1(school_id) {
            $.ajax({
                type:'POST',
                url:'schoolDAO.php',
                data:'zone='+school_id.value ,
                success:function(result){
                    $("#school1_name").html(result);
                }
            });
}   
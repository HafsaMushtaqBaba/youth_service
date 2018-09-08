<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Employees | Youth Service</title>

    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    
    <!-- Custom Theme Style -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
    <!-- PNotify -->
    <link href="../vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="../vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
    <link href="../vendors/pnotify/dist/pnotify.nonblock.css" rel="stylesheet">
  </head>

  <body class="nav-md" onload="getEmployees();getDistricts();">
    <div class="container body">
      <div class="main_container">
        <?php include 'includes/baseLayout.php' ?>

        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Employees</h3>
              </div>

              
            </div>
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Add Employee <small>Add an Employee</small></h2>
                  
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <form class="form-horizontal form-label-left" novalidate>
                      </p>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="district_name"> Select District <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" onchange="getZones(this);" name="district_name" id="district_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="zone_name"> Select Zone <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" name="zone_name" onchange="getSchools(this);" id="zone_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="school_name"> Select School <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" name="school_name" id="school_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="employee_name"> Employee Name <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="employee_name" class="form-control col-md-7 col-xs-12" data-validate-length-range="6"  name="employee_name" placeholder="e.g Employee1" required="required" type="text">
                        </div>
                      </div>
                      <div class="ln_solid"></div>
                      <div class="form-group">
                        <div class="col-md-6 col-md-offset-3">
                          <button id="send" type="submit" class="btn btn-success">Add</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Transfer Employee <small>Transfer an Employee</small></h2>
                  
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <form class="form-horizontal form-label-left" novalidate>
                      </p>

                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="employee1_name"> Select Employee <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" name="employee1_name" id="employee1_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="district1_name"> Select District <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" onchange="getZones1(this);" name="district1_name" id="district1_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="zone1_name"> Select Zone <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" name="zone1_name" onchange="getSchools1(this);" id="zone1_name" class="form-control col-md-7 col-xs-12" required="required">
                            
                          </select>
                        </div>
                      </div>
                      <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="school1_name"> Select School <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <select class="form-control" name="school1_name" id="school1_name" class="form-control col-md-7 col-xs-12" required="required">                          
                          </select>
                        </div>
                      </div>
                      <div class="ln_solid"></div>
                      <div class="form-group">
                        <div class="col-md-6 col-md-offset-3">
                          <button id="send" type="submit" class="btn btn-success">Transfer</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            

      
            </div>
          </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <?php include 'includes/footer.php'; ?>
        <!-- /footer content -->
      </div>
    </div>

    <!-- jQuery -->
    <script src="../vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="../vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="../vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="../vendors/nprogress/nprogress.js"></script>
    <!-- validator -->
    <script src="../vendors/validator/validator.js"></script>
    <script src="../vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="js/employee.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="../build/js/custom.min.js"></script>
    <!-- PNotify -->
    <script src="../vendors/pnotify/dist/pnotify.js"></script>
    <script src="../vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="../vendors/pnotify/dist/pnotify.nonblock.js"></script>
    <?php 
      
      if(isset($_SESSION['added']) && !empty($_SESSION['added'])) {
         if ($_SESSION['added'] == 'success') {
           ?> 
           <script>
              //alert('here');
              $(document).ready(function () {
                  new PNotify({
                        title: 'Status',
                        text: 'Employee Added Sucessfully!',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
              });      
           </script> 
          <?php
         }
         else{
            ?> 
           <script>
              $(document).ready(function () {
                  new PNotify({
                        title: 'Status',
                        text: 'There Was a Problem. Please Try Again!',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
              });      
           </script> 
          <?php
         }
         unset($_SESSION['added']);
      }
    ?>
    <?php 
      
      if(isset($_SESSION['updated']) && !empty($_SESSION['updated'])) {
         if ($_SESSION['updated'] == 'success') {
           ?> 
           <script>
              //alert('here');
              $(document).ready(function () {
                  new PNotify({
                        title: 'Status',
                        text: 'Employee Transfered Sucessfully!',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
              });      
           </script> 
          <?php
         }
         else{
            ?> 
           <script>
              $(document).ready(function () {
                  new PNotify({
                        title: 'Status',
                        text: 'There Was a Problem. Please Try Again!',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
              });      
           </script> 
          <?php
         }
         unset($_SESSION['added']);
      }
    ?>
  </body>
  </body>
</html>
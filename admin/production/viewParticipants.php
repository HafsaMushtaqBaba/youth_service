<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Youth | Participants</title>

    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- Datatables -->
    <link href="../vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
    <!-- PNotify -->
    <link href="../vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="../vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
    <link href="../vendors/pnotify/dist/pnotify.nonblock.css" rel="stylesheet">
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <?php include 'includes/baseLayout.php'; ?>

        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Participants <small>List Of All Participants</small></h3>
              </div>
            </div>

            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    
                    <ul class="nav navbar-right panel_toolbox">
                      
                      <li><a class="close-link"><i class="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <p class="text-muted font-13 m-b-30">
                      List Of All The Participants
                    </p>
                    <table  id="datatable_participants" class="table table-striped table-bordered dt-responsive" style="width:100%;">
                      
                    </table>
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
    <!-- iCheck -->
    <script src="../vendors/iCheck/icheck.min.js"></script>
    <!-- Datatables -->
    <script src="../vendors/datatables_1.10.13/media/js/jquery.dataTables.min.js"></script>
    <script src="../vendors/datatables_1.10.13/media/js/dataTables.bootstrap.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/buttons/js/dataTables.buttons.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/buttons/js/buttons.bootstrap.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/buttons/js/buttons.flash.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/buttons/js/buttons.html5.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/buttons/js/buttons.print.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/fixed_header/js/dataTables.fixedHeader.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/key_table/js/dataTables.keyTable.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/responsive/js/dataTables.responsive.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/responsive/js/responsive.bootstrap.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/responsive/js/responsive.bootstrap.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/scroller/js/dataTables.scroller.min.js"></script>
    <script src="../vendors/datatables_1.10.13/extensions/select/js/dataTables.select.min.js"></script>

    <!--datatables css-->
    <link href="../vendors/datatables_1.10.13/extensions/buttons/css/buttons.dataTables.min.css" rel="stylesheet">
    <link href="../vendors/datatables_1.10.13/media/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="../vendors/datatables_1.10.13/extensions/select/css/select.dataTables.min.css" rel="stylesheet">
    <script src="../vendors/jszip/dist/jszip.min.js"></script>
    <script src="../vendors/pdfmake/build/pdfmake.min.js"></script>
    <script src="../vendors/pdfmake/build/vfs_fonts.js"></script>
    <script src="js/dataTables.altEditor.js"></script>
    <script src="js/buttons.colVis.min.js"></script>
    <script src="js/participants.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="../build/js/custom.min.js"></script>
    <!-- PNotify -->
    <script src="../vendors/pnotify/dist/pnotify.js"></script>
    <script src="../vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="../vendors/pnotify/dist/pnotify.nonblock.js"></script>

    
  </body>
</html>
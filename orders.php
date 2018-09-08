<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Youth Service |Orders </title>

    <!-- Bootstrap -->
    <link href="admin/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="admin/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="admin/vendors/nprogress/nprogress.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="admin/build/css/custom.min.css" rel="stylesheet">
  </head>

  <body class="nav-md">
    <div class="container body" >
      <div class="main_container">
              

        <div class="row" >
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel" style="height: -webkit-fill-available;">
              <div class="x_title">
                <h2>Recent Orders</h2>
                
                <div class="clearfix"></div>
              </div>
              <div class="x_content">
                  <div class="x_content">

                    <p>Latest orders </p>

                    <!-- start project list -->
                    <table class="table table-striped projects">
                      <thead>
                        <tr>
                          <th class="text-center" style="width: 1%">#</th>
                          <th class="text-center" style="width: 20%">Order Title</th>                        
                          <th class="text-center" style="width: 20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php include 'admin/production/includes/connection.php';
                        $sql_query = "SELECT * FROM orders";

                        $res = $connect -> query($sql_query);
                        $result = array();

                        if ($res) {
                          while ($row = $res -> fetch_assoc()) {

                        ?>
                        <tr>
                          <td class="text-center">#</td>
                          <td class="text-center">
                            <a><?php echo $row['name'];?></a>
                            <br />
                            <small>Created <?php echo $row['uploaded_at'];?></small>
                          </td>
                          
                          <td class="text-center">
                            <a href="<?php echo 'admin/production/'.$row['path_compress'];?>" target="_blank" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View Order </a>
                            
                          </td>
                        </tr>
                      <?php }}?>

                      </tbody>
                    </table>
                    <!-- end project list -->

                  </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <!-- /footer content -->
      </div>
    </div>

    <!-- jQuery -->
    <script src="admin/vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="admin/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="admin/vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="admin/vendors/nprogress/nprogress.js"></script>
    
    <!-- Custom Theme Scripts -->
    <script src="admin/build/js/custom.min.js"></script>
  </body>
</html>

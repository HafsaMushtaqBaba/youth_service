<!-- url u need to hit 
  certificate/production/index.php?nos=Amir%20Bashir%20Wagay&parentage=Farooq%20Ahmad&dob=25%20March%202017&scoc=SSM%20COLLEGE%20OF%20ENGINEERING%20AND%20TECH&district=Anantnag&gaoe=Vollyball&position=3rd&venue=Bakshi%20Staduin&from=August&todate=September&yearOC=2018&rrNumber=122112&certType=merit&gender=0&uAge=17 -->


<!-- paramerters you need to pass for successfull inflation -->

<!-- 
    
    nos           >>>>>>>>>>>   "Name Of Student"
    parentage     >>>>>>>>>>>   "parentage of Student"
    dob           >>>>>>>>>>>   "Date Of birth"
    scoc          >>>>>>>>>>>   "School or College"
    district      >>>>>>>>>>>   "District"
    gaoe          >>>>>>>>>>>   "Game or event"
    position      >>>>>>>>>>>   "position text"
    venue         >>>>>>>>>>>   "Venue"
    from          >>>>>>>>>>>   "From Date Month"
    todate        >>>>>>>>>>>   "To Date Month"
    yearOC        >>>>>>>>>>>   "Year"
    rrNumber      >>>>>>>>>>>   "RR number"
    certType      >>>>>>>>>>>   "merit || participation"
    gender        >>>>>>>>>>>   "0 -> female, 1 -> male"
    
  
 -->

<!DOCTYPE html>
<html>
<head>
	<title>Print Certificate</title>

<style type="text/css">
@import url(https://fonts.googleapis.com/earlyaccess/notonaskharabic.css);
p{
  font-family: 'Noto Naskh Arabic', serif;
  font-size: 1.5em;
}
@font-face {
    font-family: old;
    src: url(../assets/old.ttf);
}
@font-face {
    font-family: pricedown;
    src: url(../assets/pricedown.ttf);

}
path {
  fill: transparent;
}
.container_for_arc {
  /*centers in the container*/
  text-align: center;
}
div.circTxt {
  /*allows for centering*/
  display: inline-block;
  /*adjust as needed*/
  margin-bottom: 128px;
  color: black;
  font-size: 40px;
}
* {margin: 0; padding: 0;}
#container {height: 100%; width:100%; font-size: 0;}
#left, #middle, #right {display: inline-block; *display: inline; zoom: 1; vertical-align: top; font-size: 12px;}
#left {width: 50%; background: white;}
#middle {width: 50%; background: white;}
#right {width: 25%; background: white;}

input[type='checkbox'] {
    width:20px;
    height:20px;
    background:transparent;
    border-radius:5px;
    border:2px solid #555;
}
/*input[type='checkbox']:checked {
    background: blue;
}
*/
</style>
</head>
<body>

    <div id="content">
    	
        <div  style="height: inherit; border:35px solid #0000FF;">
          	 <div style="border:15px solid red;">

          <div style="height: 470px;">



          <div style="padding-top: 100px; position: absolute; left: 50%;">
          	<div style="style="position: relative; text-align: center;">

          			<p style="font-family: pricedown; font-size: 38px; font-style: bold; text-align: center;" id="demo1">DEPARTMENT OF YOUTH SERVICES AND SPORTS</p>
          		
          	</div>
          	
          </div>
          		
            <!-- section for logos at the top  -->  
            <div style="width: 100%;">

                <div  style="padding: 20px; float:left;  width: 10%;">
                    <img height="120" width="120"  src="../assets/logo.png">
                </div>
                
                <div style="padding-top: 20px; padding-left: 10px; padding-right: 1px; float:right;  width: 20%;">
              	     <img height="110" width="90" src="../assets/red_logo.jpeg">
                </div>

                 <div style="padding: 20px; float:right;  width: 50%;">
                 	    <p style="font-family: 'Noto Naskh Arabic', serif; font-size: 25px; color: grey; text-align: center;">حکومت جموں و کشمیر</p>
              	      <p style="font-weight: bold;font-size: 19px; color: red; text-align: center;">Government Of Jammu and Kashmir</p>
                 </div>

            </div>

            <div style="clear:both"></div>


            <!-- section within arc -->	
            <div  style="position: relative; text-align: center;">
              
                <hr style="height:7pt; visibility:hidden;" />
                <p style="font-weight: bold;font-size: 21px; color: red; text-align: center;">Inter-District Tournament</p>
              	<p style="font-size: 21px; color: black; text-align: center;">(Kashmir Provience)</p>
               	<hr style="height:7pt; visibility:hidden;" />
               	<p style="font-size: 21px; color: black; text-align: center;">Year <label id="yearOC">______</label></p>
               	<hr style="height:7pt; visibility:hidden;" />
               	<p style="font-family: 'Noto Naskh Arabic', serif; font-size: 32px; color: grey; text-align: center;">ڈپارٹمنٹ آف یوتھ سروسز اینڈ سپورٹس</p>
               	<hr style="height:7pt; visibility:hidden;" />
               	<hr style="height:7pt; visibility:hidden;" />
               
              
                <p style="padding-right: 61px; font-size: 16px; color: black; text-align: right;">Registeration No: JDY/YSS/ <label id="rrNumber">_________________</label></p>
                <hr style="height:7pt; visibility:hidden;" />
               	<hr style="height:7pt; visibility:hidden;" />
                <p id="certType" style="font-size:40px; font-family: old; color: red; text-align: center;">Participation Certificate</p>   	



            </div>



            </div>	

          <div  style=" opacity: 0.3; text-align: center; position: absolute; padding-top: 90px; padding-left: 230px;">

            <img height="230" width="220" src="../assets/red_logo.jpeg">

          </div>
              
          <div style="padding: 40px;">
          	<p style="  font-style: normal; font-size: 20px;"> Name :<label id="nos">______________________________________________</label></p> 

          	<p style="  font-style: normal; font-size: 20px;"> Parentage :<label id="parentage">_______________________________________________</label></p> 

          	<p style="  font-style: normal; font-size: 20px;"> Date of Birth :<label id="dob">_______________________________________________</label></p> 

          	<p style="  font-style: normal; font-size: 20px;"> School / Institution :<label id="scoc">_____________________________________</label></p> 

          	<p style="  font-style: normal; font-size: 20px;">Age Group : U/14 <input id="u14cb" type="checkbox" name="">  U/17 <input id="u17cb" type="checkbox" checked="" name="">  U/19 <input id="u19cb" type="checkbox" name=""> </p> 

          	<p style="  font-style: normal; font-size: 20px;">Gender : Boy <input id="genderMale" type="checkbox" checked="" name="">  Girl <input id="genderFemale"  type="checkbox" name=""></p> 
          	
          	<p style="  font-style: normal; font-size: 20px;"> District :<label id="district">___________________________________________</label></p> 
          <hr style="height:7pt; visibility:hidden;" />

          	<p style="  font-style: normal; font-size: 20px;"> Game / Event :<label id="gaoe">______________________________________</label></p> 
          	
          	<p style="  font-style: normal; font-size: 20px;"> Position :<label id="position">__________________________________________</label></p><p style="  font-style: normal; font-size: 20px;"> Date of Competition : From  :<label id="from">_____</label> To  :<label id="todate">_____</label></p> 
          	
          	<p style="  font-style: normal; font-size: 20px;"> Venue :<label id="venue">____________________________________________</label></p> 
          	

          </div>

          <!-- sign iture area -->	
            
            <div style="height: 85px;" id="container">
          	    <div style="align-content: center; height: 50px;" id="left"><p  style="font-size: 17px; text-align:center; text-align:bottom;">District 
                  <br>
                   Youth Services and Sports Officer 
                   <br> ______________________	
                 </p>
                </div>

          	    <div style="align-content: center; height: 50px;" id="middle"><p  style="font-size: 17px; text-align:center;">Joint Director <br> Youth Services and Sports Officer <br> Kashmir	</p></div>
          	</div>
              
          <!-- signiture area ends here -->

          </div>

        </div>

      <div id="editor"></div>

    </div>





</body>
</html>


<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script src="../assets/circletype.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>

<script type="text/javascript">

function set_values(){

<?php include '../../includes/connection.php'; ;
  $student_id = $_GET['nos'];
  $sql_query = "SELECT * FROM youth_students Where student_id= '$student_id'";

      $res = $connect -> query($sql_query);
      $result = array();

      if ($res) {
        while ($row = $res -> fetch_assoc()) {
            
        

?>
  
var nos     = "<?php echo $row['student_name'] ?> ";
nos = "_____________" +nos + "____________________________________________________";
$('#nos').text(nos.substring(0,56));
$('#nos').css('text-decoration', 'underline');


var parentage     = "<?php echo  $row['student_parentage'] ?> ";
parentage = "___________" +parentage + "__________________________________________________";
$('#parentage').text(parentage.substring(0,51));
$('#parentage').css('text-decoration', 'underline');


var dob     = "<?php echo  $row['student_dob'] ?> ";
dob = "___________" +dob + "_________________________________________________";
$('#dob').text(dob.substring(0,49));
$('#dob').css('text-decoration', 'underline');



var scoc     = "<?php echo  $row['student_school'] ?> ";
scoc = "_" +scoc + "____________________________________";
$('#scoc').text(scoc.substring(0,38));
$('#scoc').css('text-decoration', 'underline');



var district     = "<?php echo  $row['student_district'] ?> ";
district = "____________" +district + "____________________________________";
$('#district').text(district.substring(0,53));
$('#district').css('text-decoration', 'underline');


var gaoe     = "<?php echo '' ?> ";
gaoe = "____________" +gaoe + "____________________________________";
$('#gaoe').text(gaoe.substring(0,50));
$('#gaoe').css('text-decoration', 'underline');


var position     = "<?php echo '' ?> ";
position = "___________" +position + "________________________________________";
$('#position').text(position.substring(0,53));
$('#position').css('text-decoration', 'underline');




var from     = "<?php echo '' ?> ";
from = "__" +from + "_______________________________________________________________";
$('#from').text(from.substring(0,18));
$('#from').css('text-decoration', 'underline');



var todate     = "<?php echo '' ?> ";
todate = "__" +todate + "_______________________________________________________________";
$('#todate').text(todate.substring(0,17));
$('#todate').css('text-decoration', 'underline');




var venue     = "<?php echo '' ?> ";
venue = "__" +venue + "_______________________________________________________________";
$('#venue').text(venue.substring(0,56));
$('#venue').css('text-decoration', 'underline');



var yearOC     = "<?php echo '' ?> ";
yearOC = "__" +yearOC + "____";
$('#yearOC').text(yearOC.substring(0,10));
$('#yearOC').css('text-decoration', 'underline');


var rrNumber     = "<?php echo '' ?> ";
rrNumber = "__" +rrNumber + "____";
$('#rrNumber').text(rrNumber.substring(0,10));
$('#rrNumber').css('text-decoration', 'underline');



var certType     = "<?php echo $_GET['certType'] ?> ";
if (certType.includes("merit")){
  $('#certType').text("Merit Certificate");

}



var gender     = "<?php echo  $row['student_gender'] ?> ";
if (gender.includes("F")){
  $("#genderFemale").prop( "checked", true );
  $("#genderMale").prop( "checked", false );
}


var uAge     = "<?php echo $row['student_age_group'] ?> ";
if (uAge.includes("14")){

  $("#u14cb").prop( "checked", true );
  $("#u17cb").prop( "checked", false );
  $("#u19cb").prop( "checked", false );
  
}else if (uAge.includes("17")){
  
  $("#u14cb").prop( "checked", false );
  $("#u17cb").prop( "checked", true );
  $("#u19cb").prop( "checked", false );

}else{

  $("#u14cb").prop( "checked", false );
  $("#u17cb").prop( "checked", false );
  $("#u19cb").prop( "checked", true );


}

<?php }


      } ?>

}


function circularText(txt, radius, classIndex) {
  txt = txt.split(""),
    classIndex = document.getElementsByClassName("circTxt")[classIndex];

  var deg = 360 / txt.length,
    origin = 0;

  txt.forEach((ea) => {
    ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
    classIndex.innerHTML += ea;
    origin += deg;
  });
}

set_values();
new CircleType(document.getElementById('demo1')).radius(320);


// window.print();

</script>




<?php
	



?>




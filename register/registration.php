<!--
Author: Hafsa Mushtaq
Date : 03/04/18
-->
<!DOCTYPE HTML>
<html>

<head>
	<title>Registration - Youth Service</title>
	<!-- Meta tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	
	<script type="application/x-javascript">
		addEventListener("load", function () {
			setTimeout(hideURLbar, 0);
		}, false);

		function hideURLbar() {
			window.scrollTo(0, 1);
		}
	</script>
	<!-- //Meta tags -->
	<!-- Stylesheet -->
	<link rel="stylesheet" href="css/jquery-ui.css" />
	<link href="css/style3.css" rel='stylesheet' type='text/css' />
	<!-- //Stylesheet -->
	<!--fonts-->
	<link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600" rel="stylesheet">
	<!--//fonts-->
</head>

<body>
	<!--background-->
	<h1>Participant Registration Form </h1>
	<div class="register-form-w3layouts">
		<!-- Form starts here -->
		<form action="#" method="post">
			<h3 class="sub-heading-agileits">Personal Details</h3>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<input type="text" name="name" placeholder="Name" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<input type="text" name="parentage" placeholder="Parentage" required="">
				</div>
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<input type="text" name="a_no" placeholder="Aadhar No" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<input id="datepicker" name="Text" type="text" placeholder="DOB" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'mm/dd/yyyy';}"
					    required="">
				</div>
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<select class="form-control">
						<option>Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<select class="form-control">
						<option>Age Group</option>
						<option value="U14">U14</option>
						<option value="U17">U17</option>
						<option value="U19">U19</option>
					</select>
				</div>
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<input type="text" name="bank" placeholder="Bank No." required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<input type="text" name="ifsc" placeholder="ifsc Code" required="">
				</div>
					
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<input type="text" name="school" placeholder="School" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<input type="text" name="class" placeholder="Class" required="">
				</div>
					
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<input type="text" name="district" placeholder="District" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<input type="text" name="game" placeholder="Game Opted For" required="">
				</div>
				
			</div>
			<!-- <div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<select class="form-control">
						<option>Marital Status</option>
						<option value="Single">Single</option>
						<option value="Married">Married</option>
						<option value="Divorced">Divorced</option>
					</select>
				</div>
			</div> -->
			<!-- <div class="field-agileinfo-spc form-w3-agile-text">
				<textarea name="Message" placeholder="Address..."></textarea>
			</div> -->
			<div class="clear"></div>
			<h2 class="sub-heading-agileits">Documents</h2>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<label>Aadhar Card</label>
					<input type="file" name="aadhar_card" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<label>Birth Certificate</label>
					<input type="file" name="birth_certificate" required="">
				</div>
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<label>Bonafide</label>
					<input type="file" name="bonafide" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text2">
					<label>Indemnity Bond</label>
					<input type="file" name="indemnity_bond" required="">
				</div>
			</div>
			<div class="main-flex-w3ls-sectns">
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<label>Pervious Marks Certificate</label>
					<input type="file" name="marks_certificate" required="">
				</div>
				<div class="field-agileinfo-spc form-w3-agile-text1">
					<label>Eligibility Form</label>
					<input type="file" name="eligibility" required="">
				</div>
				
			</div>
			
			<input type="submit" value="Submit">
			<input type="reset" value="Clear Form">
			<div class="clear"></div>
		</form>
		<!--// Form starts here -->
	</div>
	<!--copyright-->
	<div class="copyright">
		<p>&copy; 2018. Youth Service . All Rights Reserved | Design by
			<a href="https://www.linkedin.com/in/hafsa-baba/">Hafsa Mushtaq</a>
		</p>
	</div>
	<!--//copyright-->
	<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
	<!-- Calendar Js -->
	<script src="js/jquery-ui.js"></script>
	<script>
		$(function () {
			$("#datepicker,#datepicker1,#datepicker2,#datepicker3").datepicker();
		});
	</script>
	<!-- //Calendar Js -->

</body>

</html>
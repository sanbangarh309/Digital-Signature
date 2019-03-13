<?php
namespace Sandeep\Maskfront\Controllers;
use App\Http\Controllers\Controller;
use App\User;
use San_Help;
use TCG\Voyager\Models\Provider;
use Validator;

class NotificationController extends Controller
{
// Function to send Push Notification for Android Phone
function send_android_notification($_booking_info,$type){

	$body = $title = $device_token = '';
	
	$booking_user_id = $_booking_info->post_author;
	$booking_id = $_booking_info->ID;
	$_sallon_id = get_post_meta($booking_id,'_sln_booking_sallon_id',true);

	if(empty($_sallon_id) && isset($_booking_info->_sln_booking__sallon_id)){
        $_sallon_id = $_booking_info->_sln_booking__sallon_id;
    }
    if(empty($_sallon_id) && isset($_booking_info->_sln_booking_sallon_id)){
        $_sallon_id = $_booking_info->_sln_booking_sallon_id;
    }

	if(!empty($_sallon_id)){
		$sallon_name = get_the_title($_sallon_id);
		$sallon_name = _api_custom_translate($sallon_name,'en');
	}

	if($type=="booking_accepted" || $type=="booking_rejected"){

		$device_token = get_user_meta($booking_user_id,'device_token',true);

		if($type=="booking_accepted"){
			$body = 'Your Booking with ID '.$booking_id.' has been accepted by '.$sallon_name;
			$title = 'Booking Accepted';
		}

		if($type=="booking_rejected"){
			$body = 'Your Booking with ID '.$booking_id.' has been rejected by '.$sallon_name;
			$title = 'Booking Rejected';
			$device_token = get_user_meta($booking_user_id,'device_token',true);
		}

	}

	if($type=="booking_canceled"){
		$body = 'Hi '.$sallon_name.' Your Booking with ID '.$booking_id.' has been Canceled by Customer';
		$title = 'Booking Canceled';
		
		$salon_data = get_post($_sallon_id);
		$salon_author = $salon_data->post_author;

		$device_token = get_user_meta($salon_author,'device_token');
		if(isset($device_token['0'])){
            $device_token = $device_token['0'];
        }

	}
	if($type=="new_booking"){
		$body = 'Hi '.$sallon_name.' You recieved New Booking with ID '.$booking_id;
		$title = 'New Booking Recieved';
		
		$salon_data = get_post($_sallon_id);
		$salon_author = $salon_data->post_author;

		$device_token = get_user_meta($salon_author,'device_token');

		if(isset($device_token['0'])){
            $device_token = $device_token['0'];
        }

	}
	// echo '<br/>send_android_notification';
	// echo '<br/>device_token';
	// pr($device_token);
	// echo '<br/>$_sallon_id';
	// pr($_sallon_id);
	// 	echo '<br/> body - '.$body;
	// echo '<br/> title - '.$title;
	// echo '<br/>_booking_info';
	// pr($_booking_info);
	// die();
	define( 'API_ACCESS_KEY', 'AAAAOdfnfzc:APA91bEhA_OxbvW6nyG_Dfdo59_Xq3oOGVyJZ6et4hOqgIB4bkyt0V-KHgbRUK1Scmz6N7Q5YFbXsvUdA0BOnxeO5Nr15uzSFDsdm5waP1Qu-NwQ24D0rhb-fs6xtZh5PaR2148YtzJ_' );

	$singleID = $device_token;
	 
	if(!empty($singleID) && $singleID!='(null)' ){

		// 'vibrate' available in GCM, but not in FCM
		$fcmMsg = array(
			'body' => $body,
			'title' => $title,
			'sound' => "default",
		    'color' => "#203E78" 
		);

		$fcmFields = array(
			'to' => $singleID,
		    'priority' => 'high',
			'notification' => $fcmMsg
		);

		$headers = array(
			'Authorization: key=' . API_ACCESS_KEY,
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );
		curl_close( $ch );

	}

}


// Function to send Push Notification for IOS Phone
function send_ios_notification($_booking_info,$type){

	$body = $title = $device_token = $sallon_name = '';
	
	$booking_user_id = $_booking_info->post_author;
	$booking_id = $_booking_info->ID;
	$_sallon_id = get_post_meta($booking_id,'_sln_booking_sallon_id',true);

	if(empty($_sallon_id) && isset($_booking_info->_sln_booking__sallon_id)){
        $_sallon_id = $_booking_info->_sln_booking__sallon_id;
    }
    if(empty($_sallon_id) && isset($_booking_info->_sln_booking_sallon_id)){
        $_sallon_id = $_booking_info->_sln_booking_sallon_id;
    }

	if(!empty($_sallon_id)){
		$sallon_name = get_the_title($_sallon_id);
		$sallon_name = _api_custom_translate($sallon_name,'en');
	}

	if($type=="booking_accepted" || $type=="booking_rejected"){

		$device_token = get_user_meta($booking_user_id,'device_token',true);

		if($type=="booking_accepted"){
			$body = 'Your Booking with ID '.$booking_id.' has been accepted by '.$sallon_name;
			$title = 'Booking Accepted';
		}

		if($type=="booking_rejected"){
			$body = 'Your Booking with ID '.$booking_id.' has been rejected by '.$sallon_name;
			$title = 'Booking Rejected';
			$device_token = get_user_meta($booking_user_id,'device_token',true);
		}

	}

	if($type=="booking_canceled"){
		$body = 'Hi '.$sallon_name.' Your Booking with ID '.$booking_id.' has been Canceled by Customer';
		$title = 'Booking Canceled';
		
		$salon_data = get_post($_sallon_id);
		$salon_author = $salon_data->post_author;

		$device_token = get_user_meta($salon_author,'device_token');
		if(isset($device_token['0'])){
            $device_token = $device_token['0'];
        }

	}
	if($type=="new_booking"){
		$body = 'Hi '.$sallon_name.' You recieved New Booking with ID '.$booking_id;
		$title = 'New Booking Recieved';
		
		$salon_data = get_post($_sallon_id);
		$salon_author = $salon_data->post_author;

		$device_token = get_user_meta($salon_author,'device_token');

		if(isset($device_token['0'])){
            $device_token = $device_token['0'];
        }

	}

	// echo '<br/>send_ios_notification';
	// echo '<br/>device_token';
	// pr($device_token);
	// echo '<br/>$_sallon_id';
	// pr($_sallon_id);
	// echo '<br/> body - '.$body;
	// echo '<br/> title - '.$title;
	// echo '<br/>_booking_info';
	// pr($_booking_info);
	// die();

	define( 'API_ACCESS_KEY1', 'AAAAPsMwoLs:APA91bHmIgPG7_L-Ura9djKnRQK1jhLffWI1zF_5EYoRyQj5ymPu7WnNLErjnd0QBttq2wkT6_yhbXAJ_euPEEuQUwWsbDZJlWFVpnByAOGfv9VOEPm7fS4b6rbjibe4n8iCvacNSOsa2Ou0v1n6llMUF08F503KUw' );

	// $device_token = 'd4KAOIE0lm4:APA91bFF_Dy8tSSdwzL4KpuyyqagtzFjocwfuesT9LO-4vQemNlcvaeO9OdipSqk8rrke5e3TsmPBkdyJg6etV12aurq1semYgybd4GU06TM6pYCaHmJOq8_MFUTxz6PKryYf-SV8FK0-qt_d0R0muUBj603Xis-fw';

	$singleID = $device_token;
	 
	if(!empty($singleID) && $singleID!='(null)' ){

		// 'vibrate' available in GCM, but not in FCM
		$fcmMsg = array(
			'body' => $body,
			'title' => $title,
			'sound' => "default",
		    'color' => "#203E78" 
		);

		$fcmFields = array(
			'to' => $singleID,
		    'priority' => 'high',
			'notification' => $fcmMsg
		);

		$headers = array(
			'Authorization: key=' . API_ACCESS_KEY1,
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );
		curl_close( $ch );

	}

}


// Function to send Push Notification for Android Phone
function send_custom_android_notification($android,$_txt,$_des){

	$body = $title = $device_token = '';
	
	define( 'API_ACCESS_KEY', 'AAAAOdfnfzc:APA91bEhA_OxbvW6nyG_Dfdo59_Xq3oOGVyJZ6et4hOqgIB4bkyt0V-KHgbRUK1Scmz6N7Q5YFbXsvUdA0BOnxeO5Nr15uzSFDsdm5waP1Qu-NwQ24D0rhb-fs6xtZh5PaR2148YtzJ_' );

	$registration_ids = $android;
	 
	if(!empty($registration_ids)){

		// 'vibrate' available in GCM, but not in FCM
		$fcmMsg = array(
			'body' => $_des,
			'title' => $_txt,
			'sound' => "default",
		    'color' => "#203E78" 
		);

		$fcmFields = array(
			// 'to' => $singleID,
			'registration_ids' => $registration_ids,
		    'priority' => 'high',
			'notification' => $fcmMsg
		);

		$headers = array(
			'Authorization: key=' . API_ACCESS_KEY,
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );

		curl_close( $ch );

	}

}


// Function to send Push Notification for IOS Phone
function send_custom_ios_notification($ios,$_txt,$_des){

	$body = $title = $device_token = '';
	
	define( 'API_ACCESS_KEY', 'AAAAPsMwoLs:APA91bHmIgPG7_L-Ura9djKnRQK1jhLffWI1zF_5EYoRyQj5ymPu7WnNLErjnd0QBttq2wkT6_yhbXAJ_euPEEuQUwWsbDZJlWFVpnByAOGfv9VOEPm7fS4b6rbjibe4n8iCvacNSOsa2Ou0v1n6llMUF08F503KUw' );

	// $registration_ids = 'eFCEavPATNA:APA91bG4OQdCMUfaYZ_Ff9tDlw8L-Y_R27aU3i5reao45aPJ2ChjTs0VJjZyYDBa91rzGsfY5cSYwWfrtLIIaeHQEMfvqC0qQ4VvHo1y1An58BKqOwlVSZM41ekTYK7SOV6eruFY0ZsqJHRUd2tJz8G0N0oyYhQzbQ';
	$registration_ids = $ios;

	if(!empty($registration_ids)){

		// 'vibrate' available in GCM, but not in FCM
		$fcmMsg = array(
			'body' => $_des,
			'title' => $_txt,
			'sound' => "default",
		    'color' => "#203E78" 
		);

		$fcmFields = array(
			// 'to' => $singleID,
			'registration_ids' => $registration_ids,
		    'priority' => 'high',
			'notification' => $fcmMsg
		);

		$headers = array(
			'Authorization: key=' . API_ACCESS_KEY,
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );

		curl_close( $ch );

	}

}
}
<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('zlugokx@gmail.com', 'Fingram'); // Указать нужный E-mail
	//Кому отправить
	$mail->addAddress('osinotov@wejet.ru'); // Указать нужный E-mail
	//Тема письма
	$mail->Subject = 'Привет! Это "Fingram"';

	//Тело письма
	$body = '<h1>Вопрос!</h1>';

	$gender = "Мужчина";
	if($_POST['gender'] == "Feemale") {
		$gender = "Женщина";
	}


	if(trim(!empty($_POST['name']))){
		$body.='<p>Имя:'.$_POST['name'].'</p>';
	}	
	
	if(trim(!empty($_POST['birthdate']))){
		$body.='<p>Дата рождения:'.$_POST['birthdate'].'</p>';
	}	

	if(trim(!empty($_POST['gender']))){
		$body.='<p>Пол:'.$gender.'</p>';
	}	

	if(trim(!empty($_POST['place']))){
		$body.='<p>Субъект РФ:'.$_POST['place'].'</p>';
	}	

	if(trim(!empty($_POST['message']))){
		$body.='<p>Вопрос:'.$_POST['message'].'</p>';
	}	
	
	/*
	//Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
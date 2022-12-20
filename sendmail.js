// "use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      let formData = new FormData(form);
  
      if (error === 0) {
        form.classList.add('_sending') 
        let response = await fetch('../../componetns/sendmail/sendmail.php', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          let result = await response.json();
          alert(result.message);
         let formHeader =  document.querySelector('.question__header h1');
         let formText = document.querySelector('.question__text p');
         formHeader.textContent = 'спасибо';
          formText.textContent = 'Ваш вопрос принят. Наши специалисты ответят в ближайшее время и вопрос вместе с ответом будет опубликован';
          const formBtn = document.querySelector('.question__reset-btn');
          formBtn.addEventListener('click', function(e) {
            e.preventDefault();
             form.reset();
             formHeader.textContent = 'ЗАДАТЬ ВОПРОС';
             formText.textContent = 'Вы можете задать любой вопрос по финансовой грамотности. Ответ от наших специалистов будет опубликован в разделе “Задать вопрос”.';
             form.classList.remove('_sending')
          });
        } else {

        }
      } else {
        alert('Заполните обязательные поля')
      }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')
        

        for (let index = 0; index < formReq.length; index++) {
          const input = formReq[index];
          formRemoveError(input)
          
          if (input.classList.contains('_birhday')) {
            if (!validate_date(input)) {
              formAddError(input);
              error++;
            }
          } else {
            if (input.value === '') {
              formAddError(input);
              error++
            }
          }
        }
        return error;
    }

    function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error')
    }

    
    function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error')
    }
// Функция проверки даты рождения
    function validate_date(value) {
  var arrD = value.split(".");
  arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {
    alert("Введена некорректная дата!");
    return false;
  }
}
});


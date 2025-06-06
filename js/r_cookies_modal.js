(function ($) {
  Drupal.behaviors.r_cookies_modal = {
    attach: function (context, settings) {
      function setCookie(name, value, days) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }

      function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      function checkCookies() {
        let cookieNote = document.getElementById('cookie_note');
        let cookieBtnAccept = cookieNote.querySelector('.cookie_accept');
        let cookieBtnDeny = cookieNote.querySelector('.cookie_deny');

        // Если куки cookies_policy нет или она просрочена, то показываем уведомление
        if (!getCookie('cookies_policy')) {
          cookieNote.classList.add('show');
        }

        // При клике на кнопку "Принять" устанавливаем куку cookies_policy на один год
        cookieBtnAccept.addEventListener('click', function () {
          setCookie('cookies_policy', 'accept', 365);
          cookieNote.classList.remove('show');
        });
        // При клике на кнопку "Отмена" устанавливаем куку cookies_policy на один год
        cookieBtnDeny.addEventListener('click', function () {
          setCookie('cookies_policy', 'deny', 365);
          cookieNote.classList.remove('show');
        });
      }

      checkCookies();
    },
  };
})(jQuery);

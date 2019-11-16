$(document).ready(function(e) {
  var ClickedButton;

  $('input[type="submit"]').click(function() {
    ClickedButton = $(this).attr("id");
  });
  $("#contactusform").submit(function(e) {
    if (ClickedButton == "submit") {
      $(
        "#subject-message, #comments-message, #name-message, #email-message, #captchas-message"
      ).hide();

      // Is current page in English
      var it_is_english = document.URL.toLowerCase().indexOf("-eng.html") > 0;

      // Is current page Anonymous
      var anonymous = document.URL.toLowerCase().indexOf("cntctwhstlblwr") > 0;

      //---------------------------------------------------------- Subject
      if ($("#subject").val() === "") {
        if (it_is_english)
          $("#subject-message").text("Please enter a subject.");
        else $("#subject-message").text("Inscrivez un sujet.");
        $("#subject-message").show();
      }

      //---------------------------------------------------------- Comments
      if ($("#comments").val() === "") {
        if (it_is_english)
          $("#comments-message").text("Please enter your comments");
        else $("#comments-message").text("Inscrivez vos commentaires.");
        $("#comments-message").show();
      }

      //---------------------------------------------------------- Name
      if (!anonymous && $("#name").val() === "") {
        if (it_is_english) $("#name-message").text("Please enter your name.");
        else $("#name-message").text("Inscrivez votre nom.");
        $("#name-message").show();
      }

      //---------------------------------------------------------- Email
      if (
        (!anonymous && $("#email").val() === "") ||
        ($("#email").val() !== "" && !isEmailValid($("#email").val()))
      ) {
        if (it_is_english)
          $("#email-message").text(
            "Please enter a valid e-mail address, like: name@domain.com."
          );
        else
          $("#email-message").text(
            "Inscrivez une adresse de courriel valide, comme : nom@domaine.com."
          );
        $("#email-message").show();
      }

      //---------------------------------------------------------- Captchas
      if ($("#recaptcha_response_field").val() === "") {
        if (it_is_english)
          $("#captchas-message").text(
            "Please enter the letters as seen below."
          );
        else
          $("#captchas-message").text(
            "Inscrivez les lettres que vous voyez ci-dessous."
          );
        $("#captchas-message").show();
      }
      // Focus on first incorrect field
      if ($("#subject").val() === "") {
        $("#subject").focus();
        return false;
      } else if ($("#comments").val() === "") {
        $("#comments").focus();
        return false;
      } else if (!anonymous && $("#name").val() === "") {
        $("#name").focus();
        return false;
      } else if (
        (!anonymous && $("#email").val() === "") ||
        ($("#email").val() !== "" && !isEmailValid($("#email").val()))
      ) {
        $("#email").focus();
        return false;
      } else if ($("#recaptcha_response_field").val() === "") {
        $("#recaptcha_response_field").focus();
        return false;
      }
    } else {
      $("#subject").val("");
      $("#comments").val("");
      $("#name").val("");
      $("#title").val("");
      $("#organization").val("");
      $("#email").val("");
      $("#telephone").val("");
      $("#recaptcha_response_field").val("");

      $(
        "#subject-message, #comments-message, #name-message, #email-message, #captchas-message"
      ).hide();

      $("#subject").focus();
      return false;
    }

    return true;
  });
});
// Function that validates email address through a regular expression.
function isEmailValid(email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (filter.test(email)) return true;
  else return false;
}

function valid_datas(f) {

    // Name validation
    if (f.name.value == '') {
        jQuery('#form_status').html('<span class="wrong">Your name must not be empty!</span>');
        notice(f.name);
    }
    // Email validation with format check
    else if (!validateEmail(f.email.value)) {
        jQuery('#form_status').html('<span class="wrong">Your email must be in a valid format!</span>');
        notice(f.email);
    }
    // Subject validation
    else if (f.subject.value == '') {
        jQuery('#form_status').html('<span class="wrong">Your subject must not be empty!</span>');
        notice(f.subject);
    }
    // Message validation
    else if (f.message.value == '') {
        jQuery('#form_status').html('<span class="wrong">Your message must not be empty!</span>');
        notice(f.message);
    } else {
        // AJAX request to send the form data
        jQuery.ajax({
            url: 'mail.php',
            type: 'post',
            data: jQuery('form#gsr-contact').serialize(),
            complete: function(data) {
                if (data.responseText.includes('success')) {
                    jQuery('#form_status').html('<span class="success">Your message has been sent!</span>');
                } else {
                    jQuery('#form_status').html('<span class="wrong">Something went wrong, please try again.</span>');
                }
                // Clear form fields
                jQuery('#gsr-contact').find('input,textarea').attr({ value: '' });
                jQuery('#gsr-contact').css({ opacity: 1 });
                jQuery('#gsr-contact').remove();
            }
        });
        // Show loading message
        jQuery('#form_status').html('<span class="loading">Sending your message...</span>');
        jQuery('#gsr-contact').animate({ opacity: 0.3 });
        jQuery('#gsr-contact').find('input,textarea,button').prop('disabled', true);
    }

    return false;
}

function notice(f) {
    jQuery('#gsr-contact').find('input,textarea').css('border', 'none');
    f.style.border = '1px solid red';
    f.focus();
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

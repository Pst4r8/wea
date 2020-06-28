ajaxUrl = baseUrl+'index.html/'

Vue.component('error', {
    props: ['msg'],
    template: '<p class="error-input">{{ msg }}</p>'
})

Vue.component('loading', {
    template: `<div class="preload-wrapper">
        <div id="preloader_1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>`
})

Vue.component('captcha', {
    props: ['image'],
    template: '<img :src="image" class="captcha" style="width: 300; height: 120; border: 0;" alt=" " /> '
})

var vueMail = new Vue({
    el: '#mail-container',
    data: {
        inputError: {
            nama: '',
            email: '',
            subject: '',
            message: '',
            captcha: ''
        },
        emailSuccess: '',
        successMsg: false,
        showLoading: false,
        send: 'SEND',
        captcha: baseUrl + 'asset/captcha/' + captchaImage,
        captchaWord: session
    },
    methods: {
        emailValidation: function() {
            var data = $("#footer-form").serialize();
            $.ajax({
                url: ajaxUrl + 'main/email_validation',
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    vueMail.showLoading = true;
                    vueMail.send = '';
                },
                success: function(data) {
                    if(data !== 'success') {
                        vueMail.inputError.nama = data.error.nama;
                        vueMail.inputError.email = data.error.email;
                        vueMail.inputError.subject = data.error.subjek;
                        vueMail.inputError.message = data.error.pesan;
                        vueMail.inputError.captcha = data.error.captcha;
                        vueMail.captcha = baseUrl + 'asset/captcha/' + data.new_captcha;
                        vueMail.showLoading = false;
                        vueMail.send = 'SEND';
                    } else {
                        var data = $("#footer-form").serialize();
                        $.ajax({
                            url: ajaxUrl + 'main/send_mail',
                            type: 'POST',
                            dataType: 'json',
                            data: data,
                            success: function(data) {
                                vueMail.successMsg = true;
                                vueMail.captcha = baseUrl + 'asset/captcha/' + data.new_captcha;
                                if(data.msg === 'success') {
                                    vueMail.emailSuccess = 'Email has been sent successfully';
                                } else {
                                    vueMail.emailSuccess = "There's something wrong when sending email";
                                }
                                vueMail.inputError.nama = '';
                                vueMail.inputError.email = '';
                                vueMail.inputError.subject = '';
                                vueMail.inputError.message = '';
                                vueMail.inputError.captcha = '';
                                $("#name2").val("");
                                $("#email2").val("");
                                $("#subject").val("");
                                $("#message2").val("");
                                $("#captcha").val("");
                                vueMail.showLoading = false;
                                vueMail.send = 'SEND';
                                setTimeout(function() {
                                    vueMail.successMsg = false;
                                }, 5000)
                            }
                        })
                    }
                },
                error: function() {
                    vueMail.successMsg = true;
                    vueMail.emailSuccess = "There's something wrong when sending email";
                    vueMail.showLoading = false;
                    vueMail.send = 'SEND';
                }
            })
        },
        recaptcha: function() {
            $.ajax({
                url: ajaxUrl + 'main/captcha/get',
                type: 'GET',
                dataType:'text',
                success: function(data) {
                    vueMail.captcha = baseUrl + 'asset/captcha/' + data;
                }
            })
        }
    }
})


$(document).ready(function() {

    $('#main_header').css('transform', 'translateX(0px)');
    $('#main_header ul').css('transform', 'translateX(0px)');
    $('#main_header #project_link').css('transform', 'translateX(0px)');
    
    
    
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
        
    const verticalSize = [0, 500, 1100, 1800, 3500];
    const navLinks = $('.nav-link');
    const navbar = $('.navbar');

    $(window).scroll(function() {
        const vertical = $(this).scrollTop();
        let selectedLink = 0;

        verticalSize.forEach((value, index) => {
            if (vertical > value) {
                selectedLink = index;
            }
        });

        $(navLinks).removeClass('active');
        $(navLinks).eq(selectedLink).addClass('active');
        
        if (vertical > 50) {
            $(navbar).addClass('shadow-sm');
            $(navbar).css({
                'background-color': '#fff',
                'position': 'fixed',
                'transition': 'all .5s ease'
            });
        } else {
            $(navbar).removeClass('shadow-sm');
            $(navbar).css('background-color', 'transparent');
        }

        if (vertical > 500) {
            $('section#about #about_img').css({
                'transform': 'scale(1)',
                'opacity': '1'
            });
        }
        if (vertical > 1000) {
            $('section#skill .skill_icon').css('transform', 'translate(0px, 0px)');
        }
        if (vertical > 1600) {
            $('.left_project').eq(0).css('transform', 'translateX(0px)');
            $('.right_project').eq(0).css('transform', 'translateX(0px)');
        }
        if (vertical > 2000) {
            $('.left_project').eq(1).css('transform', 'translateX(0px)');
            $('.right_project').eq(1).css('transform', 'translateX(0px)');
        }
        if (vertical > 2400) {
            $('.left_project').eq(2).css('transform', 'translateX(0px)');
            $('.right_project').eq(2).css('transform', 'translateX(0px)');
        }
        if (vertical > 2800) {
            $('.left_project').eq(3).css('transform', 'translateX(0px)');
            $('.right_project').eq(3).css('transform', 'translateX(0px)');
        }
    });
    
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();

        const menuIcon = $('#menu');

        $('.navbar-collapse').removeClass('show');
        $(menuIcon).children().eq(0).removeClass('close');
        $(menuIcon).children().eq(0).addClass('open');
        $('.nav-item').addClass('open');
    });

    $('#menu').click(function(e) {
        e.preventDefault();

        const navNav = $('.navbar-nav');
        const navItem = $('.navbar .nav-item');

        if (!$(this).hasClass('collapsed')) {
            $(this).children().eq(0).removeClass('open');
            $(this).children().eq(0).addClass('close');
            $(navNav).css({
                'left': '50%',
            });
            $(navItem).removeClass('open');
        } else {
            $(this).children().eq(0).addClass('open');
            $(this).children().eq(0).removeClass('close');
            $(navNav).css({
                'left': '200%',
            });
            $(navItem).addClass('open');
        }
    });

    $(document).on('click', 'section#skill .skill_menu', function(e) {
        e.preventDefault();

        $('section#skill .skill_menu').removeClass('text-dark border-bottom border-dark border-2');
        $('section#skill .skill_menu').addClass('text-muted');

        $(this).addClass('text-dark border-bottom border-dark border-2');
        $(this).removeClass('text-muted');

        const btn_type = $(this).data('type');
        const skills = $('.skill_icon');

        if (btn_type === 'all') {
            $(skills).show();
        } else {
            $(skills).hide();
            $(`[data-skill-type="${btn_type}"]`).show();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

(function(){
    emailjs.init("51lK1nLrWIcoV6rf_");
})();

function sendMessage() {

    const name = $('.inputName');
    const email = $('.inputEmail');
    const message = $('.inputMessage');
    
    var mailValue = $(email).val();
    const errElement = $(email).siblings('#error');

    if (mailValue === '') {
        $(email).addClass('border-danger');
        $(errElement).removeClass('d-none');
        $(errElement).html('Email is Required!');

        return false;
    } else if (!mailValue.includes('@') || !mailValue.includes('.com')) {
        $(email).addClass('border-danger');
        $(errElement).removeClass('d-none');
        $(errElement).html('Enter a valid Email Address!');
        
        return false;
    }
    
    const params = {
        name: $(name).val(),
        email: mailValue,
        message: $(message).val(),
    };
    
    const serviceID = "service_5q3703o";
    const templateID = "template_k52q591";
    
    emailjs.send(serviceID, templateID, params)
    .then(res => {
        $(name).val('');
        $(email).val('');
        $(message).val('');
    
            if (res.status == 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sent to Developer  ❤',
                showConfirmButton: false,
                timer: 1500
            });
            $(email).removeClass('border-danger');
        }
    }).catch(err => {
        console.error(err);
    });
}













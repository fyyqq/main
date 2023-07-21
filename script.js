
$(document).ready(function() {

    $('#main_header').css('transform', 'translateX(0px)');
    $('#main_header ul').css('transform', 'translateX(0px)');
    $('#main_header #project_link').css('transform', 'translateX(0px)');
    
    
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
        
    const verticalSize = [0, 500, 1300, 2700];
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
            $('.left_project').eq(0).css('transform', 'translateX(0px)');
            $('.right_project').eq(0).css('transform', 'translateX(0px)');
        }
        if (vertical > 1300) {
            $('.left_project').eq(1).css('transform', 'translateX(0px)');
            $('.right_project').eq(1).css('transform', 'translateX(0px)');
        }
        if (vertical > 1800) {
            $('.left_project').eq(2).css('transform', 'translateX(0px)');
            $('.right_project').eq(2).css('transform', 'translateX(0px)');
        }
        if (vertical > 2100) {
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
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});









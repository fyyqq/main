
$(document).ready(function() {
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
        
    const verticalSize = [0, 500, 1300, 2500];
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













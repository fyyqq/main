
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

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});













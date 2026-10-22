
$(document).ready(function() {

    $('#main_header').css('transform', 'translateX(0px)');
    $('#main_header ul').css('transform', 'translateX(0px)');
    $('#main_header #project_link').css('transform', 'translateX(0px)');

    $('[data-bs-toggle="tooltip"]').each(function() {
        new bootstrap.Tooltip(this);
    });
    
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
        
    const verticalSize = [0, 500, 1100, 1600, 3000];
    const navLinks = $('.nav-link');
    const navbar = $('.navbar');

    $(window).scroll(function() {
        const vertical = $(this).scrollTop();
        let selectedLink = 0;
        console.log(vertical);

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
    
    // skill cards start stacked at the bottom-middle of the container, then fly to their place one by one
    const skillCards = $('#skills_container .skill_icon').toArray();
    let skillsPlayed = false;

    function stackSkillCards() {
        skillCards.forEach(card => $(card).css({'transition': 'none', 'transform': 'none'}));

        const box = document.getElementById('skills_container').getBoundingClientRect();
        const offsets = skillCards.map(card => {
            const rect = card.getBoundingClientRect();
            return {
                x: (box.left + box.width / 2) - (rect.left + rect.width / 2),
                y: box.bottom - rect.bottom
            };
        });

        skillCards.forEach((card, i) => {
            $(card).css('transform', `translate(${offsets[i].x}px, ${offsets[i].y}px)`);
        });
        void document.body.offsetHeight;
        skillCards.forEach(card => $(card).css('transition', ''));
    }

    function playSkillCards() {
        skillsPlayed = true;
        skillCards.forEach((card, i) => {
            $(card).css({'transition-delay': `${i * 0.5}s`, 'transform': 'translate(0px, 0px)'});
        });
        setTimeout(() => $(skillCards).css('transition-delay', ''), skillCards.length * 500 + 1000);
    }

    $(window).on('load', stackSkillCards);
    $(window).on('resize', function() {
        if (!skillsPlayed) {
            stackSkillCards();
        }
    });

    new IntersectionObserver((entries, observer) => {
        if (entries.some(entry => entry.isIntersecting)) {
            playSkillCards();
            observer.disconnect();
        }
    }, { threshold: 0.2 }).observe(document.getElementById('skills_container'));

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

        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const targetHeight = target.offsetHeight;
        let top = 0;

        if (target.id !== 'home') {
            // center sections that fit in the viewport, otherwise start just below the navbar
            top = targetHeight + navHeight < window.innerHeight
                ? targetTop - (window.innerHeight - targetHeight) / 2
                : targetTop - navHeight;
        }

        window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth'
        });
    });
});

(function(){
    emailjs.init("51lK1nLrWIcoV6rf_");
})();

function sendMessage(event) {

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

    $('.custom-loader').show();
    $(event).css('color', 'transparent');
    
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
            $(errElement).addClass('d-none');
            $('.custom-loader').hide();
            $(event).css('color', '#fff');
        }
    }).catch(err => {
        console.error(err);
    });
}












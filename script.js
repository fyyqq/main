
$(document).ready(function() {

    // svg outline for the contact fields, animated on focus (see .field_border in styles.css)
    // the path starts at the top center and runs clockwise a full turn
    $('#contact .form-floating').each(function() {
        const field = this;
        const svg = $('<svg class="field_border" aria-hidden="true"><path pathLength="1"></path></svg>').appendTo(field);

        new ResizeObserver(() => {
            const w = field.clientWidth, h = field.clientHeight;
            const inset = 1.25, r = 4.75;
            const x2 = w - inset, y2 = h - inset, cx = w / 2;

            svg.attr('viewBox', `0 0 ${w} ${h}`);
            svg.find('path').attr('d', `M${cx} ${inset} H${x2 - r} A${r} ${r} 0 0 1 ${x2} ${inset + r} V${y2 - r} A${r} ${r} 0 0 1 ${x2 - r} ${y2} H${inset + r} A${r} ${r} 0 0 1 ${inset} ${y2 - r} V${inset + r} A${r} ${r} 0 0 1 ${inset + r} ${inset} H${cx}`);
        }).observe(field);
    });

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
        
    const sectionIds = ['home', 'about', 'skill', 'work', 'project', 'contact'];
    const navLinks = $('.nav-link');
    const navbar = $('.navbar');

    $(window).scroll(function() {
        const vertical = $(this).scrollTop();
        let selectedLink = 0;

        // highlight the last section whose top has passed the middle of the screen
        sectionIds.forEach((id, index) => {
            if (document.getElementById(id).getBoundingClientRect().top <= window.innerHeight / 2) {
                selectedLink = index;
            }
        });

        if (vertical + window.innerHeight >= document.documentElement.scrollHeight - 2) {
            selectedLink = sectionIds.length - 1;
        }

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

    function stackSkillCards(cards = skillCards) {
        cards.forEach(card => $(card).css({'transition': 'none', 'transform': 'none'}));

        const box = document.getElementById('skills_container').getBoundingClientRect();
        const offsets = cards.map(card => {
            const rect = card.getBoundingClientRect();
            return {
                x: (box.left + box.width / 2) - (rect.left + rect.width / 2),
                // one card height below the container so cards in the last row also travel up
                y: (box.bottom + rect.height) - rect.bottom
            };
        });

        cards.forEach((card, i) => {
            $(card).css('transform', `translate(${offsets[i].x}px, ${offsets[i].y}px)`);
        });
        void document.body.offsetHeight;
        cards.forEach(card => $(card).css('transition', ''));
    }

    let skillsTimer;

    function playSkillCards(cards = skillCards) {
        skillsPlayed = true;
        cards.forEach((card, i) => {
            $(card).css({'transition-delay': `${i * 0.15}s`, 'transform': 'translate(0px, 0px)'});
        });
        clearTimeout(skillsTimer);
        skillsTimer = setTimeout(() => $(cards).css('transition-delay', ''), cards.length * 150 + 1000);
    }

    $(window).on('load', () => stackSkillCards());
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

    const videoModal = $('#video_modal');
    const modalVideo = videoModal.find('video').get(0);

    function closeVideoModal() {
        videoModal.removeClass('show').attr('aria-hidden', 'true');
        modalVideo.pause();
    }

    $(document).on('click', '.project_expand', function(e) {
        e.preventDefault();

        modalVideo.src = $(this).data('video');
        modalVideo.setAttribute('aria-label', $(this).data('title'));
        videoModal.addClass('show').attr('aria-hidden', 'false');
        modalVideo.play();
    });

    videoModal.on('click', function(e) {
        if (e.target === this || $(e.target).hasClass('video_modal_close')) {
            closeVideoModal();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.hasClass('show')) {
            closeVideoModal();
        }
    });

    // hover cards next to the contact links; the GitHub one loads the public profile once
    let cardTimer;
    let githubLoaded = false;

    function loadGithubCard() {
        if (githubLoaded) {
            return;
        }
        githubLoaded = true;

        Promise.all([
            fetch('https://api.github.com/users/fyyqq').then(res => res.json()),
            fetch('https://api.github.com/users/fyyqq/repos?sort=pushed&per_page=3').then(res => res.json())
        ]).then(([user, repos]) => {
            const card = $('#card_github');
            const stat = (value, label) => $('<span>').append($('<b>').text(value), document.createTextNode(label));

            card.find('.cc_name').text(user.name || user.login);
            card.find('.cc_stats').empty().append(
                stat(user.public_repos, 'Repositories'),
                stat(user.followers, 'Followers'),
                stat(user.following, 'Following')
            );
            card.find('.cc_list').empty().append(repos.map(repo => $('<li>').append(
                $('<span>').text(repo.name),
                $('<span class="cc_muted">').text(repo.language || '')
            )));
            positionContactCard('github');
        }).catch(() => {
            githubLoaded = false;
            $('#card_github .cc_list').html('<li class="cc_muted">Could not load repositories.</li>');
        });
    }

    // vertically center a card on the link that opens it
    function positionContactCard(key) {
        const link = $(`[data-card="${key}"]`)[0].getBoundingClientRect();
        const box = $('.contact_cards')[0].getBoundingClientRect();
        const card = $(`#card_${key}`);

        card.css('margin-top', `${link.top + link.height / 2 - box.top - card.outerHeight() / 2}px`);
    }

    function showContactCard(key) {
        clearTimeout(cardTimer);
        $('.contact_card').removeClass('show').attr('aria-hidden', 'true');
        positionContactCard(key);
        $(`#card_${key}`).addClass('show').attr('aria-hidden', 'false');

        if (key === 'github') {
            loadGithubCard();
        }
    }

    function hideContactCards() {
        cardTimer = setTimeout(() => $('.contact_card').removeClass('show').attr('aria-hidden', 'true'), 150);
    }

    $('[data-card]').on('mouseenter focus', function() {
        showContactCard($(this).data('card'));
    }).on('mouseleave blur', hideContactCards);

    $('.contact_card').on('mouseenter', () => clearTimeout(cardTimer)).on('mouseleave', hideContactCards);

    // the about section sticks to the screen while its key phrases light up one by one as you scroll;
    // it only plays the first time, so the phrases stay highlighted afterwards
    const aboutSection = document.getElementById('about');
    const aboutText = aboutSection.querySelector('#about_text small');
    const aboutTokens = aboutText.textContent.trim().split(/\s+/);
    const cleanToken = token => token.replace(/^["“(]+|[.,;:!?"”)]+$/g, '');

    // [phrase, style, color]
    const aboutKeys = [
        ['Web Developer', 'role', '#6c47ff'],
        ['3 years', 'metric', '#fc5a29'],
        ['PHP', 'tech', '#5b5fa8'],
        ['Laravel', 'tech', '#fb503b'],
        ['WordPress', 'tech', '#21759b'],
        ['10+ client websites', 'metric', '#d6336c'],
        ['multilingual', 'tech', '#0b75bc'],
        ['Google PageSpeed', 'tech', '#1a73e8'],
        ['98', 'metric', '#2eaf33'],
        ['REST API', 'tech', '#099268'],
        ['Playwright', 'tech', '#2b8a3e'],
        ['Agile', 'tech', '#f08c00']
    ];

    const keyAt = {};
    aboutKeys.forEach(([phrase, style, color]) => {
        const words = phrase.split(' ');
        const start = aboutTokens.findIndex((_, i) => words.every((word, j) => cleanToken(aboutTokens[i + j] || '') === word));

        if (start !== -1) {
            words.forEach((_, j) => keyAt[start + j] = {style, color});
        }
    });

    const aboutKeyWords = [];

    aboutText.setAttribute('aria-label', aboutText.textContent.trim());
    aboutText.textContent = '';
    aboutTokens.forEach((token, i) => {
        if (i > 0) {
            aboutText.appendChild(document.createTextNode(' '));
        }

        if (keyAt[i]) {
            const span = document.createElement('span');
            span.className = `about_key about_key_${keyAt[i].style}`;
            span.dataset.word = token;
            span.style.setProperty('--key-color', keyAt[i].color);
            span.textContent = token;
            aboutText.appendChild(span);
            aboutKeyWords.push(span);
        } else {
            aboutText.appendChild(document.createTextNode(token));
        }
    });

    let keysOn = 0;

    function updateAboutWords() {
        const scrolled = -aboutSection.getBoundingClientRect().top;
        const distance = aboutSection.offsetHeight - window.innerHeight;

        // everything is lit a little before the end of the sticky area
        const progress = Math.min(1, Math.max(0, scrolled / distance) / 0.9);
        // only ever goes up: scrolling back up or above the section changes nothing
        keysOn = Math.max(keysOn, Math.round(progress * aboutKeyWords.length));

        aboutKeyWords.forEach((span, i) => span.classList.toggle('on', i < keysOn));
    }

    ['scroll', 'resize', 'load'].forEach(type => window.addEventListener(type, updateAboutWords, {passive: true}));
    updateAboutWords();

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

        // replay the stack-to-place animation for the cards of the selected tab
        const visibleCards = skillCards.filter(card => $(card).is(':visible'));
        stackSkillCards(visibleCards);
        playSkillCards(visibleCards);
    });
});

// fill the experience timeline line and dots with a dark color as the section is scrolled
function updateWorkTimeline() {
    const timeline = document.querySelector('.work_timeline');
    const mark = window.innerHeight / 2;
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));

    timeline.style.setProperty('--work-progress', progress);
    timeline.querySelectorAll('.work_dot').forEach(dot => {
        const box = dot.getBoundingClientRect();
        dot.classList.toggle('active', box.top + box.height / 2 <= mark);
    });
}

['scroll', 'resize', 'load'].forEach(type => window.addEventListener(type, updateWorkTimeline, {passive: true}));
updateWorkTimeline();

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

// set to true to keep the success popup open on page load while editing its design
const PREVIEW_SUCCESS_POPUP = false;

function showSuccessPopup() {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you! Your message has been sent.',
        showConfirmButton: false,
        ...(PREVIEW_SUCCESS_POPUP ? {allowOutsideClick: false, allowEscapeKey: false} : {timer: 1500})
    });
}

if (PREVIEW_SUCCESS_POPUP) {
    showSuccessPopup();
}

function sendMessage(event) {

    const name = $('.inputName');
    const email = $('.inputEmail');
    const subject = $('.inputSubject');
    const message = $('.inputMessage');
    
    var mailValue = $(email).val();
    const errElement = $(email).siblings('#error');
    const submitError = $('#submit_error');

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
        subject: $(subject).val(),
        message: $(message).val(),
    };

    $(submitError).addClass('d-none');
    $('.custom-loader').show();
    $(event).css('color', 'transparent');
    
    const serviceID = "service_35ngicd";
    const templateID = "template_y7kpoc4";
    
    emailjs.send(serviceID, templateID, params)
    .then(res => {
        $(name).val('');
        $(email).val('');
        $(subject).val($(subject).prop('defaultValue'));
        $(message).val($(message).prop('defaultValue'));
        
        if (res.status == 200) {
            showSuccessPopup();
            $(email).removeClass('border-danger');
            $(errElement).addClass('d-none');
            $('.custom-loader').hide();
            $(event).css('color', '#fff');
        }
    }).catch(err => {
        console.error(err);

        $('.custom-loader').hide();
        $(event).css('color', '#fff');
        $(submitError).text(`Failed to send: ${err && (err.text || err.message) || 'something went wrong, please try again.'}`);
        $(submitError).removeClass('d-none');
    });
}












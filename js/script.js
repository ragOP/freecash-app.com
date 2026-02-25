let reviewsSwiper = null;

function initReviewsSwiper() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        if (reviewsSwiper) {
            reviewsSwiper.destroy(true, true);
            reviewsSwiper = null;
        }
        return;
    }

    if (!reviewsSwiper) {
        reviewsSwiper = new Swiper('.mySwiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: false,
            centeredSlides: false,
            navigation: {
                nextEl: '.reviews-next',
                prevEl: '.reviews-prev',
            },
        });
    }
}

document.addEventListener('DOMContentLoaded', initReviewsSwiper);
window.addEventListener('resize', initReviewsSwiper);

$(document).ready(function(){

    window.domain = window.location.hostname;
    $(".domain").text(domain)
    $(".domainwihoutdot").text(domain.split(".")[0])
    $(".mailto").attr("href", "mailto:support@freecash.com")

    $(".hero .btn").click(function(){
        $(".hero").fadeOut(0)
        $(".contact").fadeOut(0)
        $(".landing").fadeOut(0)
        $(".survey").fadeIn(300)
        // $("body").addClass("quiz-active")
    })

    let step = 1;

    function animatePercentage(el, from, to, duration = 300) {
        const start = performance.now();
        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(from + (to - from) * progress);
            $(".progress-percentage").text(`${value + "%"}`)
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    $(".question-1 .btn, .question-2 .btn, .question-3 .btn").click(function () {
        step++;

        let newVal = (step - 1) * 33.5;
        let currentVal = parseInt($(".progress-percentage").text());

        animatePercentage(
            $(".progress-percentage"),
            currentVal,
            newVal,
            300
        );

        $(".progress-line").css("width", `${newVal}%`);
        $(".current-step").text(step);

        $(this).closest(".question").fadeOut(0);
        $(this).closest(".question").next(".question").fadeIn(300);
        console.log(step)

        if (step >= 4) {
            $(".quiz .step").fadeOut(0);
            $(".quiz .description").fadeOut(0);
            
            setTimeout(() => {
                $(".survey").fadeOut(0);
                $(".timer").fadeOut(0);
                $(".landing").fadeIn(300);
                $(".final").fadeIn(300);
                setTimeout(()=>{
                    runConfetti()
                },300)
            }, 2500);
        }
    });

    // timer
    const startTimer = () => {
        const timerEl = $('.timer-clock');
        if (!timerEl) return;

        let remainingSeconds = 5 * 60;

        const formatTime = (seconds) => {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        timerEl.text(formatTime(remainingSeconds));

        const interval = setInterval(() => {
            remainingSeconds--;

            if (remainingSeconds <= 0) {
                timerEl.textContent = "00:00";
                timerEl.text("00:00");

                clearInterval(interval);
                return;
            }

            timerEl.text(formatTime(remainingSeconds));

        }, 1000);
    };

    startTimer()

    function runConfetti() {
        const canvas = document.getElementById("confettiCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const confettiCount = 120;
        const confetti = [];

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: random(0, canvas.width),
                y: random(-canvas.height, 0),
                size: random(6, 10),
                speedY: random(1, 3),        
                speedX: random(-1, 1),        
                rotation: random(0, Math.PI * 2),
                rotationSpeed: random(-0.05, 0.05), 
                wobble: random(0.5, 2.5),    
                wobbleAngle: random(0, Math.PI * 2),
                color: `hsl(${random(0, 360)}, 100%, 60%)`
            });
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach(c => {
                c.y += c.speedY;
                c.x += c.speedX;

                c.wobbleAngle += 0.1;
                c.x += Math.sin(c.wobbleAngle) * c.wobble;

                c.rotation += c.rotationSpeed;

                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
                ctx.restore();

                if (c.y > canvas.height + 20) {
                    c.y = -10;
                    c.x = random(0, canvas.width);
                }
            });

            requestAnimationFrame(render);
        }

        render();

        setTimeout(() => {
            $("#confettiCanvas").fadeOut(300);
        }, 3000);
    }

    isClicked = false;

    $(".offer_link").click(function(e){
        e.preventDefault();

        if (isClicked) return;
        isClicked = true;

        fbq('track', 'PageView');

        setTimeout(() => {
            window.location.href = $(this).attr("href");
        }, 500);

        setTimeout(() => {
            isClicked = false;
        }, 5000);
    });


// test
// $(".hero").fadeOut(0)
// $(".timer").fadeOut(0)
// $(".contact").fadeOut(0)
// $(".final").fadeIn(0)
// $("body").addClass("quiz-active")
// runConfetti()


})

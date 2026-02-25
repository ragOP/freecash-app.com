(function () {
    'use strict';

    var currentStep = 1;
    var totalSteps = 3;

    function showSurvey() {
        var timer = document.querySelector('.timer');
        var hero = document.querySelector('.hero');
        var reviews = document.querySelector('.reviews');
        var contact = document.querySelector('.contact');
        var survey = document.querySelector('.survey');
        if (timer) timer.style.display = 'none';
        if (hero) hero.style.display = 'none';
        if (reviews) reviews.style.display = 'none';
        if (contact) contact.style.display = 'none';
        if (survey) survey.style.display = 'block';

        currentStep = 1;
        var questions = document.querySelectorAll('.survey .question');
        questions.forEach(function (q) {
            q.style.display = q.classList.contains('question-1') ? 'block' : 'none';
        });

        var stepEl = document.querySelector('.current-step');
        var pctEl = document.querySelector('.progress-percentage');
        var lineEl = document.querySelector('.progress-line');
        if (stepEl) stepEl.textContent = '1';
        if (pctEl) pctEl.textContent = '0%';
        if (lineEl) lineEl.style.width = '0%';
    }

    function updateProgress(step) {
        var pct = Math.round((step / totalSteps) * 100);
        var stepEl = document.querySelector('.current-step');
        var pctEl = document.querySelector('.progress-percentage');
        var lineEl = document.querySelector('.progress-line');
        if (stepEl) stepEl.textContent = step;
        if (pctEl) pctEl.textContent = pct + '%';
        if (lineEl) lineEl.style.width = pct + '%';
    }

    function goToStep(step) {
        var questions = document.querySelectorAll('.survey .question');
        questions.forEach(function (q) {
            q.style.display = q.classList.contains('question-' + step) ? 'block' : 'none';
        });
        updateProgress(step <= 3 ? step : 3);
    }

    function showFinal() {
        var timer = document.querySelector('.timer');
        var survey = document.querySelector('.survey');
        var final = document.querySelector('.final');
        if (survey) survey.style.display = 'none';
        if (final) final.style.display = 'block';
        if (timer) timer.style.display = 'block';
    }

    function init() {
        // Get Started (hero button)
        var getStarted = document.querySelector('.landing .hero .btn-blink.uppercase');
        if (getStarted) {
            getStarted.addEventListener('click', function () {
                var survey = document.querySelector('.survey');
                if (survey && survey.style.display !== 'block') {
                    showSurvey();
                }
            });
        }

        // Quiz answers
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.survey .question .btn');
            if (!btn) return;
            var q = btn.closest('.question');
            if (!q) return;

            if (q.classList.contains('question-1')) {
                goToStep(2);
            } else if (q.classList.contains('question-2')) {
                goToStep(3);
            } else if (q.classList.contains('question-3')) {
                goToStep(5);
                updateProgress(3);
                setTimeout(showFinal, 2500);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

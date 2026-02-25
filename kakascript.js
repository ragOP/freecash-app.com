(function ($) {
    'use strict';

    var currentStep = 1;
    var totalSteps = 3;

    function showSurvey() {
        $('.hero').hide();
        $('.reviews').hide();
        $('.survey').css('display', 'block');
        currentStep = 1;
        $('.question').hide();
        $('.question-1').show();
        $('.current-step').text(1);
        $('.progress-percentage').text('0%');
        $('.progress-line').css('width', '0%');
    }

    function updateProgress(step) {
        var pct = Math.round((step / totalSteps) * 100);
        $('.current-step').text(step);
        $('.progress-percentage').text(pct + '%');
        $('.progress-line').css('width', pct + '%');
    }

    function goToStep(step) {
        $('.question').hide();
        $('.question-' + step).show();
        updateProgress(step);
    }

    function showFinal() {
        $('.survey').hide();
        $('.final').show();
    }

    // Get Started (hero only): show quiz and hide hero
    $(document).on('click', '.landing .hero .btn-blink.uppercase', function () {
        var $survey = $('.survey');
        if ($survey.length && $survey.is(':hidden')) {
            showSurvey();
        }
    });

    // Quiz answers: advance to next question or finish
    $(document).on('click', '.survey .question .btn', function () {
        var $q = $(this).closest('.question');
        if ($q.hasClass('question-1')) {
            goToStep(2);
        } else if ($q.hasClass('question-2')) {
            goToStep(3);
        } else if ($q.hasClass('question-3')) {
            goToStep(5); // loading step
            updateProgress(3);
            setTimeout(function () {
                showFinal();
            }, 2500);
        }
    });
})(jQuery);

$(document).ready(function() {
  $('.new-tweet #tweet-text').on('input', function() {
    textVal = $(this).val();
    charCount = $(this).closest('.new-tweet').find('.tweet-details .counter');
    charCount.text(140 - textVal.length);
    const counter = document.getElementById('charCounter');
    if (textVal.length > 140) {
      counter.classList.add('invalid');
    } else {
      counter.classList.remove('invalid');
    }
  });
});
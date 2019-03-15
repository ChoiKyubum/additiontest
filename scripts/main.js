var NBSP = String.fromCharCode(160);

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function makeTest() {
  $('.line .number').map(function(i, v) {
    var number = $(v);

    if (Math.floor(i / 3) < 2) {
      number.text(getRandomNumber());
      return;
    }

    number.text(NBSP);
  });
}

function checkAnswer() {
  var numbers = [0, 0, 0];
  $('.line').map(function(li, ld) {
    var nums = $(ld).find('.number');

    nums.map(function (ni, nd) {
      var num = $(nd).text();
      if (num === NBSP) {
        num = 0;
      }
      num = parseInt(num, 10);
      var decimal = Math.pow(10, (nums.length - 1) - ni);
      numbers[li] += num * decimal;
    });
  });

  return numbers[0] + numbers[1] === numbers[2];
}

$(function() {
  makeTest();

  var numberInputs = $('.number-input');

  numberInputs.map(function(i, numberInput){
    $(numberInput).click(function() {
      numberInputs.map(function (j, item) {
        $(item).removeClass('selected')
      });
      $(this).addClass('selected');
    });
  });

  $('.number-buttons .number').map(function(i, v) {
    var btn = $(v);
    btn.click(function() {
      if (btn.hasClass('erase')) {
        $('.number-input.selected').text(NBSP);
        return;
      }

      if (btn.hasClass('number-submit')) {
        var modal = $('.modal');
        if(checkAnswer()) {
          modal.removeClass('wrong');
          modal.addClass('right');
          modal.show();
        } else {
          modal.removeClass('right');
          modal.addClass('wrong');
          modal.show();
        }
        return;
      }

      var num = btn.text();
      $('.number-input.selected').text(num);
    });
  });

  $('.modal-btn').click(function() {
    var btn = $(this);

    if(btn.parent().parent().hasClass('right')) {
      makeTest();
    }

    $('.modal').hide();
  })
});

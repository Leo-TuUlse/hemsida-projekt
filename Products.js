

function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* skapar lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* sätter in lensen i programmet: */
    img.parentElement.insertBefore(lens, img);
    /* Räknar ut ratio mellan resultat DIV och lensen: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* sätter bakgrunds egenskaper för resultat DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Utfärdar en funktion när man rör musen över bilden eller lensen: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* Gör de möjligt för touch screens att fungera: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /* stoppar att något annat händer när musen rör sig över bilden. */
      e.preventDefault();
      /* Får musens x och y position: */
      pos = getCursorPos(e);
      /* räknar ut positionen av lensen: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* gör så att lensen inte kan åka utanför det bestämda området: */
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /* sätter postitionen på lensen: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Visar vad lensen ser: */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Får x och y postionen över bilden: */
      a = img.getBoundingClientRect();
      /* Räkna ut musens x och y kordinater relativ till bilden: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* räknar in om användaren skrollar */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

imageZoom("myimage", "myresult");
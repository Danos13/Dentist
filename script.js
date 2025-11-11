gsap.registerPlugin(ScrollTrigger);

class Clinic {
  addClass = (htmlElement, whichClass) => {
    htmlElement.classList.add(whichClass);
  };

  removeClass = (htmlElement, whichClass) => {
    htmlElement.classList.remove(whichClass);
  };

  displayOrDisapeare = (htmlElement, property) => {
    htmlElement.style.display = property;
  };

  darkOrLight(htmlElement, className) {
    htmlElement.classList.toggle(className);
  }

  textContentChange(htmlElement, text) {
    htmlElement.textContent = text;
  }
}

const myClinic = new Clinic();

/*Response menu */
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("nav");
const hamburgerIcon = document.querySelector(".choosen");

menuIcon.addEventListener("click", () => {
  if (hamburgerIcon.classList[2] === "fa-bars") {
    myClinic.addClass(hamburgerIcon, "fa-xmark");
    myClinic.removeClass(hamburgerIcon, "fa-bars");
    myClinic.displayOrDisapeare(menuList, "block");
  } else {
    myClinic.addClass(hamburgerIcon, "fa-bars");
    myClinic.removeClass(hamburgerIcon, "fa-xmark");
    myClinic.displayOrDisapeare(menuList, "none");
  }
});

/*animation with team images */

const svgFile = document.querySelectorAll(".bothText");
const txtFile = document.querySelectorAll(".text");

svgFile.forEach((svgfile, indexs) => {
  svgfile.addEventListener("mouseenter", () => {
    txtFile.forEach((item, indext) => {
      if (indext == indexs * 2 || indext == indexs * 2 + 1) {
        item.style.fontSize = "1.5rem";
      }
    }); // Zvětší písmo
  });
});

svgFile.forEach((svgfile, indexs) => {
  svgfile.addEventListener("mouseleave", () => {
    txtFile.forEach((item, indext) => {
      if (indext == indexs * 2 || indext == indexs * 2 + 1) {
        item.style.fontSize = "1.3rem";
      }
    }); // zmensi písmo
  });
});

/* animation with clinic images */

const svgFiles = document.querySelectorAll(".onlyUpperText");
const txtFile1 = document.querySelectorAll(".text1");

svgFiles.forEach((svgfile, indexs) => {
  svgfile.addEventListener("mouseenter", () => {
    txtFile1.forEach((item, indext) => {
      if (indext == indexs) {
        item.style.fontSize = "1.5rem";
      }
    }); // Zvětší písmo
  });
});

svgFiles.forEach((svgfile, indexs) => {
  svgfile.addEventListener("mouseleave", () => {
    txtFile1.forEach((item, indext) => {
      if (indext == indexs) {
        item.style.fontSize = "1.3rem";
      }
    }); // zmensi písmo
  });
});

/* Navigation */

gsap.fromTo(
  "header",
  { height: "70px" }, // výchozí stav
  {
    height: "40px", // cílový stav
    ease: "power2.out",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "+=200",
      scrub: true,
    },
  }
);

/*some info about doctor*/

const allQuestions = document.querySelectorAll(".faq-question");

allQuestions.forEach((questionEl) => {
  questionEl.addEventListener("click", function () {
    const answerEl = this.nextElementSibling;
    const isOpen = this.classList.contains("open");

    if (isOpen) {
      gsap.to(answerEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => (answerEl.style.display = "none"),
      });
      this.classList.remove("open");
    } else {
      answerEl.style.display = "block";
      gsap.fromTo(
        answerEl,
        { height: 0, opacity: 0 },
        {
          height: answerEl.scrollHeight,
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            answerEl.style.height = "auto";
            answerEl.style.borderTop = "1px solid #00bcd4";
          },
        }
      );

      this.classList.add("open");
    }
  });
});

/*Animations for page reloade*/
ScrollTrigger.batch(
  ".actualChange, .contactChange, .firstPart, .insuranceChange",
  {
    start: "top 80%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.12, // když jich vleze víc naráz → hezky postupně
      }),
  }
);

ScrollTrigger.batch(".opening, .mapsGoogle, .secondPart", {
  start: "top 80%",
  once: true,
  onEnter: (batch) =>
    gsap.to(batch, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.12, // když jich vleze víc naráz → hezky postupně
    }),
});

/*mapa*/

async function myMap() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  var mapProp = {
    center: new google.maps.LatLng(49.57455095613252, 18.76362800639648),
    zoom: 18,
    mapId: "1fa6ca6495f4be87",
  };
  var map = new google.maps.Map(document.querySelector(".mapsGoogle"), mapProp);

  const marker = new AdvancedMarkerElement({
    map,
    position: mapProp.center,
  });

  var infowindow = new google.maps.InfoWindow({
    content: "MDDr. Eva Świerzcek, Školní 388, 739 91 Jablunkov",
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });

  marker.setMap(map);
}

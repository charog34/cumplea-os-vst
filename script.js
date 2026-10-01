// ======================================================
// NAVEGACIÓN ENTRE PANTALLAS
// ======================================================

const screens = [...document.querySelectorAll(".screen")];
const bar = document.getElementById("bar");
const music = document.getElementById("music");

let currentScreen = 0;

function show(index) {
  screens[currentScreen].classList.remove("active");

  currentScreen = index;

  screens[currentScreen].classList.add("active");

  if (bar) {
    bar.style.width =
      ((currentScreen + 1) / screens.length) * 100 + "%";
  }
}

function next() {
  if (currentScreen < screens.length - 1) {
    show(currentScreen + 1);
  }
}


// ======================================================
// CORAZÓN + FRASES + BARRA DE DESBLOQUEO
// ======================================================

const heart = document.getElementById("heart");
const unlockBar = document.getElementById("unlockBar");
const unlockText = document.getElementById("unlockText");
const unlockPercent = document.getElementById("unlockPercent");


// FRASES QUE APARECERÁN CON CADA TOQUE
const unlockMessages = [
  "Toca el corazón para comenzar ❤️",
  "Otra vez… que esto recién empieza ❤️",
  "Algo se está encendiendo… ✨",
  "Sigue… que esto se calienta 💗",
  "Un poquito más, mi Hormiga 🐜",
  "No pares ahora… ya casi llegas 💞",
  "La última vez… ❤️"
];


let unlockStep = 0;
let unlockDone = false;


// ======================================================
// ACTUALIZA FRASE + PORCENTAJE + BARRA
// ======================================================

function renderUnlock() {

  const totalSteps = unlockMessages.length - 1;

  const percent = Math.round(
    (unlockStep / totalSteps) * 100
  );


  // Actualizar barra
  if (unlockBar) {
    unlockBar.style.width = percent + "%";
  }


  // Actualizar porcentaje
  if (unlockPercent) {
    unlockPercent.textContent = percent + "%";
  }


  // ACTUALIZAR LA FRASE
  if (unlockText) {

    // Pequeño efecto visual
    unlockText.style.opacity = "0";

    setTimeout(() => {

      unlockText.textContent =
        unlockMessages[unlockStep];

      unlockText.style.opacity = "1";

    }, 100);
  }
}


// Mostrar estado inicial
renderUnlock();


// ======================================================
// CUANDO SE TOCA EL CORAZÓN
// ======================================================

if (heart) {

  heart.addEventListener("click", function () {

    // Si ya llegó al 100 %, no hacer nada más
    if (unlockDone) {
      return;
    }


    // Intentar iniciar la música
    if (music && music.paused) {
      music.play().catch(() => {});
    }


    // Avanzar al siguiente mensaje
    if (unlockStep < unlockMessages.length - 1) {

      unlockStep++;

      // Actualiza inmediatamente:
      // frase + porcentaje + barra
      renderUnlock();
    }


    // Cuando llega al último mensaje
    if (unlockStep === unlockMessages.length - 1) {

      unlockDone = true;

      // Esperar para que pueda leer
      // "La última vez… ❤️"
      setTimeout(function () {
        next();
      }, 1200);
    }

  });

}


// ======================================================
// BOTONES "SIGUIENTE"
// ======================================================

document
  .querySelectorAll(".next")
  .forEach(function (button) {

    button.addEventListener("click", next);

  });


// ======================================================
// REINICIAR LA EXPERIENCIA
// ======================================================

const restartButton =
  document.getElementById("restart");

if (restartButton) {

  restartButton.addEventListener("click", function () {

    unlockStep = 0;
    unlockDone = false;

    renderUnlock();

    show(0);

  });

}


// ======================================================
// BOTÓN DE SONIDO
// ======================================================

const soundButton =
  document.getElementById("sound");

if (soundButton) {

  soundButton.addEventListener("click", function () {

    if (!music) return;

    if (music.paused) {

      music.play().catch(() => {});

    } else {

      music.pause();

    }

  });

}


// ======================================================
// GALERÍA DE FOTOS
// ======================================================

const pics = Array.from(
  { length: 7 },
  function (_, i) {
    return "fotos/foto" + (i + 1) + ".jpg";
  }
);


const captions = [

  "Momentos que merecen quedarse para siempre.",

  "Contigo, cualquier lugar se siente más bonito.",

  "Me gustan esos momentos sencillos… porque son nuestros.",

  "Y sí, Hormiga 🐜, todavía quedan muchísimas historias por vivir.",

  "Entre arena, sol y aventuras… contigo hasta perderse tiene su encanto. 😄",

  "Una Hormiguita 🐜, un Pollito 🐤 y demasiados recuerdos bonitos para contar.",

  "Si la vida es un viaje, qué bonito coincidir contigo en el camino. ❤️"

];


let photoIndex = 0;

const img = document.getElementById("photo");
const count = document.getElementById("count");
const caption = document.getElementById("caption");


// ======================================================
// CAMBIAR FOTO
// ======================================================

function setPhoto(index) {

  photoIndex =
    (index + pics.length) % pics.length;


  if (!img) return;


  img.style.opacity = "0";


  setTimeout(function () {

    img.src = pics[photoIndex];


    if (count) {
      count.textContent =
        (photoIndex + 1) + " / " + pics.length;
    }


    if (caption) {
      caption.textContent =
        captions[photoIndex];
    }


    img.style.opacity = "1";

  }, 150);
}


// ======================================================
// FLECHAS DE LA GALERÍA
// ======================================================

const prevButton =
  document.getElementById("prev");

const nextPhotoButton =
  document.getElementById("nextPhoto");


if (prevButton) {

  prevButton.addEventListener(
    "click",
    function () {
      setPhoto(photoIndex - 1);
    }
  );

}


if (nextPhotoButton) {

  nextPhotoButton.addEventListener(
    "click",
    function () {
      setPhoto(photoIndex + 1);
    }
  );

}


// ======================================================
// DESLIZAR LAS FOTOS CON EL DEDO
// ======================================================

let touchStartX = 0;


if (img) {

  img.addEventListener(
    "touchstart",
    function (event) {

      touchStartX =
        event.touches[0].clientX;

    },
    { passive: true }
  );


  img.addEventListener(
    "touchend",
    function (event) {

      const touchEndX =
        event.changedTouches[0].clientX;

      const difference =
        touchEndX - touchStartX;


      if (Math.abs(difference) > 45) {

        if (difference < 0) {

          setPhoto(photoIndex + 1);

        } else {

          setPhoto(photoIndex - 1);

        }

      }

    },
    { passive: true }
  );

}

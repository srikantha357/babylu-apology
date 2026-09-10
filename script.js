/* =========================================
   SCREEN NAVIGATION
========================================= */

const screens =
    [...document.querySelectorAll(".screen")];


function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.toggle(
            "active",
            screen.id === id
        );

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "screen4") {

        startWordRain();

    }

}


/* =========================================
   BUTTONS
========================================= */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.next
                );

            }
        );

    });



/* =========================================
   ORIGINAL APOLOGY MELODY
========================================= */

let audioCtx;

let playing = false;


const playBtn =
    document.getElementById("playBtn");

const status =
    document.getElementById("musicStatus");



function note(
    ctx,
    frequency,
    start,
    duration,
    gain = 0.055
) {

    const oscillator =
        ctx.createOscillator();

    const gainNode =
        ctx.createGain();


    oscillator.type = "sine";


    oscillator.frequency
        .setValueAtTime(
            frequency,
            start
        );


    gainNode.gain
        .setValueAtTime(
            0.0001,
            start
        );


    gainNode.gain
        .exponentialRampToValueAtTime(
            gain,
            start + 0.035
        );


    gainNode.gain
        .exponentialRampToValueAtTime(
            0.0001,
            start + duration
        );


    oscillator
        .connect(gainNode)
        .connect(ctx.destination);


    oscillator.start(start);

    oscillator.stop(
        start + duration + .05
    );

}



function playMelody() {

    audioCtx =
        audioCtx ||
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();


    const now =
        audioCtx.currentTime + .05;


    /*
       Gentle original melody
       Warm / nostalgic / romantic
    */

    const melody = [

        [440, 0.00, .42],

        [523.25, .45, .42],

        [659.25, .90, .55],

        [587.33, 1.48, .42],

        [523.25, 1.93, .65],

        [392.00, 2.68, .42],

        [440.00, 3.13, .42],

        [523.25, 3.58, .62],

        [493.88, 4.24, .42],

        [440.00, 4.69, .65],

        [349.23, 5.44, .42],

        [392.00, 5.89, .42],

        [440.00, 6.34, .75],

        [523.25, 7.15, .42],

        [587.33, 7.60, .42],

        [659.25, 8.05, 1.0],

        [587.33, 9.10, .42],

        [523.25, 9.55, .42],

        [440.00, 10.00, 1.25]

    ];


    melody.forEach(
        ([frequency, time, duration]) => {

            note(
                audioCtx,
                frequency,
                now + time,
                duration
            );

        }
    );


    status.textContent =
        "playing… ❤️";


    playBtn.classList.add(
        "playing"
    );


    playing = true;


    setTimeout(() => {

        playBtn.classList.remove(
            "playing"
        );

        status.textContent =
            "for you, Babylu";

        playing = false;

    }, 11600);

}



playBtn.addEventListener(
    "click",
    () => {

        if (!playing) {

            playMelody();

        }

    }
);



/* =========================================
   FALLING EMOTIONAL WORDS
========================================= */

const words = [

    "I'M SORRY",

    "I CARE",

    "I LOVE YOU",

    "I CHOOSE US",

    "BABYLU ♡",

    "I'M TRYING",

    "YOU MATTER",

    "I MISS YOU",

    "PLEASE SMILE",

    "ALWAYS US",

    "MY PERSON",

    "I'M LISTENING",

    "I LOVE YOU",

    "US ♡"

];


function startWordRain() {

    const rain =
        document.getElementById(
            "wordRain"
        );


    if (rain.dataset.started) {

        return;

    }


    rain.dataset.started = "1";


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const element =
            document.createElement(
                "span"
            );


        element.className =
            "word";


        element.textContent =
            words[
                i % words.length
            ];


        element.style.left =
            (Math.random() * 92)
            + "%";


        element.style.animationDuration =
            (5 + Math.random() * 7)
            + "s";


        element.style.animationDelay =
            (Math.random() * 5)
            + "s";


        element.style.fontSize =
            (12 + Math.random() * 12)
            + "px";


        rain.appendChild(
            element
        );

    }

}

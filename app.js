/* =====================================
   PREGUNTAS
===================================== */

const questions = {

    tecnologia: [

        {
            question:
                "¿Cuál de estas opciones es una fuente de energía renovable?",

            options: [
                "Carbón",
                "Petróleo",
                "Energía solar",
                "Gas natural"
            ],

            correct: 2,

            hint:
                "Proviene directamente del Sol."
        },

        {
            question:
                "¿Qué lenguaje se utiliza principalmente para dar interactividad a una página web?",

            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],

            correct: 2,

            hint:
                "Es el lenguaje que permite programar comportamientos en el navegador."
        },

        {
            question:
                "¿Qué significa PWA?",

            options: [
                "Personal Web Application",
                "Progressive Web App",
                "Public Web Access",
                "Program Web Assistant"
            ],

            correct: 1,

            hint:
                "Son aplicaciones web que pueden comportarse como aplicaciones instalables."
        },

        {
            question:
                "¿Cuál de estos sirve para almacenar información en el navegador?",

            options: [
                "localStorage",
                "Photoshop",
                "Bluetooth",
                "HTML"
            ],

            correct: 0,

            hint:
                "Su nombre contiene la palabra 'storage'."
        }

    ],


    universidad: [

        {
            question:
                "¿Cuál es una buena estrategia para estudiar?",

            options: [
                "Estudiar todo la noche anterior",
                "No tomar descansos",
                "Repasar periódicamente",
                "Evitar hacer preguntas"
            ],

            correct: 2,

            hint:
                "La repetición espaciada ayuda a recordar información."
        },

        {
            question:
                "¿Qué herramienta ayuda a organizar tareas?",

            options: [
                "Calendario",
                "Videojuego",
                "Editor de fotos",
                "Reproductor musical"
            ],

            correct: 0,

            hint:
                "Sirve para organizar fechas y actividades."
        },

        {
            question:
                "¿Qué habilidad es importante para trabajar en equipo?",

            options: [
                "Comunicación",
                "Ignorar opiniones",
                "Trabajar siempre solo",
                "No compartir información"
            ],

            correct: 0,

            hint:
                "Permite intercambiar ideas con los demás."
        }

    ],


    cultura: [

        {
            question:
                "¿Cuál es el planeta conocido como el planeta rojo?",

            options: [
                "Venus",
                "Marte",
                "Júpiter",
                "Mercurio"
            ],

            correct: 1,

            hint:
                "Su superficie contiene mucho óxido de hierro."
        },

        {
            question:
                "¿Cuál es el océano más grande del planeta?",

            options: [
                "Atlántico",
                "Índico",
                "Pacífico",
                "Ártico"
            ],

            correct: 2,

            hint:
                "Se encuentra entre Asia y América."
        },

        {
            question:
                "¿Cuál es la capital de Colombia?",

            options: [
                "Medellín",
                "Cali",
                "Cartagena",
                "Bogotá"
            ],

            correct: 3,

            hint:
                "Es una ciudad ubicada en la cordillera Oriental."
        }

    ],


    innovacion: [

        {
            question:
                "¿Qué caracteriza principalmente a una innovación?",

            options: [
                "Crear valor mediante una idea nueva o mejorada",
                "Copiar exactamente algo existente",
                "Eliminar todos los cambios",
                "Evitar resolver problemas"
            ],

            correct: 0,

            hint:
                "Una innovación busca aportar algo útil o diferente."
        },

        {
            question:
                "¿Qué significa prototipar?",

            options: [
                "Crear una versión inicial para probar una idea",
                "Eliminar una idea",
                "Publicar el producto final",
                "No probar nada"
            ],

            correct: 0,

            hint:
                "Es una versión preliminar de un producto."
        },

        {
            question:
                "¿Cuál es una buena característica de una idea innovadora?",

            options: [
                "Resolver un problema real",
                "Ser complicada sin razón",
                "No tener usuarios",
                "No aportar ningún valor"
            ],

            correct: 0,

            hint:
                "La innovación normalmente parte de una necesidad."
        }

    ]

};


/* =====================================
   VARIABLES
===================================== */

let selectedCategory = null;

let currentQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let lives = 3;

let combo = 0;

let bestCombo = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let timeLeft = 60;

let timerInterval = null;

let hintUsed = false;


let bestScore =
    Number(localStorage.getItem("bestScore")) || 0;


/* =====================================
   ELEMENTOS
===================================== */

const homeScreen =
    document.getElementById("homeScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");


const categories =
    document.querySelectorAll(".category");


const startGame =
    document.getElementById("startGame");


const question =
    document.getElementById("question");


const questionNumber =
    document.getElementById("questionNumber");


const options =
    document.getElementById("options");


const timer =
    document.getElementById("timer");


const timerCircle =
    document.getElementById("timerCircle");


const scoreElement =
    document.getElementById("score");


const roundElement =
    document.getElementById("round");


const bestElement =
    document.getElementById("best");


const livesElement =
    document.getElementById("lives");


const comboElement =
    document.getElementById("combo");


const feedback =
    document.getElementById("feedback");


const hint =
    document.getElementById("hint");


const hintButton =
    document.getElementById("hintButton");


const nextButton =
    document.getElementById("nextButton");


/* =====================================
   SELECCIONAR CATEGORÍA
===================================== */

categories.forEach(category => {

    category.addEventListener(
        "click",
        () => {

            categories.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });

            category.classList.add(
                "selected"
            );

            selectedCategory =
                category.dataset.category;

        }
    );

});


/* =====================================
   INICIAR JUEGO
===================================== */

startGame.addEventListener(
    "click",
    startGameFunction
);


function startGameFunction() {

    if (!selectedCategory) {

        alert(
            "Primero selecciona una categoría."
        );

        return;
    }


    currentQuestions =
        [...questions[selectedCategory]]
            .sort(
                () => Math.random() - 0.5
            );


    currentQuestionIndex = 0;

    score = 0;

    lives = 3;

    combo = 0;

    bestCombo = 0;

    correctAnswers = 0;

    wrongAnswers = 0;


    scoreElement.textContent =
        score;


    bestElement.textContent =
        bestScore;


    updateLives();


    showScreen(gameScreen);


    loadQuestion();

}


/* =====================================
   CAMBIAR PANTALLA
===================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    screen.classList.add(
        "active"
    );

}


/* =====================================
   CARGAR PREGUNTA
===================================== */

function loadQuestion() {

    if (
        currentQuestionIndex >=
        currentQuestions.length
    ) {

        endGame();

        return;
    }


    const current =
        currentQuestions[
            currentQuestionIndex
        ];


    question.textContent =
        current.question;


    questionNumber.textContent =
        `RETO #${currentQuestionIndex + 1}`;


    roundElement.textContent =
        currentQuestionIndex + 1;


    options.innerHTML = "";


    feedback.textContent =
        "";


    hint.classList.remove(
        "show"
    );


    hintButton.style.display =
        "block";


    nextButton.style.display =
        "none";


    hintUsed = false;


    current.options.forEach(
        (optionText, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                optionText;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            options.appendChild(
                button
            );

        }
    );


    resetTimer();

}


/* =====================================
   TEMPORIZADOR
===================================== */

function resetTimer() {

    clearInterval(
        timerInterval
    );


    timeLeft = 60;


    timer.textContent =
        timeLeft;


    timerCircle.classList.remove(
        "warning"
    );


    timerInterval =
        setInterval(
            () => {

                timeLeft--;


                timer.textContent =
                    timeLeft;


                if (
                    timeLeft <= 10
                ) {

                    timerCircle.classList.add(
                        "warning"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    timeOut();

                }

            },
            1000
        );

}


/* =====================================
   TIEMPO AGOTADO
===================================== */

function timeOut() {

    lives--;

    wrongAnswers++;

    combo = 0;

    comboElement.textContent = "";

    updateLives();


    feedback.textContent =
        "⏰ ¡Se acabó el tiempo!";


    feedback.style.color =
        "#ef4444";


    disableOptions();


    showCorrectAnswer();


    nextButton.style.display =
        "block";


    hintButton.style.display =
        "none";


    if (lives <= 0) {

        setTimeout(
            endGame,
            800
        );

    }

}


/* =====================================
   COMPROBAR RESPUESTA
===================================== */

function checkAnswer(
    selectedIndex,
    selectedButton
) {

    clearInterval(
        timerInterval
    );


    disableOptions();


    const current =
        currentQuestions[
            currentQuestionIndex
        ];


    if (
        selectedIndex ===
        current.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );


        correctAnswers++;


        combo++;


        if (
            combo > bestCombo
        ) {

            bestCombo =
                combo;

        }


        let points = 100;


        if (
            combo >= 2
        ) {

            points +=
                combo * 20;

        }


        if (!hintUsed) {

            points += 20;

        }


        score += points;


        scoreElement.textContent =
            score;


        feedback.textContent =
            `🎉 ¡Correcto! +${points} puntos`;


        feedback.style.color =
            "#16a34a";


        comboElement.textContent =
            combo >= 2
                ? `🔥 COMBO x${combo}`
                : "";


    } else {

        selectedButton.classList.add(
            "wrong"
        );


        lives--;

        wrongAnswers++;

        combo = 0;


        comboElement.textContent =
            "";


        updateLives();


        feedback.textContent =
            "❌ Respuesta incorrecta";


        feedback.style.color =
            "#ef4444";


        showCorrectAnswer();

    }


    hintButton.style.display =
        "none";


    nextButton.style.display =
        "block";


    if (
        lives <= 0
    ) {

        setTimeout(
            endGame,
            800
        );

    }

}


/* =====================================
   RESPUESTA CORRECTA
===================================== */

function showCorrectAnswer() {

    const current =
        currentQuestions[
            currentQuestionIndex
        ];


    const optionButtons =
        document.querySelectorAll(
            ".option"
        );


    optionButtons[
        current.correct
    ].classList.add(
        "correct"
    );

}


/* =====================================
   DESACTIVAR OPCIONES
===================================== */

function disableOptions() {

    document
        .querySelectorAll(".option")
        .forEach(button => {

            button.classList.add(
                "disabled"
            );

        });

}


/* =====================================
   VIDAS
===================================== */

function updateLives() {

    let hearts = "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        hearts +=
            i < lives
                ? "❤️ "
                : "🖤 ";

    }


    livesElement.textContent =
        hearts;

}


/* =====================================
   PISTA
===================================== */

hintButton.addEventListener(
    "click",
    () => {

        const current =
            currentQuestions[
                currentQuestionIndex
            ];


        hint.textContent =
            "💡 Pista: " +
            current.hint;


        hint.classList.add(
            "show"
        );


        hintUsed = true;


        hintButton.style.display =
            "none";

    }
);


/* =====================================
   SIGUIENTE
===================================== */

nextButton.addEventListener(
    "click",
    () => {

        currentQuestionIndex++;


        if (
            lives <= 0
        ) {

            endGame();

            return;

        }


        loadQuestion();

    }
);


/* =====================================
   FINAL
===================================== */

function endGame() {

    clearInterval(
        timerInterval
    );


    if (
        score > bestScore
    ) {

        bestScore =
            score;


        localStorage.setItem(
            "bestScore",
            bestScore
        );

    }


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "correctAnswers"
    ).textContent =
        correctAnswers;


    document.getElementById(
        "wrongAnswers"
    ).textContent =
        wrongAnswers;


    document.getElementById(
        "bestCombo"
    ).textContent =
        bestCombo;


    document.getElementById(
        "totalRounds"
    ).textContent =
        currentQuestionIndex + 1;


    showScreen(
        resultScreen
    );

}


/* =====================================
   JUGAR OTRA VEZ
===================================== */

document
    .getElementById("playAgain")
    .addEventListener(
        "click",
        () => {

            selectedCategory =
                null;


            categories.forEach(
                category => {

                    category.classList.remove(
                        "selected"
                    );

                }
            );


            showScreen(
                homeScreen
            );

        }
    );


/* =====================================
   MODO OSCURO
===================================== */

document
    .getElementById("darkMode")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            document.getElementById(
                "darkMode"
            ).textContent =
                dark
                    ? "☀️"
                    : "🌙";


            localStorage.setItem(
                "darkMode",
                dark
            );

        }
    );


/* =====================================
   RECUPERAR MODO OSCURO
===================================== */

if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );


    document.getElementById(
        "darkMode"
    ).textContent =
        "☀️";

}


/* =====================================
   SERVICE WORKER
===================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")
                .then(() => {

                    console.log(
                        "PWA instalada correctamente."
                    );

                })
                .catch(error => {

                    console.error(
                        "Error del Service Worker:",
                        error
                    );

                });

        }
    );

}

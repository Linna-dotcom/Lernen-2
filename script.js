/* =====================================================
   NAVIGATION
===================================================== */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateProgress();

    if (pageId === "quiz") {
        createQuiz();
    }
}


function toggleNavigation() {

    const nav = document.getElementById("navigation");

    if (nav.style.display === "none") {
        nav.style.display = "flex";
    } else {
        nav.style.display = "flex";
    }
}


/* =====================================================
   LERNFORTSCHRITT
===================================================== */

function getTaskBoxes() {

    return document.querySelectorAll(
        'input[type="checkbox"][data-task]'
    );

}


function loadProgress() {

    getTaskBoxes().forEach(box => {

        const key =
            "politik_task_" + box.dataset.task;

        if (localStorage.getItem(key) === "true") {
            box.checked = true;
        }

        box.addEventListener("change", function () {

            localStorage.setItem(
                key,
                this.checked
            );

            updateProgress();

        });

    });

}


function updateProgress() {

    const boxes = getTaskBoxes();

    let completed = 0;

    boxes.forEach(box => {

        const key =
            "politik_task_" + box.dataset.task;

        if (
            box.checked ||
            localStorage.getItem(key) === "true"
        ) {
            completed++;
        }

    });


    const total = boxes.length;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    const progressPercent =
        document.getElementById("progressPercent");

    const progressBar =
        document.getElementById("progressBar");

    const bigPercent =
        document.getElementById("bigPercent");

    const bigBar =
        document.getElementById("bigBar");

    const progressMessage =
        document.getElementById("progressMessage");


    if (progressPercent) {
        progressPercent.textContent =
            percentage + " %";
    }

    if (progressBar) {
        progressBar.style.width =
            percentage + "%";
    }

    if (bigPercent) {
        bigPercent.textContent =
            percentage + " %";
    }

    if (bigBar) {
        bigBar.style.width =
            percentage + "%";
    }


    if (progressMessage) {

        if (percentage === 0) {

            progressMessage.textContent =
                "Fang mit dem ersten Thema an!";

        } else if (percentage < 30) {

            progressMessage.textContent =
                "Du hast angefangen – weiter so!";

        } else if (percentage < 60) {

            progressMessage.textContent =
                "Schon einiges geschafft!";

        } else if (percentage < 90) {

            progressMessage.textContent =
                "Fast geschafft!";

        } else if (percentage < 100) {

            progressMessage.textContent =
                "Nur noch ein bisschen!";

        } else {

            progressMessage.textContent =
                "🎉 Alle Lernaufgaben abgeschlossen!";

        }

    }

}


function resetProgress() {

    const confirmReset =
        confirm(
            "Möchtest du deinen gesamten Lernfortschritt zurücksetzen?"
        );

    if (!confirmReset) {
        return;
    }


    getTaskBoxes().forEach(box => {

        box.checked = false;

        localStorage.removeItem(
            "politik_task_" + box.dataset.task
        );

    });


    updateProgress();
}



/* =====================================================
   QUIZ
===================================================== */

const questions = [

    {
        q: "In welchen Artikeln stehen die Grundrechte?",
        a: [
            "Art. 1–19 GG",
            "Art. 20–30 GG",
            "Art. 50–60 GG",
            "Art. 70–80 GG"
        ],
        c: 0
    },

    {
        q: "Was steht in Art. 1 GG im Mittelpunkt?",
        a: [
            "Die Menschenwürde",
            "Das Eigentum",
            "Die Berufsfreiheit",
            "Die Versammlungsfreiheit"
        ],
        c: 0
    },

    {
        q: "Welcher Artikel behandelt die Gleichheit?",
        a: [
            "Art. 2",
            "Art. 3",
            "Art. 5",
            "Art. 9"
        ],
        c: 1
    },

    {
        q: "Welcher Artikel schützt unter anderem die Meinungsfreiheit?",
        a: [
            "Art. 4",
            "Art. 5",
            "Art. 8",
            "Art. 14"
        ],
        c: 1
    },

    {
        q: "Welcher Artikel betrifft die Versammlungsfreiheit?",
        a: [
            "Art. 6",
            "Art. 8",
            "Art. 11",
            "Art. 17"
        ],
        c: 1
    },

    {
        q: "Was bedeutet Volkssouveränität?",
        a: [
            "Alle Staatsgewalt geht vom Volke aus.",
            "Nur Gerichte bestimmen die Politik.",
            "Nur Parteien dürfen politische Entscheidungen treffen.",
            "Die Regierung steht über dem Grundgesetz."
        ],
        c: 0
    },

    {
        q: "Welche drei Gewalten gehören zur Gewaltenteilung?",
        a: [
            "Bund, Länder, Gemeinden",
            "Legislative, Exekutive, Judikative",
            "Parteien, Verbände, Medien",
            "Regierung, Bürger, Unternehmen"
        ],
        c: 1
    },

    {
        q: "Was ist die Legislative?",
        a: [
            "Gesetzgebende Gewalt",
            "Ausführende Gewalt",
            "Richterliche Gewalt",
            "Polizeiliche Gewalt"
        ],
        c: 0
    },

    {
        q: "Was ist die Exekutive?",
        a: [
            "Gesetzgebende Gewalt",
            "Ausführende Gewalt",
            "Richterliche Gewalt",
            "Wahlgewalt"
        ],
        c: 1
    },

    {
        q: "Was ist die Judikative?",
        a: [
            "Gesetzgebende Gewalt",
            "Ausführende Gewalt",
            "Richterliche Gewalt",
            "Parteigewalt"
        ],
        c: 2
    },

    {
        q: "Was soll Gewaltenteilung verhindern?",
        a: [
            "Machtkonzentration",
            "Wahlen",
            "Parteien",
            "Grundrechte"
        ],
        c: 0
    },

    {
        q: "Was ist eine Partei?",
        a: [
            "Ein Zusammenschluss von Menschen mit gemeinsamen politischen Vorstellungen und Interessen.",
            "Ein Gericht.",
            "Ein Unternehmen.",
            "Eine staatliche Behörde."
        ],
        c: 0
    },

    {
        q: "Was bedeutet Artikulationsfunktion?",
        a: [
            "Interessen werden im politischen Prozess zum Ausdruck gebracht.",
            "Interessen werden verboten.",
            "Gerichte sprechen Urteile.",
            "Gesetze werden ausgeführt."
        ],
        c: 0
    },

    {
        q: "Was bedeutet Aggregationsfunktion?",
        a: [
            "Unterschiedliche Interessen werden gebündelt.",
            "Wahlen werden abgeschafft.",
            "Menschen werden bestraft.",
            "Gesetze werden aufgehoben."
        ],
        c: 0
    },

    {
        q: "Was bedeutet Partizipationsfunktion?",
        a: [
            "Politische Beteiligung wird ermöglicht.",
            "Politische Beteiligung wird verhindert.",
            "Gerichte werden gewählt.",
            "Gesetze werden automatisch beschlossen."
        ],
        c: 0
    },

    {
        q: "Was bedeutet Integrationsfunktion?",
        a: [
            "Unterschiedliche Gruppen und Meinungen werden in den politischen Prozess eingebunden.",
            "Nur eine Meinung wird zugelassen.",
            "Parteien werden verboten.",
            "Verbände werden aufgelöst."
        ],
        c: 0
    },

    {
        q: "Was bedeutet Rekrutierungsfunktion?",
        a: [
            "Personen werden für politische Aufgaben und Ämter gewonnen.",
            "Wähler werden ausgeschlossen.",
            "Gerichte werden kontrolliert.",
            "Verbände werden gegründet."
        ],
        c: 0
    },

    {
        q: "Was ist ein Verband?",
        a: [
            "Ein Zusammenschluss zur Vertretung gemeinsamer Interessen.",
            "Eine Staatsgewalt.",
            "Ein Gericht.",
            "Eine Wahl."
        ],
        c: 0
    },

    {
        q: "Was ist ein wichtiger Unterschied zwischen Partei und Verband?",
        a: [
            "Parteien wirken an der politischen Willensbildung mit; Verbände vertreten bestimmte Interessen.",
            "Verbände wählen den Bundeskanzler.",
            "Parteien dürfen keine Interessen vertreten.",
            "Es gibt keinen Unterschied."
        ],
        c: 0
    },

    {
        q: "Welches Thema gehört zum Tierwohl?",
        a: [
            "Nutztierhaltung",
            "Raumfahrt",
            "Schulnoten",
            "Verkehrszeichen"
        ],
        c: 0
    },

    {
        q: "Wie viel Fleisch pro Person und Jahr wird in deinem Material ungefähr genannt?",
        a: [
            "60 kg",
            "6 kg",
            "160 kg",
            "600 kg"
        ],
        c: 0
    },

    {
        q: "Was soll eine Tierwohlkennzeichnung zeigen?",
        a: [
            "Wie tiergerecht ein Betrieb beziehungsweise die Haltung ist.",
            "Welche Partei gewählt wurde.",
            "Wie viele Sitze der Landtag hat.",
            "Wie viele Menschen in einem Betrieb arbeiten."
        ],
        c: 0
    },

    {
        q: "Welcher Zielkonflikt wird beim Tierwohl genannt?",
        a: [
            "Tierwohl – Wirtschaft – bezahlbare Lebensmittel",
            "Schule – Sport – Musik",
            "Wahlen – Parteien – Gerichte",
            "Bund – EU – UNO"
        ],
        c: 0
    },

    {
        q: "Wie viele Sitze hat der neue Landtag Sachsen-Anhalts?",
        a: [
            "83",
            "42",
            "39",
            "100"
        ],
        c: 0
    },

    {
        q: "Wie viele Sitze sind für eine absolute Mehrheit notwendig?",
        a: [
            "42",
            "39",
            "31",
            "83"
        ],
        c: 0
    },

    {
        q: "Wie viele Sitze erhielt die AfD 2026?",
        a: [
            "39",
            "15",
            "8",
            "5"
        ],
        c: 0
    },

    {
        q: "Was bedeutet 'sachlich richtig' bei einer Stellungnahme?",
        a: [
            "Das Urteil wird auf fachlich richtige Kenntnisse gestützt.",
            "Man schreibt nur seine Meinung.",
            "Man verwendet keine Informationen.",
            "Man nennt nur Gegenargumente."
        ],
        c: 0
    },

    {
        q: "Was bedeutet 'begründet'?",
        a: [
            "Man erklärt nachvollziehbar, warum man zu seinem Urteil kommt.",
            "Man schreibt nur 'Ich finde'.",
            "Man nennt keine Argumente.",
            "Man schreibt möglichst kurz."
        ],
        c: 0
    },

    {
        q: "Was bedeutet 'kriterienorientiert'?",
        a: [
            "Man beurteilt nach nachvollziehbaren Maßstäben.",
            "Man entscheidet zufällig.",
            "Man verwendet nur Gefühle.",
            "Man ignoriert Fachwissen."
        ],
        c: 0
    },

    {
        q: "Was bedeutet 'multiperspektivisch'?",
        a: [
            "Man berücksichtigt unterschiedliche Interessen, Folgen und Gegenargumente.",
            "Man betrachtet nur die eigene Meinung.",
            "Man verwendet nur eine Quelle.",
            "Man lässt Gegenargumente weg."
        ],
        c: 0
    },

    {
        q: "Wie soll das abschließende Urteil sein?",
        a: [
            "Eigenständig, begründet und differenziert.",
            "Nur 'Ich finde ...'.",
            "Ohne Begründung.",
            "Nur aus einem Wort bestehen."
        ],
        c: 0
    }

];


function createQuiz() {

    const container =
        document.getElementById("quizContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    questions.forEach((question, index) => {

        const box =
            document.createElement("div");

        box.className = "quiz-question";


        const title =
            document.createElement("h3");

        title.textContent =
            (index + 1) + ". " + question.q;

        box.appendChild(title);


        question.a.forEach((answer, answerIndex) => {

            const label =
                document.createElement("label");

            label.className = "quiz-option";


            const radio =
                document.createElement("input");

            radio.type = "radio";

            radio.name =
                "question_" + index;

            radio.value =
                answerIndex;


            label.appendChild(radio);

            label.appendChild(
                document.createTextNode(
                    " " + answer
                )
            );


            box.appendChild(label);

        });


        container.appendChild(box);

    });


    const button =
        document.createElement("button");

    button.className = "quiz-submit";

    button.textContent =
        "Quiz auswerten";

    button.onclick =
        evaluateQuiz;


    container.appendChild(button);

}


function evaluateQuiz() {

    let correct = 0;

    let answered = 0;


    questions.forEach((question, index) => {

        const selected =
            document.querySelector(
                'input[name="question_' +
                index +
                '"]:checked'
            );


        if (!selected) {
            return;
        }


        answered++;


        if (
            Number(selected.value) ===
            question.c
        ) {
            correct++;
        }

    });


    const old =
        document.querySelector(".quiz-result");

    if (old) {
        old.remove();
    }


    const percentage =
        Math.round(
            correct /
            questions.length *
            100
        );


    let message;


    if (percentage >= 90) {

        message =
            "🎉 Sehr stark!";

    } else if (percentage >= 75) {

        message =
            "👍 Sehr gut!";

    } else if (percentage >= 60) {

        message =
            "🙂 Schon gut – wiederhole die falschen Themen.";

    } else {

        message =
            "📚 Wiederhole die Lernbereiche noch einmal.";

    }


    const result =
        document.createElement("div");

    result.className =
        "quiz-result";


    result.innerHTML =
        "<strong>" +
        message +
        "</strong><br><br>" +

        correct +
        " von " +
        questions.length +
        " Fragen richtig.<br>" +

        "Beantwortet: " +
        answered +
        " von " +
        questions.length +
        "<br><br>" +

        "Ergebnis: " +
        percentage +
        " %";


    const container =
        document.getElementById(
            "quizContainer"
        );


    container.prepend(result);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProgress();

        updateProgress();

    }
);
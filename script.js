const teacherLetters = {

    "Ma'am Michelle Garcia": {
        pin: "1234",
        file: "mich.png"
    },

    "Ma'am Armie Q. Valencia": {
        pin: "2345",
        file: "armie.png"
    },

    "Sir Jerwin Catambing": {
        pin: "5678",
        file: "jerwin.png"
    },

    "Dr. Jane Fernandez": {
        pin: "7890",
        file: "jane.png"
    }

};


let currentTeacher = "";
let enteredPin = "";
let downloadMode = false;


const pinModalElement =
    document.getElementById("pinModal");

const letterModalElement =
    document.getElementById("letterModal");


const pinModal =
    new bootstrap.Modal(pinModalElement);

const letterModal =
    new bootstrap.Modal(letterModalElement);


function openTeacherLetter(teacherName) {

    if (!teacherLetters[teacherName]) {

        console.error(
            "Teacher not found:",
            teacherName
        );

        return;
    }


    currentTeacher = teacherName;

    downloadMode = false;

    resetPinScreen();


    document.getElementById(
        "pinTeacherName"
    ).textContent = teacherName;


    pinModal.show();

}


function downloadTeacherLetter(teacherName) {

    if (!teacherLetters[teacherName]) {

        console.error(
            "Teacher not found:",
            teacherName
        );

        return;
    }


    currentTeacher = teacherName;

    downloadMode = true;

    resetPinScreen();


    document.getElementById(
        "pinTeacherName"
    ).textContent = teacherName;


    pinModal.show();

}


function enterPin(number) {

    if (enteredPin.length >= 4) {
        return;
    }


    enteredPin += String(number);


    updatePinDots();

    hidePinError();


    if (enteredPin.length === 4) {

        setTimeout(function () {

            verifyPin();

        }, 300);

    }

}


function deletePin() {

    if (enteredPin.length === 0) {
        return;
    }


    enteredPin =
        enteredPin.slice(0, -1);


    updatePinDots();

    hidePinError();

}


function updatePinDots() {

    const dots =
        document.querySelectorAll(
            "#pinDots span"
        );


    dots.forEach(
        function (dot, index) {

            if (
                index <
                enteredPin.length
            ) {

                dot.classList.add(
                    "active"
                );

            } else {

                dot.classList.remove(
                    "active"
                );

            }

        }
    );

}


function verifyPin() {

    const teacher =
        teacherLetters[currentTeacher];


    if (!teacher) {

        showPinError();

        return;
    }


    if (
        enteredPin ===
        teacher.pin
    ) {

        unlockAnimation();


        setTimeout(
            function () {

                pinModal.hide();


                if (downloadMode) {

                    downloadLetterFile(
                        teacher.file
                    );

                } else {

                    openLetterFile(
                        currentTeacher,
                        teacher.file
                    );

                }


                enteredPin = "";

            },
            800
        );


    } else {

        showPinError();


        enteredPin = "";

        updatePinDots();

    }

}


function unlockAnimation() {

    const lockContainer =
        document.getElementById(
            "lockContainer"
        );


    const lockIcon =
        document.getElementById(
            "lockIcon"
        );


    lockContainer.classList.add(
        "unlocked"
    );


    lockIcon.classList.remove(
        "bi-lock-fill"
    );


    lockIcon.classList.add(
        "bi-unlock-fill"
    );

}


function resetPinScreen() {

    enteredPin = "";


    updatePinDots();

    hidePinError();


    const lockContainer =
        document.getElementById(
            "lockContainer"
        );


    const lockIcon =
        document.getElementById(
            "lockIcon"
        );


    lockContainer.classList.remove(
        "unlocked"
    );


    lockIcon.classList.remove(
        "bi-unlock-fill"
    );


    lockIcon.classList.add(
        "bi-lock-fill"
    );

}


function showPinError() {

    const error =
        document.getElementById(
            "pinError"
        );


    error.classList.remove(
        "show"
    );


    void error.offsetWidth;


    error.classList.add(
        "show"
    );

}


function hidePinError() {

    const error =
        document.getElementById(
            "pinError"
        );


    error.classList.remove(
        "show"
    );

}


function openLetterFile(
    teacherName,
    file
) {

    const modalTitle =
        document.getElementById(
            "letterModalTitle"
        );


    const frame =
        document.getElementById(
            "letterFrame"
        );


    const image =
        document.getElementById(
            "letterImage"
        );


    modalTitle.textContent =
        teacherName +
        " — Teachers' Day Letter";


    frame.style.display = "none";

    image.style.display = "none";


    frame.src = "";

    image.src = "";


    const extension =
        file
            .split("?")[0]
            .split(".")
            .pop()
            .toLowerCase();


    if (
        extension === "pdf"
    ) {

        frame.src = file;

        frame.style.display =
            "block";

    }


    else if (

        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "webp" ||
        extension === "gif"

    ) {

        image.src = file;

        image.style.display =
            "block";

    }


    else {

        console.error(
            "Unsupported file type:",
            extension
        );

        return;
    }


    letterModal.show();

}


function downloadLetterFile(file) {

    const link =
        document.createElement("a");


    link.href = file;


    link.download =
        file.split("/").pop();


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );

}


pinModalElement.addEventListener(
    "hidden.bs.modal",
    function () {

        enteredPin = "";

        currentTeacher = "";

        downloadMode = false;

        resetPinScreen();

    }
);


letterModalElement.addEventListener(
    "hidden.bs.modal",
    function () {

        const frame =
            document.getElementById(
                "letterFrame"
            );


        const image =
            document.getElementById(
                "letterImage"
            );


        frame.src = "";

        image.src = "";


        frame.style.display =
            "none";

        image.style.display =
            "none";

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            !pinModalElement.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (
            /^[0-9]$/.test(
                event.key
            )
        ) {

            enterPin(
                event.key
            );

        }


        else if (
            event.key ===
            "Backspace"
        ) {

            deletePin();

        }

    }
);


window.addEventListener(
    "scroll",
    function () {

        const navbar =
            document.querySelector(
                ".navbar"
            );


        if (!navbar) {
            return;
        }


        if (
            window.scrollY > 30
        ) {

            navbar.style.background =
                "rgba(18, 11, 24, 0.96)";

        }


        else {

            navbar.style.background =
                "rgba(18, 11, 24, 0.88)";

        }

    }
);
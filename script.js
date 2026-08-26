// ===============================
// STUDENT DATA
// ===============================

let students = [];


// ===============================
// GET ELEMENTS
// ===============================

const studentForm = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const prnInput = document.getElementById("prn");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const branchInput = document.getElementById("branch");
const yearInput = document.getElementById("year");

const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

const editIndex = document.getElementById("editIndex");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const formTitle = document.getElementById("formTitle");

const studentCount = document.getElementById("studentCount");
const noStudents = document.getElementById("noStudents");

const successMessage = document.getElementById("successMessage");


// ===============================
// ERROR ELEMENTS
// ===============================

const nameError = document.getElementById("nameError");
const prnError = document.getElementById("prnError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const branchError = document.getElementById("branchError");
const yearError = document.getElementById("yearError");


// ===============================
// FORM SUBMIT
// ===============================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Create student object
    const student = {
        name: nameInput.value.trim(),
        prn: prnInput.value.trim(),
        email: emailInput.value.trim(),
        mobile: mobileInput.value.trim(),
        branch: branchInput.value,
        year: yearInput.value
    };


    // ===============================
    // UPDATE STUDENT
    // ===============================

    if (editIndex.value !== "") {

        const index = Number(editIndex.value);

        students[index] = student;

        successMessage.textContent =
            "Student details updated successfully.";

    }

    // ===============================
    // ADD STUDENT
    // ===============================

    else {

        students.push(student);

        successMessage.textContent =
            "Student registered successfully.";
    }


    displayStudents();

    resetForm();

});


// ===============================
// VALIDATION
// ===============================

function validateForm() {

    let valid = true;


    // NAME
    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter student name.";

        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(nameInput.value.trim())) {

        nameError.textContent =
            "Name should contain only letters.";

        valid = false;
    }


    // PRN
    if (prnInput.value.trim() === "") {

        prnError.textContent =
            "Please enter PRN.";

        valid = false;

    }
    else if (!/^[A-Za-z0-9]{6,20}$/.test(prnInput.value.trim())) {

        prnError.textContent =
            "Please enter a valid PRN.";

        valid = false;
    }


    // EMAIL
    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter email.";

        valid = false;

    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            emailInput.value.trim()
        )
    ) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;
    }


    // MOBILE
    if (mobileInput.value.trim() === "") {

        mobileError.textContent =
            "Please enter mobile number.";

        valid = false;

    }
    else if (
        !/^[6-9][0-9]{9}$/.test(
            mobileInput.value.trim()
        )
    ) {

        mobileError.textContent =
            "Please enter a valid mobile number.";

        valid = false;
    }


    // BRANCH
    if (branchInput.value === "") {

        branchError.textContent =
            "Please select a branch.";

        valid = false;
    }


    // YEAR
    if (yearInput.value === "") {

        yearError.textContent =
            "Please select year.";

        valid = false;
    }


    return valid;
}


// ===============================
// DISPLAY STUDENTS
// ===============================

function displayStudents() {

    tableBody.innerHTML = "";

    const searchText =
        searchInput.value.toLowerCase().trim();


    // Filter students
    const filteredStudents = students
        .map((student, index) => ({
            student: student,
            originalIndex: index
        }))
        .filter(item => {

            const student = item.student;

            return (
                student.name.toLowerCase().includes(searchText) ||
                student.prn.toLowerCase().includes(searchText) ||
                student.email.toLowerCase().includes(searchText) ||
                student.mobile.includes(searchText) ||
                student.branch.toLowerCase().includes(searchText) ||
                student.year.toLowerCase().includes(searchText)
            );
        });


    // Count
    studentCount.textContent =
        "Total Students: " + filteredStudents.length;


    // No students
    if (filteredStudents.length === 0) {

        noStudents.style.display = "block";

        return;

    }

    noStudents.style.display = "none";


    // Create rows
    filteredStudents.forEach((item, index) => {

        const student = item.student;

        const originalIndex = item.originalIndex;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.prn}</td>

            <td>${student.email}</td>

            <td>${student.mobile}</td>

            <td>${student.branch}</td>

            <td>${student.year}</td>

            <td>

                <button
                    type="button"
                    class="edit-btn"
                    onclick="editStudent(${originalIndex})">
                    Edit
                </button>

                <button
                    type="button"
                    class="delete-btn"
                    onclick="deleteStudent(${originalIndex})">
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(index) {

    const student = students[index];

    if (!student) {
        return;
    }


    nameInput.value = student.name;

    prnInput.value = student.prn;

    emailInput.value = student.email;

    mobileInput.value = student.mobile;

    branchInput.value = student.branch;

    yearInput.value = student.year;


    editIndex.value = index;


    formTitle.textContent =
        "Edit Student Details";

    submitBtn.textContent =
        "Update Student";

    cancelBtn.style.display =
        "inline-block";


    clearErrors();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(index) {

    if (!students[index]) {
        return;
    }


    const studentName =
        students[index].name;


    const confirmation = confirm(
        "Are you sure you want to delete " +
        studentName +
        "?"
    );


    if (confirmation) {

        students.splice(index, 1);

        displayStudents();

        successMessage.textContent =
            "Student deleted successfully.";
    }
}


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener(
    "input",
    function () {

        displayStudents();

    }
);


// ===============================
// CANCEL EDIT
// ===============================

cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

    }
);


// ===============================
// RESET FORM
// ===============================

function resetForm() {

    studentForm.reset();

    editIndex.value = "";

    formTitle.textContent =
        "Student Registration";

    submitBtn.textContent =
        "Register Student";

    cancelBtn.style.display =
        "none";

    clearErrors();
}


// ===============================
// CLEAR ERRORS
// ===============================

function clearErrors() {

    nameError.textContent = "";

    prnError.textContent = "";

    emailError.textContent = "";

    mobileError.textContent = "";

    branchError.textContent = "";

    yearError.textContent = "";

    successMessage.textContent = "";
}


// ===============================
// INITIAL DISPLAY
// ===============================

displayStudents();
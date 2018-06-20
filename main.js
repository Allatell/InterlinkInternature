var studentsForm;

function init() {
    // let students = loadStudents();
    // loadStudents()
    //     .then(renderStudents(students));

    renderStudents([{
        "id": 1,
        "name": "Maria",
        "grade": "100"
    }]);

    studentsForm = document.getElementById('students-form');
    studentsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createStudent()
            .then(loadStudents)
            .load(renderStudents);
    });
}

window.onload = init;

const studentUrl = 'http://localhost:3000/students';

function loadStudents() {
    return fetch(studentUrl)
        .then(r => r.json());
}

function createStudent() {
    let name = studentForm.name.value;
    let grade = studentForm.grade.value;
    return fetch(studentUrl, {
        method: 'POST',
        body: JSON.stringify({name}, {grade}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function renderStudents(students) {
    let template = document.getElementById('students-template');
    let studentElement = template.content.querySelector('.student');
    let studentsList = document.getElementById('students');
    studentsList.innerHTML = '';

    for (let student of students){
        let studentClone = studentElement.cloneNode(true);
        updateStudentElement(studentClone, student);
        studentsList.appendChild(studentClone);
    }
}

function updateStudentElement(element, student) {
    element.querySelector('h3').innerText = student.name;
    element.querySelector('h4').innerText = student.grade;
}
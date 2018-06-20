var studentsForm;

function init() {
    loadStudents()
        .then(renderStudents);

    studentsForm = document.getElementById('students-form');
    studentsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createStudent()
            .then(loadStudents)
            .then(renderStudents);
    });
}

window.onload = init;

const studentUrl = 'http://localhost:3000/students';

function loadStudents() {
    return fetch(studentUrl)
        .then(r => r.json());
}

function createStudent() {
    let name = studentsForm.name.value;
    let grade = studentsForm.grade.value;
    return fetch(studentUrl, {
        method: 'POST',
        body: JSON.stringify({name, grade}),
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
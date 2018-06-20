var studentsForm;

function init(){
    loadStudents()
        .then(renderStudents(students));

    studentForm = document.getElementById('student-form');
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createStudent()
            .then(loadStudents)
            .load(renderStudents);
    });
}

window.onload = init;

const studentUrl = 'http://localhost:3000/students';

function loadStudents(){
    return fetch(studentUrl)
        .then(r => r.json());
}

function createStudent() {
    let title = studentForm.title.value;
    let grade = studentForm.grade.title;
    return fetch(studentUrl, {
        method:'POST',
        body: JSON.stringify({title}, {grade}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function renderStudents(students) {
    let template = document.getElementById('student-template');
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
    element.querySelector('h1').innerText = student.title;
}
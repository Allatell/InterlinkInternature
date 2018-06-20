function init(){
    loadStudents()
        .then(renderStudents());

}

window.onload = init;

const postUrl = '';

function loadStudents(){
    return fetch(postsUrl)
        .then(r => r.json());
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
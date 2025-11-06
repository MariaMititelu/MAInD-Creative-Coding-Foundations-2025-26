/*const myGreetings = function greet(personA, personB) {
    console.log ("Hi, " + personA + " and " + personB + "!");
}

myGreetings("Elia", "Giovanni");
*/


function fullName(name, surname) {
    return "Hi " + name + " " + surname + "!";
}

function printInfo(name, surname, course, school="SUPSI") {
    console.log(school + " " + fullName(name, surname) + ", course: " + course);
}

function printGrades(name, surname, grade, school="SUPSI") {
    console.log(school + " " + fullName(name, surname) + ", grade: " + grade);
}

function printCreditsLaser(name, surname, grade, school) {
    console.log(school + " " + fullName(name, surname) + ", credit: " + grade);
}

function printCredits3D(name, surname, grade, school) {
    console.log(school + " " + fullName(name, surname) + ", credit: " + grade);
}

printInfo("Maria", "Mititelu", "Coding Foundations");
printGrades("Maria", "Mititelu", 5, "NABA");
printCreditsLaser("Maria", "Mititelu", 10, "UNAGE");
printCredits3D("Maria", "Mititelu", 2, "MIT");


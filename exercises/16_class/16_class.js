class Person {
    constructor(opts) {
        opts = opts || {};
        this.firstname = opts.first_name;
        this.lastname = opts.last_name;
        this.age = opts.age;
        this.sex = opts.sex;
    }

    print() {
        console.log(`[${this.constructor.name}] ${this.firstname} ${this.lastname}, ${this.sex}, ${this.age}`);
    }
}

class Student extends Person {
    constructor(opts) {
        opts = opts || {};
        super(opts);
        this.grades = opts.grades;
    }

    avg() {
        let sum = 0;
        for (let grade of this.grades) {
            sum += grade;
        }
        return sum / this.grades.length;
    }

    static randomGrades() {
        return Array(Math.round(Math.random() * 6))
            .fill(Math.round(Math.random() * 3) + 2);
    }
}

class Employee extends Person {
    constructor(opts) {
        opts = opts || {};
        super(opts);
        this.salary = opts.salary;
    }

    showWithSalary() {
        return `${this.firstname} ${this.lastname}, salary: ${this.salary}`;
    }

    static randomSalary() {
        return Math.round(Math.random() * 10000);
    }
}

axios.get("https://random-data-api.com/api/users/random_user?size=30")
    .then((response) => {
        const responseData = response.data;
        const data = responseData.map((user, i) => {
            const age = new Date().getFullYear() - Number(user.date_of_birth.split('-')[0]);
            const sex = user.first_name[user.first_name.length - 1] === 'a' ? 'woman' : 'man';
            switch (i % 3) {
                case 0:
                    return new Person({
                        ...user,
                        sex,
                        age,
                    });
                case 1:
                    return new Student({
                        ...user,
                        sex,
                        age,
                        grades: Student.randomGrades(),
                    });
                case 2:
                    return new Employee({
                        ...user,
                        sex,
                        age,
                        salary: Employee.randomSalary(),
                    });
            }
        });
        showMen(data);
        showStudents(data);
        showEmployees(data);
    });

function showMen(data) {
    const men = data.filter((p) => p.sex === 'man');
    console.log(`=== MEN (${men.length}) ===`);
    men.forEach((p) => p.print());
}

function showStudents(data) {
    let students = 0;
    const avg = data.reduce((prev, curr) => {
        if (curr instanceof Student) {
            students++;
            return [...prev, ...curr.grades];
        }
        return prev;
    }, []);
    let sum = 0;
    for (let elem of avg) {
        sum += elem;
    }
    console.log(`=== AVG GRADE OF STUDENTS (${students}) ===`);
    console.log(sum / avg.length);
}

function showEmployees(data) {
    const employees = data.filter((p) => p instanceof Employee);
    console.log(`=== EMPLOYEES (${employees.length}) ===`);
    employees.forEach((emp) => console.log(emp.showWithSalary()));
}

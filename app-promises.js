/** @format */

const users = [{
        id: 1,
        name: "Gaurav",
        schoolId: 101,
    },
    {
        id: 2,
        name: "Rohan",
        schoolId: 109,
    },
];
const grades = [{
        id: 1,
        schoolId: 101,
        grade: 86,
    },
    {
        id: 2,
        schoolId: 109,
        grade: 87,
    },
    {
        id: 3,
        schoolId: 101,
        grade: 80,
    },
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with the id of ${id}`);
        }
    });
};

const getGrade = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId)
        .then((tempUser) => {
            user = tempUser;
            return getGrade(user.schoolId);
        })
        .then((grades) => {
            let average = 0;

            if (grades.length > 0) {
                average =
                    grades.map((grade) => grade.grade).reduce((a, b) => a + b) /
                    grades.length;
            }
            console.log("TCL:: getStatus -> average", average);
            return `${user.name} has a ${average} in a class `;
        });
};

const getStatusAlt = async(userId) => {
    const user = await getUser(userId);
    const grades = await getGrade(user.schoolId);
    let average = 0;

    if (grades.length > 0) {
        average =
            grades.map((grade) => grade.grade).reduce((a, b) => a + b) /
            grades.length;
    }
    return `${user.name} has a ${average} in a class`;
};

getStatusAlt(1)
    .then((status) => {
        console.log("TCL:: status", status);
    })
    .catch((err) => {
        console.log("TCL:: err", err);
    });

// getStatus(1)
//     .then((status) => {
//         console.log("TCL:: user", status);
//     })
//     .catch((err) => {
//         console.log("TCL:: err", err);
//     });
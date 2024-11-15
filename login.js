// function loginUser(event) {
 
//     event.preventDefault();

 
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;


//     if (email === "" || password === "") {
//         alert("Please fill in all fields.");
//         return;
//     }


//     const storedUser = localStorage.getItem(email);
//     if (storedUser) {
//         const user = JSON.parse(storedUser);


//         if (user.password === password) {
//             alert("Login successful!");
            

//             window.location.href = "./Home.html";
//         } else {
//             alert("Incorrect password. Please try again.");
//         }
//     } else {
//         alert("No account found with this email. Please register.");
//     }
// }




//////////////////  login main logic ////////////////////////////////////////////////////////////////////////////////////////////
// async function loginUser(event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const response = await fetch('http://127.0.0.1:4000/login/signIn', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//     });

//     const result = await response.json();
//     alert(result.message);

//     if (response.ok) {
//         window.location.href = './Home.html';
//     }
// }



async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:4000/login/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
        localStorage.setItem('authToken', result.token);
        window.location.href = './Home.html';
    }
}



window.onload = () => {


    if(localStorage.getItem('access') !== null) {
        console.log('hi')
        window.location.href = "/index.html"
    }
    
    signup = document.getElementById("signup");
    signup.addEventListener("click", async (event) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("name").value;
        const gender = document.getElementById("gender").value;
        const age = document.getElementById("age").value;

        const response = await fetch("http://127.0.0.1:8000/users/signup/", {
            headers: {
                "content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'password': password,
                'username': username,
                'gender': gender,
                'age': age,
            })
        })
        if (response.status === 201) {
            window.location.href = "/login.html"
        }
    })
}

if(localStorage.getItem('access') !== null) {
    window.location.href = "/"
}
window.onload = () => {
    login = document.getElementById("login");
    login.addEventListener("click", async (event) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("http://127.0.0.1:8000/users/login/", {
            headers: {
                "content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'password': password,
            })
        })
        if (response.status === 200) {
            const response_json = await response.json()
            console.log(response_json);
            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);

            const base64Url = response_json.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''))

            localStorage.setItem('payload', jsonPayload)

            window.location.href = "/"
        }
    })
}




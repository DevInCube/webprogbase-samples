console.log("Loading Browser JS app.js");

const loginFormEl = document.getElementById('login-form');
loginFormEl.addEventListener('submit', function (e) {
    console.log("On form submit");
    e.preventDefault();  // cancel page reload
    const formData = new FormData(e.target);
    const bodyData = new URLSearchParams(formData);
    fetch("/auth/login", { method: 'POST', body: bodyData })
        .then(x => x.json())
        .then(authResult => {
            console.log(authResult);
            const jwt = authResult.token;
            localStorage.setItem("jwt", jwt);  // save JWT
        })
        .catch(console.error);
});

const logoutForm = document.getElementById("logout-form");
logoutForm.addEventListener('submit', function (e) { 
    console.log("On logoutForm submit");
    e.preventDefault();  // cancel page reload
    localStorage.removeItem('jwt'); 
});

const privateDataForm = document.getElementById("private-data-form");
privateDataForm.addEventListener('submit', function (e) {
    console.log("On privateDataForm submit");
    e.preventDefault();  // cancel page reload
    const reportEl = document.getElementById('report');
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        reportEl.innerText = "JWT is missing. Log in first";
        return;
    }
    const reqOptions = {
        headers: { Authorization: `Bearer ${jwt}`, },
    };
    fetch("/api/items-private", reqOptions)
        .then(x => x.text())
        .then(privateData => { reportEl.innerText = privateData; })
        .catch(console.error);
});
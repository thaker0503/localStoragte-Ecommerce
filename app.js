const signUp = (e) => {
    let userRegisterForm = document.getElementById('userRegisterForm'),
        name = userRegisterForm['name'].value,
        email = userRegisterForm['email'].value,
        pwd = userRegisterForm['password'].value,
        isLoggedIn = false;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email.toLowerCase()); 

    if (validateEmail(email) && validatePassword(pwd) && validateName(name)) {
        if (!exist) {
            formData.push({ name, email, pwd, isLoggedIn });
            localStorage.setItem('formData', JSON.stringify(formData));
            alert("Registered Successfully\nPlease Login");
            location.href = "./login.html";
        }
        else {
            alert("Ooopppssss... Duplicate found!!!\nYou have already signed up\nPlease Sign In");
            location.href = "./login.html";

        }
    }
    else {
        if (!validateName(name)) {
            const element = document.querySelector("#invalidName");
            element.style.setProperty("--invalid-error-message", "block");
            
        }
        else if (!validateEmail(email)) {
            const element = document.querySelector("#invalidEmail");
            element.style.setProperty("--invalid-error-message", "block");
        }
        else if (!validatePassword(pwd)) {
            const element = document.querySelector("#invalidPassword");
            element.style.setProperty("--invalid-error-message", "block");
        }
        
    }
    e.preventDefault();
}

function signIn(e) {
    let userLoginForm = document.getElementById("userLoginForm"),
        email = userLoginForm['email'].value, 
        pwd = userLoginForm['password'].value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email.toLowerCase());
    if (!exist) {
        const alert = document.getElementById("alert");
        alert.style.display = "block";
        console.log("Parent If")
    }
    else {
        console.log("parent else")
        let index = formData.findIndex(data => data.email.toLowerCase() == email.toLowerCase());
        if (formData[index].email == email && formData[index].pwd == pwd) {
            formData[index].isLoggedIn = true;
            localStorage.setItem('formData', JSON.stringify(formData));
            location.replace("./dashboard.html?" + index);
        }
        else {
            const alert = document.getElementById("alert");
            alert.style.display = "block";
        }

    }
    e.preventDefault();
}


function logout(e) {
    let formData = JSON.parse(localStorage.getItem('formData'));
    let index = formData.findIndex(data => data.isLoggedIn == true);
    formData[index].isLoggedIn = false;
    localStorage.setItem('formData', JSON.stringify(formData));
    location.href = "./login.html";
    e.preventDefault();
}

function displayUserDetails(index) {
    let formData = JSON.parse(localStorage.getItem('formData'));
    let userDetails = formData[index];
    // check if user is logged in
    if (userDetails.isLoggedIn) {
        document.getElementById('userName').innerText = "Welcome " + userDetails.name;
        document.getElementById('userEmail').innerHTML = "Email: " + userDetails.email;
    }
    else {
        alert("Please Sign In");
        location.href = "./login.html";
    }
}

    


function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
}

function validateName(name) {
    var re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name);
}















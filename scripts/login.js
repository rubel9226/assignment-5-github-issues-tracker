document.getElementById('btn-submit').addEventListener('click', ()=> {
    // get username
    const usernameValue = document.getElementById('input-username');
    const username = usernameValue.value;
    console.log(username);

    // get password
    const passwordValue = document.getElementById('input-password');
    const password = passwordValue.value;
    console.log(password);

    if(username === 'admin' && password === 'admin123'){
        window.location.replace('/dashboad.html');
        return;
    }else{
        alert('Invalid Password and username');
        return;
    }
});
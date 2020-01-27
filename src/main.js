import '@babel/polyfill';
import * as Articles from './articles';
import api from './api';

const userBlock = document.querySelector('.user');
const articlesList = document.querySelector('.articles');
const loginForm = document.querySelector('.login-form');
const getArticlesBtn = document.querySelector('.get-articles');
const caption = document.querySelector('.caption');

if (localStorage.getItem('token')) {
    loginForm.hidden = true;

    let data = localStorage.getItem('token').split('.')[1];
    data = atob(data);
    data = JSON.parse(data);

    userBlock.innerHTML = `
        <h1>Hi, ${data.username} !</h1>
        <p>Your email is: <a href="mailto:${data.email}">${data.email}</a></p>
    `;
    const logoutbtn = document.createElement('button');
    logoutbtn.innerText = 'exit';
    logoutbtn.addEventListener('click', function(){
        localStorage.removeItem('token');
        document.location.reload(true);
    });
    userBlock.appendChild(logoutbtn);
    userBlock.hidden = false;
}
else {
    userBlock.hidden = true;
    loginForm.hidden = false;
}

loginForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const username = this.elements.username.value;
    const password = this.elements.password.value;
    try {
        const login = await api.post('login', {
            username,
            password
        });
        console.log(login);

        if (login.status === 200 && login.headers.authorization) {
            const token = login.headers.authorization.split(' ')[1];
            localStorage.setItem('token', token);
            document.location.reload(true);
        }
    }
    catch (error) {
        loginForm.innerHTML += `
        <div style="color: red">Uncorrect login/password</div>
        `;
    }
});

getArticlesBtn.addEventListener('click', async function(){
    try {
        this.disabled = true;
        caption.style.color = 'orange';
        caption.innerText = "Retriving articles from server...";

        const articles = await Articles.all();
        console.log(articles);

        this.disabled = false;
        caption.style.color = 'black';
        caption.innerText = `${articles.data.count} Articles found`;

        articles.data.articles.forEach(element => {
            articlesList.innerHTML += `
            <div>
                <h3>${element.title}</h3>
                <p>Author: ${element.author.username} email: <a href="mailto:${element.author.email}">${element.author.email}</a></p>
                <p>${element.content}</p>
            </div>
            `;
        });
    }
    catch (error) {
        caption.innerText = error.data.message;
        caption.style.color = 'red';
        this.disabled = false;
    }
});
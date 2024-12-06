const form = document.querySelector('form');
const url = 'https://api.github.com/users/';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('input').value;
    
    const response = await fetch(url + username, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    console.log(data);


    if (data.message === 'Not Found') {
        const errorMessage = document.querySelector('.error');
        errorMessage.textContent = 'No results';
    } else {
        const errorMessage = document.querySelector('.error');
        errorMessage.textContent = '';
        displayData(data);
    }
})

const fetchUsers = async (url) => {
    const response = await fetch(url + 'octocat', {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
        }
    }
    );

    const data = await response.json();
    console.log(data);
    displayData(data);
}

const DateFormat = (date) => {
    const newDate = new Date(date);
    dateFormat = newDate.getDate() + ' ' + newDate.toLocaleString('default', { month: 'long' }) + ' ' + newDate.getFullYear();
    return dateFormat;
}

const displayData = (data) => {
    const avatar = document.getElementById('avatar');
    const name = document.querySelector('#name');
    const username = document.querySelector('#username');
    const usernameLink = document.querySelector('#usernameLink');
    const joinDate = document.querySelector('#joinDate');
    const bio = document.querySelector('#bio');
    const repo = document.querySelector('#repo');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');
    const twitter = document.querySelector('#twitter');
    const website = document.querySelector('#website');
    const company = document.querySelector('#company');
    const location = document.querySelector('#location');

    avatar.src = data.avatar_url;
    name.textContent = data.name;
    username.textContent = data.login;
    usernameLink.href = data.html_url;
    joinDate.textContent = DateFormat(data.created_at);
    bio.textContent = data.bio ? data.bio : 'This profile has no bio';
    repo.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;


    if (data.twitter_username == null) {
        twitter.textContent = 'Not Available';
        twitter.style.color = 'gray';
    } else {
        twitter.textContent = data.twitter_username;
        twitter.cursor = 'pointer';
        twitter.href = 'https://twitter.com/' + data.twitter_username;
    }
    if(data.blog == null || data.blog == '') {
        website.textContent = 'Not Available';
        website.style.color = 'gray';
    } else {
        website.textContent = data.blog;
        website.href = data.blog;
    }

    if (data.company == null) {
        company.textContent = 'Not Available';
        company.style.color = 'gray';
    } else {
        company.textContent = data.company;
        company.href = 'https://github.com/' + data.company;
    }

    if (data.location == null) {
        location.textContent = 'Not Available';
        location.style.color = 'gray';
    } else {
        location.textContent = data.location;
    }
}

fetchUsers(url);
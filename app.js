
var baseUrl = "https://reqres.in/api/";

function loadUsers(page = 1){
    fetch(baseUrl+"users?page="+page)
    .then( (reponse) => reponse.json() )
    .then( (responseJSON) => {
        let users = responseJSON.data;
        let total_pages = responseJSON.total_pages;
        displayUsers(users);
        displayPagination(total_pages);
    });
}

function displayUsers(users){
    let usersArray = [];
    users.forEach((user) => {
        usersArray.push(`<tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>
                <img src="${user.avatar}" class="userAvatar" />
            </td>
            <td>
                <a class="btn btn-sm btn-primary" onclick="loadUserDetails(${user.id})" >detalji</a>
            </td>
        </tr>`);
    });
    document.getElementById("usersTableBody").innerHTML = usersArray.join('');
}

function displayPagination(total_pages){
    if(total_pages > 1){
        document.getElementById("pagination").classList.remove('d-none');
        document.getElementById("lastPageButton").setAttribute('onclick', `loadUsers(${total_pages})`);
    }
}

async function loadUserDetails(userId){

    let response = await fetch(baseUrl+"users/"+userId);
    let responseJSON = await response.json();

    showSingleUserDetails(responseJSON.data);

}

function showSingleUserDetails(user){
    document.getElementById("singleUserDetails").classList.remove('d-none');
    document.getElementById("userImage").src = user.avatar;

    document.getElementById("userDetails").innerHTML = `
        <p>Ime: ${user.first_name}</p>
        <p>Prezime: ${user.last_name}</p>
        <p>Email: ${user.email}</p>
    `;
}

loadUsers();
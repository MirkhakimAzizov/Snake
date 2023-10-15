let elList = document.querySelector(".list");
let editName = document.querySelector(".edit-name");
let editBtn = document.querySelector(".edit-btn");

editBtn.addEventListener("click", (e)=>{
    let newUser = {
        name: editName.value,
        userId: randId,
    }
    console.log(editName.value);
    async function Data(){
        let res = await fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake');
        let data = await res.json();
        data.forEach(item=>{
            if(item.userId == randId){
                newUser.count = item.count;
                // Post
                fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newUser)
                });
                // Delete
                fetch(`https://6529995155b137ddc83f0695.mockapi.io/cyber/snake/${item.id}`, {
                    method: 'DELETE',
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                });
            }
        })
    }
    Data();
    editName.value = "";
})

async function Data(){
    let res = await fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake');
    let data = await res.json();
    return data;
}
Data();

async function renderUi(){
    let arr = await Data();
    arr.forEach(item=>{
        let elLi = document.createElement('li');
        elLi.setAttribute('class', 'card my-3 py-2 px-4 bg-secondary position-relative');
        
        if(randId == item.userId){
            elLi.innerHTML = `
            <li class="list-group-item text-light">Username: ${item.name}</li>
            <li class="list-group-item">Count: ${item.count}</li>
            <button type="button" data-id="${item.userId}" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit username</button>
            <span class="position-absolute" style="top: 5px; right: 5px;">ID: ${item.userId}</span>
        `
        } else {
            elLi.innerHTML = `
            <li class="list-group-item text-light">Username: ${item.name}</li>
            <li class="list-group-item">Count: ${item.count}</li>
            <span class="position-absolute" style="top: 5px; right: 5px;">ID: ${item.userId}</span>
        `
        }
        elList.append(elLi);
    });
        let elLi = document.createElement('li');
        elLi.setAttribute('class', 'card my-3 py-2 px-4 bg-secondary');
        elLi.innerHTML = `Number of all players: ${arr.length}`
        elList.append(elLi);
}
renderUi();
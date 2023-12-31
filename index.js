const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

let buttons = document.querySelector(".buttons");
let elId = document.querySelector("#user-id");

let randId;
let snakeCount = 0;
if (!localStorage.getItem('id')) {
    randId = Math.trunc(Math.random() * (999999 - 100000)) + 100000;
    localStorage.setItem("id", randId);
} else {
    randId = localStorage.getItem('id');
}
elId.textContent = `${randId}`;



var grid = 14;
var count = 0;
var score = 0;
var max = 0;


const snake = {
    x: 140,
    y: 140,

    dx: grid,
    dy: 0,

    maxCells: 1,

    cells: [],
}

const food = {
    x: 280,
    y: 280,
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop)
    if (++count < 6) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.clientWidth - grid;
    } else if (snake.x >= canvas.clientWidth) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.clientHeight - grid;
    } else if (snake.y >= canvas.clientHeight) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }


    context.fillStyle = '#fff';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);


    context.fillStyle = '#ff9500';

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === food.x && cell.y === food.y) {

            snake.maxCells++;

            score += 1;
            snakeCount = score;
            let user = {
                userId: randId,
                count: snakeCount,
            }

            async function Data() {
                let res = await fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake');
                let data = await res.json();

                let userArr = [];
                data.forEach(item => {
                    userArr.push(item.userId);
                })
                if (!userArr.includes(randId)) {
                    // Post
                    fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(user)
                    });
                }


                data.forEach(item => {
                    if (item.userId == randId) {
                        user.name = item.name;
                        if (item.count < snakeCount) {
                            // Delete
                            fetch(`https://6529995155b137ddc83f0695.mockapi.io/cyber/snake/${item.id}`, {
                                method: 'DELETE',
                            }).then(res => {
                                if (res.ok) {
                                    return res.json();
                                }
                            });
                            // Post
                            fetch('https://6529995155b137ddc83f0695.mockapi.io/cyber/snake', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(user)
                            });
                        }
                    }
                });
            }
            Data();





            document.getElementById('score').innerHTML = score;


            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                if (score > max) {
                    max = score;
                }
                snake.x = 140,
                    snake.y = 140,
                    snake.cells = [];
                snake.maxCells = 1;
                snake.dx = grid;
                snake.dy = 0;
                score = 0;
                food.x = getRandomInt(0, 25) * grid;
                food.y = getRandomInt(0, 25) * grid;
                document.getElementById('score').innerHTML = max;
            }
        }
    })
}

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37 && snake.dx === 0) { // chap
        snake.dx = -grid;
        snake.dy = 0
    } else if (e.keyCode === 38 && snake.dy === 0) { // tepa
        snake.dy = -grid;
        snake.dx = 0
    } else if (e.keyCode === 39 && snake.dx === 0) { // o'ng
        snake.dx = grid;
        snake.dy = 0
    } else if (e.keyCode === 40 && snake.dy === 0) { // past
        snake.dy = grid;
        snake.dx = 0
    } else {
        return;
    }
})

buttons.addEventListener("click", (e) => {
    if (e.target.dataset.id == 1 && snake.dx === 0) { // chap
        snake.dx = -grid;
        snake.dy = 0
    } else if (e.target.dataset.id == 2 && snake.dy === 0) { // tepa
        snake.dy = -grid;
        snake.dx = 0
    } else if (e.target.dataset.id == 4 && snake.dx === 0) { // o'ng
        snake.dx = grid;
        snake.dy = 0
    } else if (e.target.dataset.id == 3 && snake.dy === 0) { // past
        snake.dy = grid;
        snake.dx = 0
    } else {
        return;
    }
})

requestAnimationFrame(loop)






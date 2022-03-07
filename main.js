let boxes = document.querySelectorAll('.grid-items');
selectPlayer = document.querySelectorAll('.player-selected')
items = [...boxes];
clicked = false;
active = true;

game = {
    player: this.player,
    counterPlayer: this.counterPlayer,
    playerColor: function() {
        return game.player.includes('o') ? 'rgb(225, 254, 255)' : 'rgb(255, 231, 235)'
    },
    counterPlayerColor: function() {
        return game.counterPlayer.includes('x') ? 'rgb(255, 231, 235)' : 'rgb(225, 254, 255)'
    }
}



function playerChosed() {
    document.querySelector('.select-player').style.display = 'none'
    game.player = this.lastElementChild.src
    selectPlayer.forEach(element => {
        if (element.lastElementChild.src !== game.player) {
            game.counterPlayer = element.lastElementChild.src
        }
    })
}


function selectBox() {
    if (!clicked) {
        if (this.lastElementChild.src === '//:0') {
        this.lastElementChild.src = game.player
        this.style.backgroundColor = game.playerColor()
        this.classList.remove('animation')
        gameOver()
            if (active) {
                randomSelection()
            }
        clicked = true
        }
    }
}

const randomSelection = () => {
    return setTimeout(function () {
        let i = randomNumber()
        items[i].lastElementChild.src = game.counterPlayer
        items[i].style.backgroundColor = game.counterPlayerColor()
        items[i].classList.remove('animation')
        clicked = false
        gameOver()
    }, 1500)
}

const randomNumber = () => {
    let arr = []
    items.forEach(element => {
        if (element.lastElementChild.src !== '//:0') {
            return arr.push(items.indexOf(element))
        }
    })

    let num = Math.floor((Math.random() * (8 - 0 + 1)) + 0);
        if (arr.includes(num)) {
            return randomNumber(arr)
        }

    return num
}

const winner1 = () => {
    if (items[0].lastElementChild.src == items[1].lastElementChild.src &
        items[1].lastElementChild.src == items[2].lastElementChild.src ||
        items[0].lastElementChild.src == items[3].lastElementChild.src &
        items[3].lastElementChild.src == items[6].lastElementChild.src ||
        items[0].lastElementChild.src == items[4].lastElementChild.src &
        items[4].lastElementChild.src == items[8].lastElementChild.src) {
            if (items[0].lastElementChild.src == game.player) {
                return win()
            } else if (items[0].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner2 = () => {
    if (items[1].lastElementChild.src == items[4].lastElementChild.src &
        items[4].lastElementChild.src == items[7].lastElementChild.src) {
            if (items[1].lastElementChild.src == game.player) {
                return win()
            } else if (items[1].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner3 = () => {
    if (items[2].lastElementChild.src == items[5].lastElementChild.src &
        items[5].lastElementChild.src == items[8].lastElementChild.src) {
            if (items[2].lastElementChild.src == game.player) {
                return win()
            } else if (items[2].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner4 = () => {
    if (items[3].lastElementChild.src == items[4].lastElementChild.src &
        items[4].lastElementChild.src == items[5].lastElementChild.src) {
            if (items[3].lastElementChild.src == game.player) {
                return win()
            } else if (items[3].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner5 = () => {
    if (items[6].lastElementChild.src == items[7].lastElementChild.src &
        items[7].lastElementChild.src == items[8].lastElementChild.src) {
            if (items[6].lastElementChild.src == game.player) {
                return win()
            } else if (items[6].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner6 = () => {
    if (items[2].lastElementChild.src == items[4].lastElementChild.src &
        items[4].lastElementChild.src == items[6].lastElementChild.src) {
            if (items[2].lastElementChild.src == game.player) {
                return win()
            } else if (items[2].lastElementChild.src == game.counterPlayer) {
                return loose()
            }
    }
}

const winner7 = () => {
    let drawCheck = items.filter(element => element.lastElementChild.src == '//:0')
    if (drawCheck.length == 0 && winner1() == undefined && winner2() == undefined &&
        winner3() == undefined && winner4() == undefined && winner5() == undefined &&
        winner6() == undefined) {
        draw()
    }
}


const gameOver = () => {
    winner1()
    winner2()
    winner3()
    winner4()
    winner5()
    winner6()
    winner7()
}

const resetBtn = () => {
    items.forEach(element => {
        element.lastElementChild.src = '//:0'
        element.style.backgroundColor = 'white'
        element.classList.add('animation')
        clicked = false
        active = true
    })
}


const win = () => {
    clicked = true
    active = false
    Swal.fire({
        template: '#template',
        icon: 'success',
        title: 'Congrats!',
        text: 'You won'
    }).then(result => {
        if (result.isConfirmed) {
            resetBtn()
        }
    })
}

const loose = () => {
    clicked = true
    active = false
    Swal.fire({
        template: '#template',
        icon: 'error',
        title: 'Oh no!',
        text: 'You lost'
    }).then(result => {
        if (result.isConfirmed) {
            resetBtn()
        }
    })
}

const draw = () => {
    clicked = true
    active = false
    Swal.fire({
        template: '#template',
        icon: 'warning',
        title: 'Oops!',
        text: "It's a draw"
    }).then(result => {
        if (result.isConfirmed) {
            resetBtn()
        }
    })
}

selectPlayer.forEach(element => element.addEventListener('click', playerChosed))
items.forEach(element => element.addEventListener('click', selectBox))
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // Resetting the Enemy's position when it is off the screen
    if (this.x > 505) {
        this.reset();
    }

    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // Check for collision between Player and Enemy
    if (this.checkCollison()) {
        player.updateLevel(1);
        player.reset();
    }
};

// Will update the enemys' position
Enemy.prototype.reset = function () {
    this.x = xPositions[getRandomInt(0, xPositions.length - 1)];
    this.y = yPositions[getRandomInt(0, yPositions.length - 1)];
};

// Checks wether the enemy collides with the player or not
Enemy.prototype.checkCollison = function () {
    var isRightOfPlayer = this.x + 50 > player.x;
    var isLeftOfPlayer = this.x < player.x + 50;
    var isUnderPlayer = this.y < player.y + 50;
    var isAbovePlayer = this.y + 50 > player.y;
    return isRightOfPlayer && isLeftOfPlayer && isUnderPlayer && isAbovePlayer;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
    this.level = 1;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Will update the players position
Player.prototype.update = function () {
    // Player has reached the water
    if (this.y <= 0) {
        this.updateLevel(++this.level);
        this.reset();
    }
};

// Handles the players' input of arrow keys
// Will move the player to the left or right,
// to the top or the bottom
Player.prototype.handleInput = function (keyCode) {
    var movementY = 46;
    var movementX = 44;

    if ('up' === keyCode && this.y >= 0) {
        this.y -= movementY;
    } else if ('down' === keyCode && this.y < 404) {
        this.y += movementY;
    } else if ('left' === keyCode && this.x > 0) {
        this.x -= movementX;
    } else if ('right' === keyCode && this.x <= 404) {
        this.x += movementX;
    }
};

// Will reset the position of the player
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 404;
};

// Will update the level
Player.prototype.updateLevel = function (level) {
    this.level = level;
    document.getElementById('levelNumber').innerHTML = this.level;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var xPositions = [-100, -200, -300, -400];
var yPositions = [60, 146, 226];

var allEnemies = getAllEnemies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Creates 6 Enemies on a random postion with random speed
function getAllEnemies() {
    var allEnemies = [];
    for (var i = 0; i < 6; i++) {
        var x = xPositions[getRandomInt(0, xPositions.length - 1)];
        var y = yPositions[getRandomInt(0, yPositions.length - 1)];
        var speed = getRandomInt(60, 220);

        allEnemies.push(new Enemy(x, y, speed));
    }
    return allEnemies;
}

// Creates a random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
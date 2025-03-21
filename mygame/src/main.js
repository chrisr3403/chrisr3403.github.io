import kaboom from "kaboom"

const k = kaboom()

k.onClick(() => k.addKaboom(k.mousePos()))

kaboom({
    fullscreen: true,
    canvas: document.getElementById("game"),
    background: [10, 100, 200], // RGB values for black background
});

// Load assets
loadSprite("title-bg", "path/to/your/title-background.png");
loadSound("start", "path/to/your/start-sound.mp3");

loadSprite("Ultra Metal", "",)
loadSprite("Sonic", "/sprites/sonic.png",


    {
    sliceX: 9,
    // Define animations
    anims: {
        "idle": {
            // Starts from frame 0, ends at frame 3
            from:0,
            to: 4,
            // Frame per second
            speed: 1,
            loop: true,
        },
        "run": {
            from:5,
            to: 8,
            speed: 30,
            loop: true,
        },
        // This animation only has 1 frame
        "jump": {
            from:9,
            to: 13,
            speed: 30,
            loop: true,
        },

    },

});
loadSound("Sky Sanctuary act 1", "/music/Zone1.mp3.mp3",)

const music = play("Sky Sanctuary act 1", {
    loop: true,
    paused: true,
});

onKeyPress("p", () => music.paused = !music.paused);
onKeyPressRepeat("v", () => music.volume += 0.1);
onKeyPressRepeat("y", () => music.volume -= 0.1);
onKeyPressRepeat("o", () => music.speed -= 0.1);
onKeyPressRepeat("r", () => music.speed += 0.1);
onKeyPress("m", () => music.seek(4.24));

setGravity(50);
// Add our player character
const player = add([
    sprite("Sonic"),
    pos(width() - 0.1, height() - 0.1),
    anchor("bot"),
    area(),
    body(),
    width(100)
]);

player.onUpdate(() => {
    camPos(player.pos)
});

const SPEED = 2020;

// .play is provided by sprite() component, it starts playing the specified animation (the animation information of "idle" is defined above in loadSprite)
player.play("idle");

// Switch to "idle" or "run" animation when player hits ground
player.onGround(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
        player.play("idle");
    }
    else {
        player.play("run");
    }
});

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
        play("jump");
    }
});

player.onAnimEnd((anim) => {
    if (anim === "idle") {
        // You can also register an event that runs when certain anim ends
    }
});

onKeyDown("left", () => {
    player.move(-SPEED, 2);
    player.flipX = true;
    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run");
    }
});

onKeyDown("right", () => {
    player.move(SPEED, 2);
    player.flipX = false;
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run");
    }
});
["left", "right"].forEach((key) => {
    onKeyRelease(key, () => {
        // Only reset to "idle" if player is not holding any of these keys
        if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle");
        }
    });
});

const getInfo = () =>
    `
Anim: ${player.curAnim()}
Frame: ${player.frame}
`.trim();

////////////////////////////////Bossess?////////////////////////
const ENEMY_SPEED =360;
const BULLET_SPEED = 800;

const enemy = add([
    sprite("Ultra Metal"),
    pos(width() - 1080, height() -1080),
    anchor("center"),
    // This enemy cycle between 3 states, and start from "idle" state
    state("move", ["idle", "attack", "move"]),
]);

// Run the callback once every time we enter "idle" state.
// Here we stay "idle" for 0.5 second, then enter "attack" state.
enemy.onStateEnter("idle", async () => {
    await wait(0.5);
    play("Blast");
    enemy.enterState("attack");
});

enemy.onStateEnter("attack", async () => {
    if (player.exists()) {
        const dir = player.pos.sub(enemy.pos).unit();


        add([
            pos(enemy.pos),
            move(dir, BULLET_SPEED),
            rect(12, 12),
            area(),
            offscreen({ destroy: true }),
            anchor("center"),
            color(BLUE),
            "bullet",
        ]);
    }

    await wait(1);
    enemy.enterState("move");
});


enemy.onStateEnter("move", async () => {
    await wait(2);
    enemy.enterState("idle");
});


enemy.onStateUpdate("move", () => {
    if (!player.exists()) return;
    const dir = player.pos.sub(enemy.pos).unit();
    enemy.move(dir.scale(ENEMY_SPEED));
});

player.onCollide("bullet", (bullet) => {
    destroy(bullet);
    destroy(player);
    play("Ded");
    addKaboom(bullet.pos);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Levels //////

loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg")
loadSprite("ring", "/sprites/Ring.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("SkySanctuaryLow", "/sprites/SkySanctuaryLow.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("GIANTRING!", "/sprites/giantring.gif");
volume(7);
loadSound("ringpickup", "/music/RingPickup.mp3");
loadSound("blast", "/music/laser_hBUSmJ9.mp3");
loadSound("Ded", "/music/sonicded.mp3");
loadSound("jump", "/music/sonicjump.mp3");
loadSprite("Cloud", "/sprites/SkySanctuaryClouds.png");
loadSprite("Cloudv2", "/sprites/Cloud.png");
loadSprite("ring", "/sprites/Ring.png");

setGravity(2400);

const level = addLevel([
      "$",
"=============================================================================================================================================================================================================================================================================================================================================================================================================",


], {
    tileWidth: 80,
    tileHeight: 1,
    pos: vec2(100, 800),
    tiles:
    {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],

        '-': () => [
            sprite("Cloudv2"),
            area(),
        ],
        "$": () => [
            sprite("ring"),
            area(),
            anchor("bot"),
            "ring",
        ],
        "@": () => [
            sprite("GIANTRING!"),
            area({ scale: 0.5 }),
            anchor("bot"),
            pos(0, -12),
            "",
        ],
        "^": () => [
            sprite("jumpad"),
            area(),
            anchor("bot"),
            solid(),
            "jump",
        ],

        "&": () => [
            sprite("Cloud"),
            area(),
        ],

    },

});

// Create the cloud entity
const cloud = add([
    sprite("Cloudv2"),
    pos(100, 100), // Starting position
    "cloud",
]);
// Define the cloud speed
const CLOUD_SPEED = 10;

// Update the cloud position
cloud.action(() => {
    cloud.move(CLOUD_SPEED,); // Move to the right

    // If the cloud moves off the right side of the screen, reset its position
    if (cloud.pos.x > width(100, 100)) {
        cloud.pos.x = -cloud.width;
    }
});


player.onCollide("GIANTRING!", () => {
    play("GIANTRING");
    if (levelId + 1 < LEVELS.length) {
        go("game", {
            levelId: levelId + 1,
            ring: ring,
        });
    }
    else {
        go("win");
    }
});
scene("lose", (score) => {
    add([
        sprite("Sonic"),
        pos(width() / 2, height() / 2 - 108),
        scale(3),
        anchor("center"),
    ]);

    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 108),
        scale(3),
        anchor("center"),
    ]);

player.onCollide("jump", () => {
    player.pos = level.tile2Pos(0, 0);
    play("blast");
});

// game over scene
    // go back to game with space is pressed
    onKeyPress("o", () => go("start"));
    onClick(() => go("start"));
});

player.onCollide("ring", (ring) => {
    destroy(ring);
    play("ringpickup")
});

const score = add([
    text("0", { size: 24 }),
    pos(24, 24),
    { value: 0 },
]);

player.onCollide("coin", (c) => {
    destroy(c);
    play("coin");
    score.value += 1;
    score.text = score.value.toString();
    genCoin(c.idx);
});












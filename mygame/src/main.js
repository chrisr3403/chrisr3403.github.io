import kaboom from "kaboom"

const k = kaboom()

k.onClick(() => k.addKaboom(k.mousePos()))

kaboom({
    fullscreen: true,
    background: [70, 70, 100], // RGB values for black background
});

// Load assets
loadSprite("title-bg", "path/to/your/title-background.png");
loadSound("start", "path/to/your/start-sound.mp3");
loadSprite("SuperSonic", "/sprites/SuperSonic.png",)
loadSprite("Ultra Metal", "Ultra Metal Sonic.png",)
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
            from:6,
            to: 6,
            speed: 30,
            loop: true,
        },
        "super": {
            from:8,
            to: 8,
            speed: 30,
            loop: false,
        },

    },

});

volume(0.1)
loadSound("Sky Sanctuary act 1", "/music/SkySanctuary.mp3",)

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
    pos(100,1000),
    anchor("bot"),
    area(),
    body(),
    health(8),
    width(100)
]);

loadSprite("SuperSonic", "/sprites/SuperSonic.png",
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

function swapPlayerSprite() {
    scale(100)
    player.use(sprite("SuperSonic"));
    player.scale = vec2(2)

}

loadSound("SuperSonicM", "/music/14 - The Doomsday Zone - Tatsuyuki Maeda, Sachio Ogawa, Masanori Hikichi.mp3",)


onKeyPress("s", () => {
    swapPlayerSprite();
    scale(100)
    play("SuperSonicM")
});

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


volume(2);
loadSound("ringpickup", "/music/RingPickup.mp3");
loadSound("blast", "/music/laser_hBUSmJ9.mp3");
loadSound("Ded", "/music/sonicded.mp3");
loadSound("jump", "/music/sonicjump.mp3");
loadSound("Win", "/music/sonicjump.mp3");
loadSprite("Cloud", "/sprites/SkySanctuaryClouds.png");
loadSprite("Cloudv2", "/sprites/Cloud NEW.png");
loadSprite("ring", "/sprites/Ring.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("SkyClouds", "/sprites/SkyClouds NEW.png");
loadSprite("Platform", "/sprites/platform.png");
loadSprite("Pillar1", "/sprites/pillar.png");
loadSprite("RampRight", "/sprites/ramp.png");
loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg")
loadSprite("ring", "/sprites/Ring.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("SkySanctuaryLow", "/sprites/SkySanctuaryLow.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("GIANTRING!", "/sprites/giantring.gif");
loadSound("Win", "/music/sonicWin.mp3");


setGravity(1400);

addLevel([
     "***********************************************************************************************************************************************************************************************************************************************************************************************************************************************",
     "=                                                                                                                                                          ",
     "=                                                                                                                                                          ",
     "=                                                                         $                                                                                ",
     "=                                                                   _     _                                                                                ",
     "=                                                                                                                                                          ",
     "=                                                             ^                                                                                            ",
     "=                                                                                                                                                          ",
     "=                                                                                                                                                          ",
     "=                                                                                                                                                          ",
     "=                                                                                                                                                          ",
     "=                     $|$       $|$                        $   _   $                                       $|$       $|$                                  ============================================================================================================================================================== !",
     "=                     _         _    ^                    _       _                                        _         _                                 ^  ",
     "=                                                                                                                                                          ",
    "===                                                                                                                                                         ",
    "====          =                                                                                                                                              ",
    "=====         =    $   |  $   $    $    | $    $  $   =     |  $  ;   $   $     $  ;    $    $  $            ;   $     $   $    $  ;  $    $  $              ",
    "============================================================================================================================================================",
    "-      -      -      -      -      -       -      -       -        -      -      -      -       -      -      -       -      -       -        -      -      -      -      -       -      -       -      -       -      -      -       -        -      -      -      -       -      -      -        -",
    "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -",
    "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -",
    "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",
    "=                                                                                                                                                   ",


], {
    tileWidth: 80,
    tileHeight: 50,
    pos: vec2(10, 800),
    tiles:
    {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            "game"

        ],

        "/": () => [
            sprite("RampRight"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],

        "_": () => [
            sprite("Platform"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],

        "|": () => [
            sprite("Pillar1"),
            area(),
            anchor("bot"),
        ],

        '-': () => [
        sprite("Cloudv2",),
        anchor("top"),
        area(),
        z(1000),
       "danger",

        ],

        '*': () => [
            sprite("SkyClouds"),
            area(100),

        ],
        "^": () =>[
            sprite("jumpad"),
            area(),
            scale(0.85),
            "jumpad",
        ],

        "$": () => [
            sprite("ring"),
            area(),
            scale(0.3),
            anchor("bot"),
            "ring",
        ],

        "&": () => [
            sprite("Cloud"),
            area(),

        ],

        ";": () => [
            sprite("spike"),
            area(),
            anchor("bot"),
            scale(0.5),
            "danger",
        ],
        "!": () => [
            sprite("GIANTRING!"),
            area(),
            anchor("bot"),
            scale(0.5),
            "win",
        ],


    },

});

player.onCollide("danger", () => {
    go("lose");
    play("Ded")
});

scene("lose", () => {
    add([
        text("You Lose"),
    ]);
    onKeyPress("e", () => go("game"));
    onGamepadButtonPress("south", () => go("game"));
});


player.onCollide("win", () => {
    go("win");
    play("Win")
});

scene("win", () => {
    add([
        text("Sonic passed Act 1"),
    ]);
    onKeyPress("e", () => go("game"));
    onGamepadButtonPress("o", () => go("game"));
});

player.onCollide("jumpad", () => {
    player.jump(1000); // Adjust the jump force as needed
    play("blast");
});

player.onCollide("ring", (c) => {
    destroy(c);
    play("ringpickup");
});

player.onBoost("jump", () => {
    jump(player)
})

let score = 0;

const scoreLabel = add([
    text(score),
    pos(12, 12),
    layer('ui'),
    {
        value: score,
    },
]);

function increaseScore(points) {
    scoreLabel.value += points;
    scoreLabel.text = scoreLabel.value;
}

// Example: Increase score by 10 points when a player collects an item
action('collectible', (c) => {
    destroy(c);
    increaseScore(10);
});

// Add a collectible item for demonstration
add([
    sprite('coin'),
    pos(100, 100),
    'collectible',
]);



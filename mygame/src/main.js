import kaboom from "kaboom"

const k = kaboom()

k.onClick(() => k.addKaboom(k.mousePos()))

kaboom({
    fullscreen: true,
    background: [70, 70, 100], // RGB values for black background
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
loadSprite("spike", "/sprites/spike.png");
loadSprite("SkyClouds", "/sprites/SkyClouds NEW.png");
loadSprite("Platform", "/sprites/platform.png");
loadSprite("Pillar1", "/sprites/pillar.png");
loadSprite("Pillar2", "/sprites/building.png");
loadSprite("RampRight", "/sprites/ramp.png");
loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg")
loadSprite("ring", "/sprites/Ring.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("SkySanctuaryLow", "/sprites/SkySanctuaryLow.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("GIANTRING!", "/sprites/giantring.gif");
loadSound("Win", "/music/sonicWin.mp3");
loadSprite("ring", "/sprites/Ring2.png")
loadSprite("DrRobotnik", "/sprites/Eggman.png")
loadSprite("WinFlag", "/sprites/SonicWin.png")

addLevel([
     "************************************************************************************************************************************************",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "                                                                                                                    ",
"~",  "~                                                                                                                   ",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "~                                                                                                                   ",
     "                                                                                             $                      ",
     "                                                                                             _                      ",
     "~                                                                                                                   ",
     "                                                                               $    ;   $   ;   $   ;   $    ;   $  ",
     "       $            $              $                                        ========================================",
     "       _            _              _                               ^                                           ",
     "~                                                                                                                   ",
     "                                                                                                                    ",
     "                                                                                                                      $      ;   $         !",
     "                  $$$$     ;    $$    ;    $$   ;     $4      $$$   $                                                =======================",
     "~=======================================================================",
              "#"

], {
    tileWidth: 80,
    tileHeight: 50,
    pos: vec2(10, 800),
    tiles:
    {

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

        "~": () => [
            sprite("Pillar2"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],

        '-': () => [
        sprite("Cloudv2",),
        anchor("top"),
        area(),
        z(1000),
       "danger",

        ],

        "#": () =>[
            sprite("Cloudv2",),
            area(),
            scale(100),
        ],
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            "game"

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
            scale(0.4),
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

// Load assets
loadSprite("title-bg", "path/to/your/title-background.png");
loadSound("start", "path/to/your/start-sound.mp3");
loadSprite("SuperSonic", "/sprites/SuperSonic.png",)
loadSprite("Ultra Metal", "Ultra Metal Sonic.png",)
loadSprite("Sonic", "/sprites/sonic.png",

    {
    sliceX: 11,
    // Define animations
    anims: {
        "idle": {
            // Starts from frame 0, ends at frame 3
            from:0,
            to: 3,
            // Frame per second
            speed: 1,
            loop: true,
        },
        "run": {
            from:5,
            to: 4,
            speed: 30,
            loop: true,
        },
        // This animation only has 1 frame
        "jump": {
            from:8,
            to: 8,
            speed: 30,
            loop: true,
        },
        "super": {
            from:9,
            to: 9,
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

setGravity(2000);
// Add our player character
const player = add([
    sprite("Sonic"),
    pos(100,1000),
    anchor("bot"),
    area(),
    body(),
    scale(1.5)
]);

onKeyPress("space", () => {
    player.flipX = true;
    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (player.isGrounded() && player.curAnim() !== "jump") {
        player.play("jump");
    }
});

player.onUpdate(() => {
    camPos(player.pos)
});

const SPEED = 500;

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
        player.jump(1000);
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
                speed: 10,
                loop: true,
            },
            "run": {
                from:5,
                to: 8,
                speed: 60,
                loop: true,
            },
            // This animation only has 1 frame
            "jump": {
                from:5,
                to: 8,
                speed: 60,
                loop: true,
            },

        },

    });


    function swapPlayerSprite() {
        scale(1000)
        player.use(sprite("SuperSonic"));
        player.scale = vec2(2)
        player.speed = vec2(1000000)

    }

    loadSound("SuperSonicM", "/music/Super Sonic (Sonic 3 & Knuckles).wav",)

    onKeyPress("s", () => {
        swapPlayerSprite();
        scale(1000)
        setGravity(500);
        player.speed += 5000;
        play("SuperSonicM")

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
        player.move(SPEED, 3);
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

player.onCollide("win", () => {
    go("win");
    play("Win")
});

scene("win", () => {
    add([
		sprite("WinFlag"),
		pos(width() / 2, height() / 2 - 64),
		scale(2),
		anchor("center"),
	])

    add([
		text("Sonic Passed Act"),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	])

});


player.onCollide("jumpad", () => {
    player.jump(1300); // Adjust the jump force as needed
    play("blast");
});

player.onCollide("ring", (ring) => {
    destroy(ring);
    play("ringpickup")
    // You can also add other actions here, like increasing the score
});

function spawnTree() {

    // add tree obj
    add([
        rect(48, rand(32, 96)),
        area(),
        outline(4),
        pos(width(), height() - FLOOR_HEIGHT),
        anchor("botleft"),
        color(238, 143, 203),
        move(LEFT, SPEED),
        offscreen({ destroy: true }),
        "tree",
    ])

    // wait a random amount of time to spawn next tree
    wait(rand(0.5, 1.5), spawnTree)

}

player.onCollide("danger", () => {
    go("lose");
    play("Ded")
});

scene("lose", (score) => {

	add([
		sprite("DrRobotnik"),
		pos(width() / 2, height() / 2 - 64),
		scale(2),
		anchor("center"),
	])

    add([
		text("Game Over"),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	])

});


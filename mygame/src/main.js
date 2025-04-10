import kaboom from "kaboom"

const k = kaboom()

k.onClick(() => k.addKaboom(k.mousePos()))

kaboom({
    fullscreen: true,
    background: [50, 15, 244], // RGB values for black background
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Levels //////

volume(3);
loadSound("Ded", "/music/sonicded.mp3");
loadSound("jump", "/music/sonicjump.mp3");
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
loadSound("Win", "/music/29-Act Cleared.mp3");
loadSprite("ring", "/sprites/Ring2.png")
loadSprite("DrRobotnik", "/sprites/Eggman.png")
loadSprite("WinFlag", "/sprites/SonicWin.png")
loadSprite("Cloud", "/sprites/SkySanctuaryClouds.png");
loadSprite("Cloudv2", "/sprites/Cloud NEW.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSound("blast", "/music/laser_hBUSmJ9.mp3");


addLevel([

     "                                                                                                                    ",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "************************************************************************************************************************************************",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "                                                                                                                    ",
"~",  "~                                                                                                                  ",
     "                                                                                                                    ",
     "                                                                                                                    ",
     "~                                                                                                                   ",
     "                                                                                             _                      ",
     "~                                            #                 #                                                                  ",
     "          #     #                #                    #                           $   # ;   $   ;   $  # ;   $    ;   $  ",
     "      $|$          $|$           $|$                                        ========================================",
     "       _            _             _                               ^         #                                                               ",
     "~                                                                                                                                           ",
     "                                                                                                                                            ",
     "**********************************************************************************************************************$      ;   $         !",
     "                  $$$$     ;    $$    ;    $$   ;     $4      $$$                                                    =======================",
     "~=======================================================================--------",
"************************************************************************************************************************************************",
"************************************************************************************************************************************************",
"                                                                                                                                                ",
"                                                                                                                                                ",

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

        "~": () => [
            sprite("Pillar2"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
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

        "#": () =>[
            sprite("Cloudv2",),
            area(),
            scale(2),
        ],

        "^": () =>[
            sprite("jumpad"),
            area(),
            scale(0.85),
            "jumpad",
        ],

    },

});

/////////////////////////////////////////////Sonicdef_p///////////////////////////////////////////////

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
    player.move(-SPEED, 4);
    player.flipX = true;
    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (player.isGrounded() && player.curAnim() !== "run") {
        player.play("run");
    }
});

onKeyDown("right", () => {
    player.move(SPEED, 4);
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

    function spawnParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            add([
                pos(x, y),
                rect(4, 4),
                color(rand(0, 255), rand(0, 255), rand(0, 255)),
                lifespan(100, { fade: 0.1 }),
                move(rand(0, 360), rand(50, 100)),
            ]);
        }
    }

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
        spawnParticles(player.pos.x, player.pos.y);
        loop(0.5, spawnParticles);
        play("SuperSonicM")

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
    player.jump(1800); // Adjust the jump force as needed
    play("blast");
});

loadSound("ringpickup", "/music/RingPickup.mp3");


player.onCollide("ring", (ring) => {
    play("ringpickup")
    destroy(ring);
    // You can also add other actions here, like increasing the score
});

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


let score = 0

const scoreLabel = add([
    text(score),
    pos(10, 800),
])

// increment score every frame
onUpdate(() => {
    score++
    scoreLabel.text = score
})





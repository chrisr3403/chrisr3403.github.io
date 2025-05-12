
// import kaboom.js
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// initialize kaboom context
kaboom();

k.onClick(() => k.addKaboom(k.mousePos()))

kaboom({
    fullscreen: true,
    background: [50, 10, 244], // RGB values for black background
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Levels //////
loadSprite("Menu", "/music/SonicMainMenu.png");
loadSound("MenuTheme", "/music/Sonic 3 A.I.R. - Sonic 3 Theme(M4A_128K).mp3");

scene("start", () => {
    play("MenuTheme")

    add([
        text("Eat All"),
        pos(center().sub(0, 100)),
        scale(2),
        anchor("center"),
    ])

    add([
        sprite("Menu"),
        pos(center()),
        scale(2),
        anchor("center"),
    ])

    onKeyPress(() => go("game"))

})

volume(3);
loadSound("Ded", "/music/sonicded.mp3");
loadSound("jump", "/music/sonicjump.mp3");
loadSprite("spike", "/sprites/Spikes3.png");
loadSprite("SkyClouds", "/sprites/SkyClouds NEW.png");
loadSprite("Platform", "/sprites/platform.png");
loadSprite("Pillar1", "/sprites/pillar.png");
loadSprite("Pillar2", "/sprites/building.png");
loadSprite("RampRight", "/sprites/ramp.png");
loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg")
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("SkySanctuaryLow", "/sprites/SkySanctuaryLow.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("GIANTRING!", "/sprites/giantring.gif");
loadSound("Win", "/music/29-Act Cleared.mp3");
loadSound("GiantRing", "/music/giantring.mp3");
loadSprite("DrRobotnik", "/sprites/Eggman.png")
loadSprite("WinFlag", "/sprites/SonicWin.png")
loadSprite("Cloud", "/sprites/SkySanctuaryClouds.png");
loadSprite("Cloudv2", "/sprites/Cloud NEW.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("Bounce", "/sprites/BouncePad.png");
loadSound("blast", "/music/laser_hBUSmJ9.mp3");
loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg");
loadSprite("button", "sprites/button.png");
loadSprite("ring", "/sprites/Ring2.png")
loadSound("Spring", "/music/spring-sonic-3.mp3");
loadSound("SpikeDed", "/music/SpikeSound.mp3");
loadSprite("DeathEggfloor1", "/sprites/DeathEggFloor.png")

setGravity(1700)

// custom component controlling enemy patrol movement
function patrol(speed = 60, dir = 1) {
    return {
        id: "patrol",
        require: [ "pos", "area" ],
        add() {
            this.on("collide", (obj, col) => {
                if (col.isLeft() || col.isRight()) {
                    dir = -dir
                }
            })
        },
        update() {
            this.move(speed * dir, 0)
        },
    }
}

// custom component that makes stuff grow big
function big() {
    let timer = 0
    let isBig = false
    let destScale = 1
    return {
        // component id / name
        id: "big",
        // it requires the scale component
        require: [ "scale" ],
        // this runs every frame
        update() {
            if (isBig) {
                timer -= dt()
                if (timer <= 0) {
                    this.smallify()
                }
            }
            this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
        },
        // custom methods
        isBig() {
            return isBig
        },
        smallify() {
            destScale = 1
            timer = 0
            isBig = false
        },
        biggify(time) {
            destScale = 2
            timer = time
            isBig = true
        },
    }
}

// define some constants
const JUMP_FORCE = 2320
const MOVE_SPEED = 480
const FALL_DEATH = 2400

const LEVELS = [
    [

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
        "~                                                                                             _                      ",
        "                                                                                                                   ",
        "~                                                                                                                                 ",
        "                                                                             $    ;   $      $    ;   $    ;   $  ",
        "      $|$          $|$           $|$                                        ========================================",
        "       _            _             _                               ^                                                                         ",
        "~                                                                                                                                           ",
        "                                                                                                                                            ",
        "             ?                                                                                                        $      ;   $         @",
        "                  $$$$     ;    $$    ;    $$   ;     $4      $$$                                                    =======================",
        "~=======================================================================",

   "                                                                                                                                                ",
   "                                                                                                                                                ",

    ],
    [
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "           $$         =   $",
        "  %      ====         =   $",
        "                      =   $",
        "                      =    ",
        "       ^^      = >    =   @",
">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    ],
    [
        "     $    $    $    $     $",
        "     $    $    $    $     $",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        " ^^^^>^^^^>^^^^>^^^^>^^^^^@",
">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    ],
]

        const levelConf = {
        tileWidth: 80,
        tileHeight: 50,
        tiles: {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            "platform",
        ],
        ">": () => [
            sprite("DeathEggfloor1"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
            "platform",
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
         "?": () =>[
            sprite("Bounce"),
            area(),
            scale(0.95),
            "Bounce",
        ],
        "@": () => [
            sprite("GIANTRING!"),
            area({ scale: 0.5 }),
            anchor("bot"),
            pos(0, -12),
            offscreen({ hide: true }),
            "GIANTRING!",
        ],
    },
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

    // add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf)


loadSprite("Sonic", "/sprites/sonicOG.png",

{
    sliceX: 8.943,
    // Define animations
    anims: {
        "idle": {
            // Starts from frame 0, ends at frame 3
            from:0,
            to: 4,
            height:50,
            width: 10,
            // Frame per second
            speed: 0.5,
            loop: true,
        },
        "run": {
            from:5,
            to: 7,
            speed: 20,
            loop: true,
        },
        // This animation only has 1 frame
        "jump": {
            from:6,
            to: 7,
            speed: 10,
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

    // define player object
    const player = add([
        sprite("Sonic"),
        pos(100, 800),
        area(),
        scale(1),
        body(),
        big(),
        anchor("bot"),


    {
        speed: 400,
        isSpindashing: false,
    },
]);

// Define controls
OnkeyDown("left", () => {
    if (!sonic.isSpindashing) {
        sonic.move(-sonic.speed, 0);
    }
});

OnKeyDown("right", () => {
    if (!sonic.isSpindashing) {
        sonic.move(sonic.speed, 0);
    }
});

OnKeyPress("down", () => {
    if (sonic.isGrounded()) {
        sonic.isSpindashing = true;
        sonic.play("spindash"); // Assuming you have a spindash animation
    }
});

OnKeyRelease("down", () => {
    if (sonic.isSpindashing) {
        sonic.isSpindashing = false;
        sonic.move(sonic.speed * 2, 0); // Boost speed for spindash
    }
});

// Update loop
action(() => {
    if (sonic.isSpindashing) {
        // Add any additional spindash logic here
    }
});


    onKeyPress("space", () => {
        player.flipX = false;
        // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
        if (player.isGrounded() && player.curAnim() !== "jump") {
            player.play("jump");
        }
    });

    player.onUpdate(() => {
        camPos(player.pos.x, player.pos.y)
        camScale(1.7)
    });

  var SPEED = 500;

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

//////////////////////////////////////////////GameEditorCustom/sounds///////////////////////////////////////


loadSound("Sky Sanctuary act 1", "/music/217 Death Egg Zone ~ Act 1.mp3",)

const music = play("Sky Sanctuary act 1", {
    loop: false,
    paused: false,
});



onKeyPress("s", () => music.paused = !music.paused);
onKeyPressRepeat("v", () => music.volume += 0.1);
onKeyPressRepeat("y", () => music.volume -= 0.1);
onKeyPressRepeat("o", () => music.speed -= 0.1);
onKeyPressRepeat("r", () => music.speed += 0.1);
onKeyPress("m", () => music.seek(4.24));

loadSprite("sparkle", "/sprites/SparkleS.png",)
loadSprite("SuperSonic", "/sprites/SuperSonicV4.png",
        {
            sliceX: 9,
            // Define animations
            anims: {
                "idle": {
                    // Starts from frame 0, ends at frame 3
                    from:0,
                    to: 2,
                    height:30,
                    width: 100,
                    // Frame per second
                    speed: 10,
                    loop: true,
                },
                "run": {
                    from:6,
                    to: 7,
                    speed: 10,
                    loop: true,
                },
                // This animation only has 1 frame
                "jump": {
                    from:3,
                    to: 5,
                    speed: 10,
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

        loadSprite("Knuckles", "/sprites/Knuckles (3).png",

            {
                sliceX: 13.3,
                // Define animations
                anims: {
                    "idle": {
                        // Starts from frame 0, ends at frame 3
                        from:0,
                        to: 3,
                        height:30,
                        width: 100,
                        // Frame per second
                        speed: 2,
                        loop: true,
                    },
                    "run": {
                        from:9,
                        to: 10,
                        speed: 15,
                        loop: true,
                    },
                    // This animation only has 1 frame
                    "jump": {
                        from:4,
                        to: 8,
                        speed: 20,
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
     loadSprite("SuperKnuckles", "/sprites/SuperKnuckles.png",

            {
                sliceX: 13.3,
                // Define animations
                anims: {
                    "idle": {
                        // Starts from frame 0, ends at frame 3
                        from:0,
                        to: 3,
                        height:30,
                        width: 100,
                        // Frame per second
                        speed: 1,
                        loop: true,
                    },
                    "run": {
                        from:9,
                        to: 10,
                        speed: 15,
                        loop: true,
                    },
                    // This animation only has 1 frame
                    "jump": {
                        from:4,
                        to: 8,
                        speed: 20,
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
     loadSprite("Tails", "/sprites/Tails-Miles_Prower.png",

        {
            sliceX: 14,
            // Define animations
            anims: {
                "idle": {
                    // Starts from frame 0, ends at frame 3
                    from:0,
                    to: 3,
                    height:30,
                    width: 50,
                    // Frame per second
                    speed: 1,
                    loop: true,
                },
                "run": {
                    from:6,
                    to: 12,
                    speed: 15,
                    loop: false,
                },
                // This animation only has 1 frame
                "jump": {
                    from:4,
                    to: 5,
                    speed: 20,
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

        function createParticleEffect(playerPos) {
            const particle = add([
              sprite("sparkle"),
              pos(playerPos.x + -100, playerPos.y + -150),
              lifespan(0.9, { fade: -10 }),
              move(choose([LEFT, RIGHT, UP, DOWN]), 120),
            ]);
          }

          function SonicSprite() {
            scale(1000)
            player.use(sprite("Sonic"));
            player.scale = vec2(1)
        }

        function SuperSonicSprite() {
            scale(1000)
            player.use(sprite("SuperSonic"));
            player.scale = vec2(2)

        }

        function KnucklesSprite() {
            scale(1000)
            player.use(sprite("Knuckles"));
            player.scale = vec2(1.2)


        }
        function SuperKnucklesSprite() {
            scale(1000)
            player.use(sprite("SuperKnuckles"));
            player.scale = vec2(1.2)


        }
        function MilesSprite() {
            scale(1000)
            player.use(sprite("Tails"));
            player.scale = vec2(1.5)


        }

        loadSound("Swap", "/music/SwapChar.mp3",)
        loadSound("SuperSonicM", "/music/14 - The Doomsday Zone - Tatsuyuki Maeda, Sachio Ogawa, Masanori Hikichi.mp3",)
        loadSound("SuperTransform", "/music/SuperSonicTransForm.mp3",)

        onKeyPress("1", () => {
            SonicSprite();
            scale(1000)
            setGravity(1700);
            play("Swap")
            player.play("idle");
        });

        onKeyPress("s", () => {
            SuperSonicSprite();
            scale(100)
            setGravity(700);
            play("SuperSonicM")
            player.play("super");
        });

        onKeyPress("s", () => {
            play("SuperTransform")
            scale(-100)
            loop(0.3, () => {
            createParticleEffect(player.pos);
            });
        });

        onKeyPress("s", () => {
           SPEED = SPEED =+ 1000
        });

        onKeyPress("3", () => {
            KnucklesSprite();
            scale(1000)
            setGravity(2200);
            player.play("idle");
            play("Swap")
        });

        onKeyPress("k", () => {
            SuperKnucklesSprite();
            scale(1000)
            setGravity(2200);
            player.play("idle");
            play("SuperTransform")
            loop(0.3, () => {
            createParticleEffect(player.pos);
            });
        });

        onKeyPress("k", () => {
            SPEED = SPEED =+ 1000
         });

         onKeyPress("2", () => {
            MilesSprite();
            scale(1000)
            player.play("idle");
            play("Swap")
            scale(-100)
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

    player.onCollide("Bounce", () => {
        play("Spring")
        player.jump(1200); // Adjust the jump force as needed
    });

    loadSound("ringpickup", "/music/RingPickup.mp3");

    // action() runs every frame
    player.onUpdate(() => {
        // center camera to player
        camPos(player.pos.x, player.pos.y)
        // check fall death
        if (player.pos.y >= FALL_DEATH) {
            go("lose")
        }
    })

    player.onBeforePhysicsResolve((collision) => {
        if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
            collision.preventResolution()
        }
    })

    player.onPhysicsResolve(() => {
        // Set the viewport center to player.pos
        camPos(player.pos)
    })

    // if player onCollide with any obj with "danger" tag, lose
    player.onCollide("danger", () => {
        go("lose")
        play("SpikeDed")
    })

    player.onCollide("GIANTRING!", () => {
        play("GiantRing")
        if (levelId + 1 < LEVELS.length) {
            go("game", {
                levelId: levelId + 1,
                coins: coins,
            })
        } else {
            go("win")
        }
    })


    player.onGround((l) => {
        if (l.is("enemy")) {
            player.jump(JUMP_FORCE * 1.5)
            destroy(l)
            addKaboom(player.pos)
            play("powerup")
        }
    })

    player.onCollide("enemy", (e, col) => {
        // if it's not from the top, die
        if (!col.isBottom()) {
            go("lose")
            play("Ded")
        }
    })

    let hasApple = false

    // grow an apple if player's head bumps into an obj with "prize" tag
    player.onHeadbutt((obj) => {
        if (obj.is("prize") && !hasApple) {
            const apple = level.spawn("#", obj.tilePos.sub(0, 1))
            apple.jump()
            hasApple = true
            play("blip")
        }
    })

    // player grows big onCollide with an "apple" obj
    player.onCollide("apple", (a) => {
        destroy(a)
        // as we defined in the big() component
        player.biggify(3)
        hasApple = false
        play("powerup")
    })

    let coinPitch = 0

    let score = 0

    onUpdate(() => {
        if (coinPitch > 0) {
            coinPitch = Math.max(0, coinPitch - dt() * 100)
        }
    })

    player.onCollide("ring", (c) => {
        destroy(c)
        play("ringpickup", {
        })
        coins += 1
        text(),
        coinsLabel.text = coins
    })

    const coinsLabel = add([
        text(coins),
        pos(24, 24),
        fixed(),
    ])

    function jump() {
        // these 2 functions are provided by body() component
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE)
        }
    }
const scoreLabel = add([
        text(score),
        pos(12),
    ])

})

function start() {
    // Start with the "game" scene, with initial parameters
    go("game", {
        levelIdx: 0,
        score: 0,


    })
    add([
        text("Game Over"),
        pos(width() / 2, height() / 2 + 64),
        scale(2),
        anchor("center"),
    ])

}

scene("lose", () => {
    text("rings"),


    add([
        sprite("DrRobotnik"),
        pos(width() / 2, height() / 2 - 64),
        scale(2),
        anchor("center"),
    ])
    onKeyPress(() => go("game"))

    add([
        text("Game Over"),
        pos(width() / 2, height() / 2 + 64),
        scale(2),
        anchor("center"),
    ])

})

go("start")



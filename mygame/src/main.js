import kaboom from "kaboom"

const k = kaboom()

k.onClick(() => k.addKaboom(k.mousePos()))
loadSprite("Ultra Metal", "/sprites/Ultra Metal Sonic.png",)
        // The image contains 9 frames layed out horizontally, slice it into individual frames
loadSprite("SkySanctuary","/sprites/SkySanctuary.jpg")

let score = 0;

loadSprite("Sonic", "/sprites/sonic.png", {

    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 9,
    // Define animations
    anims: {
        "idle": {
            // Starts from frame 0, ends at frame 3
            from: 0,
            to: 4,
            // Frame per second
            speed: 2,
            loop: true,
        },
        "run": {
            from: 6,
            to: 7,
            speed: 10,
            loop: true,
        },
        // This animation only has 1 frame
        "jump": 8,
    },
});
({
    background: [141, 183, 255],
});

const SPEED = 420;
const JUMP_FORCE = 1040;

setGravity(640);
// Add our player character
const player = add([
    sprite("Sonic"),
    pos(center()),
    anchor("bot"),
    area(),
    body(),
]);

// .play is provided by sprite() component, it starts playing the specified animation (the animation information of "idle" is defined above in loadSprite)
player.play("idle");

// Add a platform
add([
    rect(width(), 24),
    area(),
    outline(1),
    pos(0, height() - 24),
    anchor("center"),
    body({ isStatic: true }),
]);

// Switch to "idle" or "run" animation when player hits ground
player.onGround(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
        player.play("idle");
    }
    else {
        player.play("run");
    }
});

player.onAnimEnd((anim) => {
    if (anim === "idle") {
        // You can also register an event that runs when certain anim ends
    }
});

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE);
        player.play("jump");
    }
});
onKeyPress("p", () => {
    game.paused = !game.paused;
    if (curTween) curTween.cancel();
    curTween = tween(
        pauseMenu.pos,
        game.paused ? center() : center().add(0, 700),
        1,
        (p) => pauseMenu.pos = p,
        easings.easeOutElastic,
    );
    if (game.paused) {
        pauseMenu.hidden = false;
        pauseMenu.paused = false;
    }
    else {
        curTween.onEnd(() => {
            pauseMenu.hidden = true;
            pauseMenu.paused = true;
        });
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

// Add some text to show the current animation
const label = add([
    text(getInfo(), { size: 12 }),
    color(0, 0, 0),
    pos(4),
]);

label.onUpdate(() => {
    label.text = getInfo();
});
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
    enemy.enterState("attack");
});

// When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
enemy.onStateEnter("attack", async () => {
    // Don't do anything if player doesn't exist anymore
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

    // Waits 1 second to make the enemy enter in "move" state
    await wait(1);
    enemy.enterState("move");
});

// When we enter "move" state, we stay there for 2 sec and then go back to "idle"
enemy.onStateEnter("move", async () => {
    await wait(2);
    enemy.enterState("idle");
});

// .onStateUpdate() is similar to .onUpdate(), it'll run every frame, but in this case
// Only when the current state is "move"
enemy.onStateUpdate("move", () => {
    // We move the enemy in the direction of the player
    if (!player.exists()) return;
    const dir = player.pos.sub(enemy.pos).unit();
    enemy.move(dir.scale(ENEMY_SPEED));
});

// Taking a bullet makes us disappear
player.onCollide("bullet", (bullet) => {
    destroy(bullet);
    destroy(player);
    play("blast");
    addKaboom(bullet.pos);
});
loadSprite("ring", "/sprites/Ring.png");
loadSprite("jumpad", "/sprites/jumpad.png");
loadSprite("SkySanctuaryLow", "/sprites/SkySanctuaryLow.png");
loadSprite("grass", "/sprites/grass.png");
loadSound("score", "/examples/sounds/score.mp3");
loadSound("blast", "/examples/sounds/score.mp3");

setGravity(2400);

const level = addLevel([
    // Design the level layout with symbols
    "@  ^ $$",
    "========================================================================================================================================="

], {
    // The size of each grid
    tileWidth: 65,
    tileHeight: 38,
    // The position of the top left block
    pos: vec2(100, 800),
    // Define what each symbol means (in components)
    tiles: {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        '-': () => [
            sprite("SkySanctuaryLow"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
        "$": () => [
            sprite("ring"),
            area(),
            anchor("bot"),
            "ring",
        ],
        "^": () => [
            sprite("jumpad"),
            area(),
            anchor("bot"),
            "danger",
        ],
    },
});
// Get the player object from tag

// Movements
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
    }
});

// Back to the original position if hit a "danger" item
player.onCollide("danger", () => {
    player.pos = level.tile2Pos(0, 0);
});

// Eat the ring!
player.onCollide("ring", (ring) => {
    destroy(ring);
    play("score");
});
player.onUpdate(() => {
    camPos(player.pos)
});
add
    sprite("SkySanctuaryLow"),
    area(),
    pos(rand(0, width()), i * height() / NUM_PLATFORMS),
    body({ isStatic: true }),
    anchor("center"),
    "platform",
    {
    speed: rand(120, 320),
    dir: choose([-1, 1]),
    },
scene("game", () => {
    // This score textObject holds a value property in a plain object
    const score = add([
        text("0", { size: 24 }),
        pos(24, 24),
        { value: 0 },
]);
player.onCollide("Ultra Metal", () => {
    go("lose", score);
    play("hit");
    addKaboom(player.pos);
});

});







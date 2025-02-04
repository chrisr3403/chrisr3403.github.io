import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	k.pos(120, 80),
	k.sprite("bean"),
])

k.onClick(() => k.addKaboom(k.mousePos()))

k.loadSprite("Sonic", "sprites/sonicrunsmallani2.gif")
k.loadSprite("SkySanctuary", "sprites/SkySanctuary.jpg")
k.loadSprite("Metal Sonic Ultra", "sprites/Ultra Metal Sonic.png")

add([
   sprite("SkySanctuary", {width: width(), height: height()})
]);


const player = add([
	sprite("Sonic"),
	pos(10, 30),
    area(),
    body(),
]);

loadSpriteAtlas("sprites/sonicrunsmallani2.gif", {
    "sonic: {
        x: 128,
        y: 68,
        width: 144,
        height: 28,
        sliceX: 9,
        anims: {
            idle: { from: 0, to: 3 },
            run: { from: 4, to: 7 },
            hit: 8,
        },
    },
})


// .onUpdate() is a method on all game objects, it registers an event that runs every frame
player.onUpdate(() => {
	// .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
	player.angle += 120 * dt()

})
onKeyDown("up", () => {
    player.jump(SPEED, 0)
})

// Add multiple game objects
for (let i = 0; i < 3; i++) {

	// generate a random point on screen
	// width() and height() gives the game dimension
	const x = rand(0, width())
	const y = rand(0, height())

    add([
		sprite("Metal Sonic Ultra"),
		pos(900, 30),

	])

}

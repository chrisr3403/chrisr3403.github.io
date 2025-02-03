let ownerName = "Christian Ramos"; // update the part BETWEEN the "quotes"
let userName = "chrisr3403"; // same here

document.querySelectorAll(".owner-name").forEach((e) => {
    e.innerHTML = ownerName;
});

document.querySelector("#github").href = "http://github.com/" + userName;
document.querySelector("#fork").href = "http://github.com/" + userName + "/" + userName + ".github.io";

// Adding game objects to screen

kaboom()

loadSprite("bean", "/sprites/bean.png")
loadSprite("ghosty", "/sprites/ghosty.png")

const player = add([
	sprite("bean"),   // sprite() component makes it render as a sprite
	pos(120, 80),     // pos() component gives it position, also enables movement
	rotate(0),        // rotate() component gives it rotation
	anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
])

// .onUpdate() is a method on all game objects, it registers an event that runs every frame
player.onUpdate(() => {
	// .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
	player.angle += 120 * dt()
})

// Add multiple game objects
for (let i = 0; i < 3; i++) {

	// generate a random point on screen
	// width() and height() gives the game dimension
	const x = rand(0, width())
	const y = rand(0, height())

	add([
		sprite("ghosty"),
		pos(x, y),
	])

}


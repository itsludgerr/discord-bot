const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

const dim = {
    height: 675,
    width: 1200,
    margin: 5
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    const background = await Canvas.loadImage('./welcome.jpg');

    const canvas = Canvas.createCanvas(1200, 675);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(background, 0, 0)

    const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
	const avatar = await Canvas.loadImage(await body.arrayBuffer());
	ctx.save()

	ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

	ctx.drawImage(avatar, av.x, av.y, av.size, av.size)
    ctx.restore()

    ctx.fillStyle = "white"
    ctx.textAlign = "center"

	ctx.font = "50px Verdana"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

	ctx.font = "60px Verdana"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 125)

	ctx.font = "40px Verdana"
    ctx.fillText("to Astronomic", dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome.png' });
    return attachment
}

module.exports = generateImage
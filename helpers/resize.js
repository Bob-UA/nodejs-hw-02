const jimp = require("jimp");

async function resize(path, id){
    const image = await jimp.read(path);
    
    await image.resize(250, 250);
    
    await image.writeAsync(path);
    

}

module.exports = resize;
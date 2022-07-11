import { ResolveOptions } from "dns";
import Jimp from "jimp";

async function flip(input: string, output: string) {
    const image = await Jimp.read
        (input);

    image.flip(true, true, function (err) {
        if (err) throw err;
    }).write(output);
};

export {
    flip
};
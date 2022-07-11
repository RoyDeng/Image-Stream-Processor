import fs from "fs";
import Path from "path";
import Axios from "axios";
import { args } from "./lib/command";
import { flip } from "./lib/image";

const inputPath = Path.resolve(__dirname, "images", "original.jpg");
const outputPath = Path.resolve(__dirname, "images", "flip.jpg");

async function downloadImage(url: string) {
    const writer = fs.createWriteStream(inputPath);
    const response = await Axios({
        url,
        method: "GET",
        responseType: "stream"
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

async function main() {
    if (args.link.length > 0) {
        try {
            await downloadImage(args.link);
            await flip(inputPath, outputPath);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error()
    }
}

main();
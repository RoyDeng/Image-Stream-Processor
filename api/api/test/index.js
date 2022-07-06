const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../server/index");
const expect = chai.expect;
const Jimp = require("jimp");
const path = require("path");

chai.use(chaiHttp);

const originalImageUrl = "https://www.ui.com/microsite/static/media/app-world-diagram.ac485e5a.jpg";

describe("Basic routes", () => {
    after(() => {
        server.close();
    });

    it("Image sould be flipped", done => {
        chai
            .request(server)
            .post("/image/process")
            .send({
                type: "flip",
                url: originalImageUrl
            })
            .end(async (err, res) => {
                expect(res).to.have.status(200);

                try {
                    const processedImage = await Jimp.read(res.body);
                    const expectedImage = await Jimp.read(path.join(__dirname, "/image/expect.png"));
                    const diff = Jimp.diff(processedImage, expectedImage, 0.3);

                    expect(diff.percent).equal(0);
                } catch (error) {
                    console.error(error);
                }

                done();
            });
    });
});
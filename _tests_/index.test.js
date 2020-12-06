const reusableFuncsFile = require('./../src/client/assets/javascript/reusableFuncsFile');

describe("get race", () => {
  it("It responds with current race stats", async () => {
    const id =1;
    const raceinfo = await reusableFuncsFile.getrace(id);
    expect(raceinfo.body).toHaveProperty("status");
    expect(raceinfo.body).toHaveProperty("positions");

  });
});

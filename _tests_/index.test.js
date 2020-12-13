const getRace = require('./getRace');

//A small unit test for getRace function
test("get race", async () => {
  const id =100;
  const raceinfo = await getRace(id);
  expect(raceinfo).toHaveProperty("status");
  expect(raceinfo).toHaveProperty("positions");

})

const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

const {
  getPsychicTrainersAndGyms,
  getTrainersAndGymsAndPokemons,
  getGymsWithPokemons
} = require("./4.student-exercises");

test("getTrainersAndGymsAndPokemons", () => {
  const trainersAndGymsAndPokemons = getTrainersAndGymsAndPokemons(
    gyms,
    trainers,
    pokemons
  );
  expect(trainersAndGymsAndPokemons.length).toBe(9);
  expect(trainersAndGymsAndPokemons.map(trainer => trainer.gym)).toEqual(
    expect.any(Object)
  );
  expect(trainersAndGymsAndPokemons.map(trainer => trainer.pokemons)).toEqual(
    expect.any(Array)
  );
});

test(`getPsychicTrainersAndGyms: expect a list of trainers with psychic pokemons.
    also include (all) their pokemons and their gym`, () => {
  const result = getPsychicTrainersAndGyms(gyms, trainers, pokemons);
  expect(result.length).toEqual(2);
  expect(result[0].name).toBe("Sabrina");
  expect(result[1].name).toBe("Misty");
  expect(result[0].gym).toEqual(expect.any(Object));
  expect(result[1].gym).toEqual(expect.any(Object));
  expect(result[0].gym.city).toBe("Saffron City");
  expect(result[1].gym.city).toBe("Cerulean City");
  expect(result[0].pokemons).toEqual(expect.any(Array));
  expect(result[1].pokemons).toEqual(expect.any(Array));
  expect(result[0].pokemons.length).toBe(4);
  expect(result[1].pokemons.length).toBe(2);
});

test("getGymsWithPokemons: expect a list of gyms where certain pokemons can be found", () => {
  const result = getGymsWithPokemons(
    gyms,
    trainers,
    pokemons,
    "Gloom",
    "Starmie"
  );
  result.forEach(pokemon => {
    expect(pokemon).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        trainers: expect.any(Array),
        gyms: expect.any(Array)
      })
    );
  });
  expect(result.length).toEqual(2);
  expect(result[0].trainers.length).toEqual(2);
  expect(result[1].trainers.length).toEqual(1);
  expect(result[0].trainers[0].name).toBe("Brock");
  expect(result[0].trainers[1].name).toBe("Erika");
  expect(result[1].trainers[0].name).toBe("Misty");
  expect(result[0].gyms.length).toEqual(2);
  expect(result[1].gyms.length).toEqual(1);
  expect(result[0].gyms[0].city).toBe("Celadon City");
  expect(result[0].gyms[1].city).toBe("Pewter City");
  expect(result[1].gyms[0].city).toBe("Cerulean City");
});

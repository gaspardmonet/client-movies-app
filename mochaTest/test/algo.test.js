const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
app = require("../../server/algo");

describe("genre And Runtime Search Algo", function () {
  it(" Should return matching movies", function () {
    var genre = ["Fantasy", "Comedy"];
    var runtime = 100;
    assert.typeOf(app.genreAndRuntimeSearchAlgo(genre, runtime), "array");
  });
});

describe("genre Search Algo", function () {
  it("Should return mataching movies", function () {
    var genre = ["Fantasy", "Comedy"];
    var runtime = 100;
    assert.typeOf(app.genreAndRuntimeSearchAlgo(genre, runtime), "array");
  });
});

describe("runtime Search Algo", function () {
  it("Should return one matched movies with duration between duration-10 and duration+10", function () {
    var runtime = 120;
    assert.typeOf(app.runtimeSearchAlgo(runtime), "array");
    assert.lengthOf(app.runtimeSearchAlgo(runtime), 1, "array has length of 1");
  });
});

describe("no Params Search Algo", function () {
  it("Should return one random movie", function () {
    assert.typeOf(app.noParamsSearchAlgo(), "array");
    assert.lengthOf(app.noParamsSearchAlgo(), 1, "array has length of 1");
  });
});

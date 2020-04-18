const request = require("supertest"),
  assert = require("assert"),
  app = require("../server");

describe("POST /addmovies", function () {
  it("should return successfully", function (done) {
    request(app)
      .post("/addmovies")
      .expect(200)
      .expect("Content-Type", "text/plain; charset = utf-8")
      .end(done);
  });
});

describe("GET /searchmovies", function () {
  it("should return a list of movies", function (done) {
    request(app)
      .get("/searchmovies")
      .expect(200)
      .expect("Content-Type", "text/plain; charset = utf-8")
      .expect(function (res) {
        assert.ok(res.body.movies.length > 0);
      })
      .end(done);
  });
});

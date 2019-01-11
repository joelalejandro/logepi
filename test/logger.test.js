// import Log from '../src/logger';

describe("Log", () => {
  beforeAll(() => {
    jest.mock("console");
  });
  // TODO: Add tests.
  afterAll(() => {
    jest.unmock("console");
  });
});

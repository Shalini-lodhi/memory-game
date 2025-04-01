const bcrypt = require("bcrypt");
const User = require("../src/models/User");
const { registerUser, loginUser } = require("../src/services/authService");
const { generateToken } = require("../src/utils/token");

jest.mock("../src/models/User");
jest.mock("bcrypt");
jest.mock("../src/utils/token");

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user", async () => {
    const mockUser = { save: jest.fn() };
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.mockImplementation(() => mockUser);

    const result = await registerUser({ username: "John", email: "john@example.com", password: "password123" });
    expect(result.message).toBe("User registered successfully");
    expect(mockUser.save).toHaveBeenCalled();
  });

  test("should not allow duplicate email registration", async () => {
    User.findOne.mockResolvedValue({});

    await expect(registerUser({ username: "John", email: "john@example.com", password: "password123" }))
      .rejects.toThrow("User with this email already exists");
  });

  test("should login user and return token", async () => {
    const mockUser = { password: "hashedPassword", _id: "user123" };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    generateToken.mockReturnValue("mockedToken");

    const result = await loginUser({ email: "john@example.com", password: "password123" });
    expect(result).toEqual({ token: "mockedToken", user: mockUser });
  });

  test("should throw error for invalid credentials", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(loginUser({ email: "john@example.com", password: "password123" }))
      .rejects.toThrow("Invalid credentials");
  });
});

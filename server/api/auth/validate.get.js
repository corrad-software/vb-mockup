export default defineEventHandler(async (event) => {
  // BYPASS: Always return authorized
  return {
    statusCode: 200,
    message: "Authorized",
  };
});

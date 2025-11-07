// Mock Prisma client for frontend vibecode prototype
// This prevents database errors while allowing the app to run

const mockPrisma = new Proxy({}, {
  get(target, prop) {
    // Return a mock for any Prisma model
    return new Proxy({}, {
      get(target, method) {
        // Return empty results for any query method
        return async () => {
          console.log(`[Mock Prisma] ${String(prop)}.${String(method)}() called`);
          return method === 'findMany' ? [] : null;
        };
      }
    });
  }
});

export default mockPrisma;

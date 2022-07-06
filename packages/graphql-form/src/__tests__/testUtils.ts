export const replSpace = (baseString: string) => (s: string) =>
    expect(baseString.replace(/\s+/g, '')).toContain(s.replace(/\s+/g, ''));

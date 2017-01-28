const expect = require('expect');
const ownersFile = require('../');

describe('owners', () => {
  let owners;

  beforeEach(() => {
    owners = ownersFile(`
      # Comment
      foo@example.com
      @owner
      @user *.rb *.py
      @org/team
      @focused *.md
      @org/legal LICENSE
    `);
  });

  it('returns all users without a path specified', () => {
    expect(owners.for('README')).toEqual(['foo@example.com', '@owner', '@org/team']);
  });

  it('returns users with matching path', () => {
    expect(owners.for('README.md')).toEqual(['foo@example.com', '@owner', '@org/team', '@focused']);
  });

  it('returns teams with matching path', () => {
    expect(owners.for('LICENSE').includes('@org/legal')).toBe(true);
  });

  it('returns users matching any path', () => {
    expect(owners.for('foo.rb').includes('@user')).toBe(true);
    expect(owners.for('foo.py').includes('@user')).toBe(true);
  });

  it('does not returns users with non-matching path', () => {
    expect(owners.for('README')).toEqual(['foo@example.com', '@owner', '@org/team']);
  });
});

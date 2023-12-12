import { expect, test } from 'vitest';

import { createUser } from './appwrite';

test('createUser', async () => {
  const user = await createUser('test');
  expect(user).not.toBeNull();
});

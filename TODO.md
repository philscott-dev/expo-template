- tm1: Mocking 'kysely-expo'
For some reason 'kysely-expo' needs to be mocked directly in the same test file. it cant be mocked in jest.setup.js or manually mocked in __mocks__. this needs to ultimately be addressed.

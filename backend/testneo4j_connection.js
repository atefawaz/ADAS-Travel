import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'Atios2004$')
);

async function testNeo4j() {
  const session = driver.session();
  try {
    const result = await session.run(
      'CREATE (t:Tour {id: $tourId, bookings: 0}) RETURN t',
      { tourId: 'test-tour' }
    );
    console.log('Neo4j test result:', result);
  } catch (err) {
    console.error('Neo4j test error:', err);
  } finally {
    await session.close();
  }
  await driver.close();
}

testNeo4j();

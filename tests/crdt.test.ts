import { Graph } from '../crdt'

describe('addVertexEdge', () => {
  test('adds a vertex/edge', () => {
    const graph = new Graph()
    const vertex = graph.addVertex(1)
    expect(graph.vertices.size).toBe(1)
    const edge = graph.addEdge(vertex, vertex)
    expect(graph.edges.size).toBe(1)
  })
})

describe('removeVertexEdge', () => {
  test('removes a vertex/edge', () => {
    const graph = new Graph()
    const vertex = graph.addVertex(1)
    const edge = graph.addEdge(vertex, vertex)
    graph.removeVertex(vertex)
    expect(graph.vertices.size).toBe(0)
    graph.removeEdge(edge)
    expect(graph.edges.size).toBe(0)
  })
})

describe('containsVertex', () => {
  test('checks if a vertex is in the graph', () => {
    const graph = new Graph()
    const vertex = graph.addVertex(1)
    expect(graph.containsVertex(vertex)).toBe(true)
  })
})

describe('getConnectedVertices', () => {
  test('queries for all vertices connected to a vertex', () => {
    const graph = new Graph()
    const vertex = graph.addVertex(1)
    const vertex2 = graph.addVertex(2)
    const vertex3 = graph.addVertex(3)
    graph.addEdge(vertex, vertex2)
    graph.addEdge(vertex, vertex3)
    expect(graph.getConnectedVertices(vertex)).toEqual([vertex2, vertex3])
  })
})

describe('getPath', () => {
  test('finds any path between two vertices', () => {
    const graph = new Graph()
    const vertex = graph.addVertex(1)
    const vertex2 = graph.addVertex(2)
    const vertex3 = graph.addVertex(3)
    graph.addEdge(vertex, vertex2)
    graph.addEdge(vertex2, vertex3)
    expect(graph.findPath(vertex, vertex3)).toEqual([vertex, vertex2, vertex3])
  })
})

describe('merge', () => {
  test('merges with concurrent changes from other graph/replica', () => {
    const graph = new Graph()
    const replica = new Graph()
    const vertex = graph.addVertex(1)
    const vertex2 = graph.addVertex(2)
    const vertex3 = graph.addVertex(3)
    const vertex4 = replica.addVertex(4)
    const vertex5 = replica.addVertex(5)
    graph.addEdge(vertex, vertex2)
    graph.addEdge(vertex2, vertex3)
    replica.addEdge(vertex4, vertex5)
    graph.merge(replica)
    expect(graph.vertices.size).toBe(5)
    expect(graph.edges.size).toBe(3)
  })

  test('merges with same ID changes from other graph/replica, taking into account most recent ones', () => {
    const graph = new Graph()
    const replica = new Graph()
    const vertex = graph.addVertex(1)
    const vertex4 = replica.addVertex(1)
    const vertex5 = replica.addVertex(2)
    const vertex2 = graph.addVertex(2)
    const vertex3 = graph.addVertex(3)
    graph.addEdge(vertex, vertex2)
    graph.addEdge(vertex2, vertex3)
    replica.addEdge(vertex4, vertex5)
    graph.merge(replica)
    expect(graph.vertices.size).toEqual([vertex4, vertex2, vertex3])
  })
})

class Vertex {
  id: number
  timestamp: number
  value?: any

  constructor(id: number, value: any) {
    this.id = id
    this.timestamp = Date.now()
    this.value = value
  }
}

export class Graph {
  vertices: Map<number, Vertex>
  edges: Map<number, number[]>

  constructor() {
    this.vertices = new Map()
    this.edges = new Map()
  }

  addVertex(id: number, value?: any) {
    const vertex = new Vertex(id, value)
    this.vertices.set(vertex.id, vertex)
    return vertex
  }

  addEdge(vertex1: Vertex, vertex2: Vertex) {
    const edge = [vertex1.id, vertex2.id]
    const edges = this.edges.get(vertex1.id) ?? []
    this.edges.set(vertex1.id, [...edges, vertex2.id])
    return edge
  }

  removeVertex(vertex: Vertex) {
    this.vertices.delete(vertex.id)
    this.edges.delete(vertex.id)
  }

  removeEdge(edge: number[]) {
    this.edges.delete(edge[0])
  }

  containsVertex(vertex: Vertex) {
    return this.vertices.has(vertex.id)
  }

  getConnectedVertices(vertex: Vertex) {
    const edges = this.edges.get(vertex.id) ?? []
    return edges.map((id) => this.vertices.get(id))
  }

  findPath(vertex1: Vertex, vertex2: Vertex) {
    const path = []
    const queue = [vertex1]
    while (queue.length > 0) {
      const vertex = queue.shift()
      path.push(vertex)
      if (vertex === vertex2) return path
      const edges = this.edges.get(vertex.id) ?? []
      queue.push(...edges.map((id) => this.vertices.get(id)))
    }
    return []
  }

  merge(graph: Graph) {
    const vertices = new Map([...this.vertices, ...graph.vertices])
    const edges = new Map([...this.edges, ...graph.edges])
    this.vertices = vertices
    this.edges = edges
  }
}

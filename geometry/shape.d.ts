import { Vector, Rotation } from "../math";
import { RawColliderSet, RawShape } from "../raw";
import { ShapeContact } from "./contact";
import { PointProjection } from "./point";
import { Ray, RayIntersection } from "./ray";
import { ShapeTOI } from "./toi";
import { ColliderHandle } from "./collider";
export declare abstract class Shape {
    abstract intoRaw(): RawShape;
    /**
     * The concrete type of this shape.
     */
    abstract get type(): ShapeType;
    /**
     * instant mode without cache
     */
    static fromRaw(rawSet: RawColliderSet, handle: ColliderHandle): Shape;
    /**
     * Computes the time of impact between two moving shapes.
     * @param shapePos1 - The initial position of this sahpe.
     * @param shapeRot1 - The rotation of this shape.
     * @param shapeVel1 - The velocity of this shape.
     * @param shape2 - The second moving shape.
     * @param shapePos2 - The initial position of the second shape.
     * @param shapeRot2 - The rotation of the second shape.
     * @param shapeVel2 - The velocity of the second shape.
     * @param maxToi - The maximum time when the inpact can happen.
     * @returns If the two moving shapes collider at some point along their trajectories, this retruns the
     *  time at which the two shape collider as well as the contact information durning the impact. Returns
     *  `null`if the two shapes never collide along their paths.
     */
    castShape(shapePos1: Vector, shapeRot1: Rotation, shapeVel1: Vector, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation, shapeVel2: Vector, maxToi: number): ShapeTOI | null;
    /**
     * Tests if this shape intersects another shape.
     *
     * @param shapePos1 - The position of this shape.
     * @param shapeRot1 - The rotation of this shape.
     * @param shape2  - The second shape to test.
     * @param shapePos2 - The position of the second shape.
     * @param shapeRot2 - The rotation of the second shape.
     * @returns `true` if the two shapes intersect, `false` if they don’t.
     */
    intersectsShape(shapePos1: Vector, shapeRot1: Rotation, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation): boolean;
    /**
     * Computes one pair of contact points between two shapes.
     *
     * @param shapePos1 - The initial position of this sahpe.
     * @param shapeRot1 - The rotation of this shape.
     * @param shape2 - The second shape.
     * @param shapePos2 - The initial position of the second shape.
     * @param shapeRot2 - The rotation of the second shape.
     * @param prediction - The prediction value, if the shapes are separated by a distance greater than this value, test will fail.
     * @returns `null` if the shapes are separated by a distance greater than prediction, otherwise contact details. The result is given in world-space.
     */
    contactShape(shapePos1: Vector, shapeRot1: Rotation, shape2: Shape, shapePos2: Vector, shapeRot2: Rotation, prediction: number): ShapeContact | null;
    containsPoint(shapePos: Vector, shapeRot: Rotation, point: Vector): boolean;
    projectPoint(shapePos: Vector, shapeRot: Rotation, point: Vector, solid: boolean): PointProjection;
    intersectsRay(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number): boolean;
    castRay(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number, solid: boolean): number;
    castRayAndGetNormal(ray: Ray, shapePos: Vector, shapeRot: Rotation, maxToi: number, solid: boolean): RayIntersection;
}
/**
 * An enumeration representing the type of a shape.
 */
export declare enum ShapeType {
    Ball = 0,
    Cuboid = 1,
    Capsule = 2,
    Segment = 3,
    Polyline = 4,
    Triangle = 5,
    TriMesh = 6,
    HeightField = 7,
    ConvexPolygon = 9,
    RoundCuboid = 10,
    RoundTriangle = 11,
    RoundConvexPolygon = 12
}
/**
 * A shape that is a sphere in 3D and a circle in 2D.
 */
export declare class Ball extends Shape {
    readonly type = ShapeType.Ball;
    /**
     * The balls radius.
     */
    radius: number;
    /**
     * Creates a new ball with the given radius.
     * @param radius - The balls radius.
     */
    constructor(radius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a box in 3D and a rectangle in 2D.
 */
export declare class Cuboid extends Shape {
    readonly type = ShapeType.Cuboid;
    /**
     * The half extent of the cuboid along each coordinate axis.
     */
    halfExtents: Vector;
    /**
     * Creates a new 2D rectangle.
     * @param hx - The half width of the rectangle.
     * @param hy - The helf height of the rectangle.
     */
    constructor(hx: number, hy: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a box in 3D and a rectangle in 2D, with round corners.
 */
export declare class RoundCuboid extends Shape {
    readonly type = ShapeType.RoundCuboid;
    /**
     * The half extent of the cuboid along each coordinate axis.
     */
    halfExtents: Vector;
    /**
     * The radius of the cuboid's round border.
     */
    borderRadius: number;
    /**
     * Creates a new 2D rectangle.
     * @param hx - The half width of the rectangle.
     * @param hy - The helf height of the rectangle.
     * @param borderRadius - The radius of the borders of this cuboid. This will
     *   effectively increase the half-extents of the cuboid by this radius.
     */
    constructor(hx: number, hy: number, borderRadius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a capsule.
 */
export declare class Capsule extends Shape {
    readonly type = ShapeType.Capsule;
    /**
     * The radius of the capsule's basis.
     */
    radius: number;
    /**
     * The capsule's half height, along the `y` axis.
     */
    halfHeight: number;
    /**
     * Creates a new capsule with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     */
    constructor(halfHeight: number, radius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a segment.
 */
export declare class Segment extends Shape {
    readonly type = ShapeType.Segment;
    /**
     * The first point of the segment.
     */
    a: Vector;
    /**
     * The second point of the segment.
     */
    b: Vector;
    /**
     * Creates a new segment shape.
     * @param a - The first point of the segment.
     * @param b - The second point of the segment.
     */
    constructor(a: Vector, b: Vector);
    intoRaw(): RawShape;
}
/**
 * A shape that is a segment.
 */
export declare class Triangle extends Shape {
    readonly type = ShapeType.Triangle;
    /**
     * The first point of the triangle.
     */
    a: Vector;
    /**
     * The second point of the triangle.
     */
    b: Vector;
    /**
     * The second point of the triangle.
     */
    c: Vector;
    /**
     * Creates a new triangle shape.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     */
    constructor(a: Vector, b: Vector, c: Vector);
    intoRaw(): RawShape;
}
/**
 * A shape that is a triangle with round borders and a non-zero thickness.
 */
export declare class RoundTriangle extends Shape {
    readonly type = ShapeType.RoundTriangle;
    /**
     * The first point of the triangle.
     */
    a: Vector;
    /**
     * The second point of the triangle.
     */
    b: Vector;
    /**
     * The second point of the triangle.
     */
    c: Vector;
    /**
     * The radius of the triangles's rounded edges and vertices.
     * In 3D, this is also equal to half the thickness of the round triangle.
     */
    borderRadius: number;
    /**
     * Creates a new triangle shape with round corners.
     *
     * @param a - The first point of the triangle.
     * @param b - The second point of the triangle.
     * @param c - The third point of the triangle.
     * @param borderRadius - The radius of the borders of this triangle. In 3D,
     *   this is also equal to half the thickness of the triangle.
     */
    constructor(a: Vector, b: Vector, c: Vector, borderRadius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a triangle mesh.
 */
export declare class Polyline extends Shape {
    readonly type = ShapeType.Polyline;
    /**
     * The vertices of the polyline.
     */
    vertices: Float32Array;
    /**
     * The indices of the segments.
     */
    indices: Uint32Array;
    /**
     * Creates a new polyline shape.
     *
     * @param vertices - The coordinates of the polyline's vertices.
     * @param indices - The indices of the polyline's segments. If this is `null` or not provided, then
     *    the vertices are assumed to form a line strip.
     */
    constructor(vertices: Float32Array, indices?: Uint32Array);
    intoRaw(): RawShape;
}
/**
 * A shape that is a triangle mesh.
 */
export declare class TriMesh extends Shape {
    readonly type = ShapeType.TriMesh;
    /**
     * The vertices of the triangle mesh.
     */
    vertices: Float32Array;
    /**
     * The indices of the triangles.
     */
    indices: Uint32Array;
    /**
     * Creates a new triangle mesh shape.
     *
     * @param vertices - The coordinates of the triangle mesh's vertices.
     * @param indices - The indices of the triangle mesh's triangles.
     */
    constructor(vertices: Float32Array, indices: Uint32Array);
    intoRaw(): RawShape;
}
/**
 * A shape that is a convex polygon.
 */
export declare class ConvexPolygon extends Shape {
    readonly type = ShapeType.ConvexPolygon;
    /**
     * The vertices of the convex polygon.
     */
    vertices: Float32Array;
    /**
     * Do we want to assume the vertices already form a convex hull?
     */
    skipConvexHullComputation: boolean;
    /**
     * Creates a new convex polygon shape.
     *
     * @param vertices - The coordinates of the convex polygon's vertices.
     * @param skipConvexHullComputation - If set to `true`, the input points will
     *   be assumed to form a convex polyline and no convex-hull computation will
     *   be done automatically.
     */
    constructor(vertices: Float32Array, skipConvexHullComputation: boolean);
    intoRaw(): RawShape;
}
/**
 * A shape that is a convex polygon.
 */
export declare class RoundConvexPolygon extends Shape {
    readonly type = ShapeType.RoundConvexPolygon;
    /**
     * The vertices of the convex polygon.
     */
    vertices: Float32Array;
    /**
     * Do we want to assume the vertices already form a convex hull?
     */
    skipConvexHullComputation: boolean;
    /**
     * The radius of the convex polygon's rounded edges and vertices.
     */
    borderRadius: number;
    /**
     * Creates a new convex polygon shape.
     *
     * @param vertices - The coordinates of the convex polygon's vertices.
     * @param borderRadius - The radius of the borders of this convex polygon.
     * @param skipConvexHullComputation - If set to `true`, the input points will
     *   be assumed to form a convex polyline and no convex-hull computation will
     *   be done automatically.
     */
    constructor(vertices: Float32Array, borderRadius: number, skipConvexHullComputation: boolean);
    intoRaw(): RawShape;
}
/**
 * A shape that is a heightfield.
 */
export declare class Heightfield extends Shape {
    readonly type = ShapeType.HeightField;
    /**
     * The heights of the heightfield, along its local `y` axis.
     */
    heights: Float32Array;
    /**
     * The heightfield's length along its local `x` axis.
     */
    scale: Vector;
    /**
     * Creates a new heightfield shape.
     *
     * @param heights - The heights of the heightfield, along its local `y` axis.
     * @param scale - The scale factor applied to the heightfield.
     */
    constructor(heights: Float32Array, scale: Vector);
    intoRaw(): RawShape;
}

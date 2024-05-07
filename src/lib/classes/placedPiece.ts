import { Piece } from '$lib/classes/piece'
import { Point } from '$lib/classes/point'

export class PlacedPiece {
	point: Point
	piece: Piece

	constructor(point: Point, piece: Piece) {
		this.point = point
		this.piece = piece
	}

	get shape() {
		return this.piece.shape
	}

	get middleOffset() {
		return this.piece.middleOffset()
	}
}

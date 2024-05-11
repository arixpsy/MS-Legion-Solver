import Piece from './piece.svelte'
import Point from './point'

export default class PlacedPiece {
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
		return this.piece.middleOffset
	}
}

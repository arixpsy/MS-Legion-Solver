import { LegionBoard, Piece, PlacedPiece, Point, Shape } from '$lib/classes'
import { BlockType, ShapeType } from '$lib/types'

export default class Solver {
	board: LegionBoard
	pieces: Array<Piece>

	constructor(board: LegionBoard, shapeCountMap: Record<ShapeType, number>) {
		this.board = board
		this.pieces = this.convertShapeCountMapToPieces(shapeCountMap)
	}

	convertShapeCountMapToPieces(shapeCountMap: Record<ShapeType, number>): Array<Piece> {
		const pieces: Array<Piece> = []
		for (const [shapeType, numOfPieces] of Object.entries(shapeCountMap)) {
			for (let num = 0; num < numOfPieces; ++num) {
				const shape = new Shape(shapeType as ShapeType)
				const piece = new Piece(shape)
				pieces.push(piece)
			}
		}
		return pieces
	}

	solve() {
		if (this.pieces.length === 0) throw Error('No pieces to place on the board')
		if (this.board.blocksToFill === 0) throw Error('No selected board area')

		// find all starting points
		const startPoints: Array<Point> = []
		for (const midPoint of this.board.middlePoints) {
			if (this.board.selectedArea[midPoint.y][midPoint.x]) {
				startPoints.push(midPoint)
			}
		}

		if (startPoints.length === 0) throw Error('Selected board area invalid.')

		// loop through pieces and see if they fit the selected area for each starting point
		const possibleFirstPlacedPieces: Array<PlacedPiece> = []
		for (const startPoint of startPoints) {
			for (const piece of this.pieces) {
				if (this.canPlacePiece(startPoint, piece)) {
					// TODO: need to figure out rotate for every piece
					possibleFirstPlacedPieces.push(new PlacedPiece(startPoint, piece))
				}
			}
		}
	}

	canPlacePiece(point: Point, piece: Piece) {
		const shapeLayout = piece.shape.layout
		const pieceMiddleOffset = piece.middleOffset

		for (let row = 0; row < shapeLayout.length; ++row) {
			for (let col = 0; col < shapeLayout[row].length; ++col) {
				if (shapeLayout[row][col] !== BlockType.Empty) {
					// convert shape point to point on the board
					const boardX = point.x - (pieceMiddleOffset.x - col)
					const boardY = point.y - (pieceMiddleOffset.y - row)

					// check if point is filled in a selected area
					if (!this.board.selectedArea[boardY][boardX]) return false

					// check if point is filled in a filled area
					if (this.board.state[boardY][boardX] !== 0) return false
				}
			}
		}

		return true
	}
}

import { nanoid } from 'nanoid'
import Shape from './shape'

export default class Piece {
	id: string
	shape: Shape
	middleOffset: { x: number; y: number } = $derived.by(() => {
		let offsetX = 0
		let offsetY = 0

		for (let row = 0; row < this.shape.layout.length; ++row) {
			for (let col = 0; col < this.shape.layout[row].length; ++col) {
				if (this.shape.layout[row][col] === 2) {
					offsetX = col
					offsetY = row
				}
			}
		}

		return { x: offsetX, y: offsetY }
	})

	constructor(shape: Shape) {
		this.id = nanoid()
		this.shape = shape
	}

	flipPiece() {
		// TODO:
	}

	rotatePiece() {
		// TODO:
	}
}

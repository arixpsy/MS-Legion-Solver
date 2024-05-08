import Shape from './shape'

export default class Piece {
	shape: Shape

	constructor(shape: Shape) {
		this.shape = shape
	}

	middleOffset() {
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

		return { offsetX, offsetY }
	}
}

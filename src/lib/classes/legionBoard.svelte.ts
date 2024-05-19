import { PlacedPiece, Point } from '$lib/classes'
import { BlockType } from '$lib/types'

export default class LegionBoard {
	size = $state({
		height: 0,
		width: 0
	})
	selectedArea: boolean[][] = $state([[]])
	filledArea:  boolean[][] = $state([[]])
	filledPoints: Array<Point> = []
	middlePoints: Array<Point> = $state([])
	placedPieces: Array<PlacedPiece> = $state([])

	blocksToFill: number = $derived.by(() => {
		let count = 0
		for (let row = 0; row < this.selectedArea.length; row++) {
			for (let col = 0; col < this.selectedArea[row].length; col++) {
				if (this.selectedArea[row][col]) count += 1
			}
		}
		return count
	})

	constructor(playerLevel: number) {
		this.setBoardSize(playerLevel)
	}

	setBoardSize(playerLevel: number) {
		let height = 0
		let width = 0

		if (playerLevel >= 6000) {
			height = 20
			width = 22
		} else if (playerLevel >= 5000) {
			height = 18
			width = 20
		} else if (playerLevel >= 4000) {
			height = 16
			width = 18
		} else if (playerLevel >= 3000) {
			height = 14
			width = 16
		} else if (playerLevel >= 2000) {
			height = 12
			width = 14
		} else if (playerLevel >= 500) {
			height = 10
			width = 12
		}

		this.size = {
			height,
			width
		}

		this.filledArea = Array.from({ length: height }, () => Array(width).fill(false))
		this.selectedArea = Array.from({ length: height }, () => Array(width).fill(false))
		this.middlePoints = [
			new Point(width / 2 - 1, height / 2 - 1),
			new Point(width / 2, height / 2 - 1),
			new Point(width / 2 - 1, height / 2),
			new Point(width / 2, height / 2)
		]
	}

	setSelectedArea(rowIndex: number, colIndex: number, isSelected: boolean) {
		this.selectedArea[rowIndex][colIndex] = isSelected
	}

	addPlacedPiece(placedPiece: PlacedPiece) {
		this.placedPieces.push(placedPiece)

		const { piece, point } = placedPiece
		const shapeLayout = piece.shape.layout
		const pieceMiddleOffset = piece.middleOffset

		for (let row = 0; row < shapeLayout.length; ++row) {
			for (let col = 0; col < shapeLayout[row].length; ++col) {
				if (shapeLayout[row][col] !== BlockType.Empty) {
					// convert shape point to point on the board
					const boardX = point.x - (pieceMiddleOffset.x - col)
					const boardY = point.y - (pieceMiddleOffset.y - row)

					this.filledArea[boardY][boardX] = true
					this.filledPoints.push(new Point(boardX, boardY))
				}
			}
		}
	}

	removeLastPiece() {
		if (this.placedPieces.length === 0) throw Error('No piece to remove')

		const placedPiece = this.placedPieces.pop() as PlacedPiece
		const { piece, point } = placedPiece
		const shapeLayout = piece.shape.layout
		const pieceMiddleOffset = piece.middleOffset

		for (let row = 0; row < shapeLayout.length; ++row) {
			for (let col = 0; col < shapeLayout[row].length; ++col) {
				if (shapeLayout[row][col] !== BlockType.Empty) {
					// convert shape point to point on the board
					const boardX = point.x - (pieceMiddleOffset.x - col)
					const boardY = point.y - (pieceMiddleOffset.y - row)

					this.filledArea[boardY][boardX] = false
					this.filledPoints.pop()
				}
			}
		}
	}
}

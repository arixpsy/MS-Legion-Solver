import { PlacedPiece, Point } from '$lib/classes'
import { BlockType } from '$lib/types'

export default class LegionBoard {
	pieceLimit = $state(0)
	size = $state({
		height: 0,
		width: 0
	})
	selectedArea: boolean[][] = $state([[]])
	filledArea: boolean[][] = $state([[]])
	middlePoints: Array<Point> = $state([])
	placedPieces: Array<PlacedPiece> = $state([])
	pointsToBeFilled: Set<string> = $state(new Set([]))

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
		this.setPieceLimit(playerLevel)
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

	setPieceLimit(playerLevel: number) {
		let pieceLimit = 0
		if (playerLevel >= 12500) {
			pieceLimit = 45
		} else if (playerLevel >= 12000) {
			pieceLimit = 44
		} else if (playerLevel >= 11500) {
			pieceLimit = 43
		} else if (playerLevel >= 11000) {
			pieceLimit = 42
		} else if (playerLevel >= 10500) {
			pieceLimit = 41
		} else if (playerLevel >= 10000) {
			pieceLimit = 40
		} else if (playerLevel >= 9500) {
			pieceLimit = 39
		} else if (playerLevel >= 9000) {
			pieceLimit = 38
		} else if (playerLevel >= 8500) {
			pieceLimit = 37
		} else if (playerLevel >= 8000) {
			pieceLimit = 36
		} else if (playerLevel >= 7500) {
			pieceLimit = 31
		} else if (playerLevel >= 7000) {
			pieceLimit = 30
		} else if (playerLevel >= 6500) {
			pieceLimit = 29
		} else if (playerLevel >= 6000) {
			pieceLimit = 28
		} else if (playerLevel >= 5500) {
			pieceLimit = 27
		} else if (playerLevel >= 5000) {
			pieceLimit = 22
		} else if (playerLevel >= 4500) {
			pieceLimit = 21
		} else if (playerLevel >= 4000) {
			pieceLimit = 20
		} else if (playerLevel >= 3500) {
			pieceLimit = 19
		} else if (playerLevel >= 3000) {
			pieceLimit = 18
		} else if (playerLevel >= 2500) {
			pieceLimit = 13
		} else if (playerLevel >= 2000) {
			pieceLimit = 12
		} else if (playerLevel >= 1500) {
			pieceLimit = 11
		} else if (playerLevel >= 1000) {
			pieceLimit = 10
		} else if (playerLevel >= 500) {
			pieceLimit = 9
		} else {
			pieceLimit = 0
		}
		this.pieceLimit = pieceLimit
	}

	setSelectedArea(rowIndex: number, colIndex: number, isSelected: boolean) {
		this.selectedArea[rowIndex][colIndex] = isSelected
		if (isSelected) {
			this.pointsToBeFilled.add([rowIndex, colIndex].join('-'))
		} else {
			this.pointsToBeFilled.delete([rowIndex, colIndex].join('-'))
		}
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
					this.pointsToBeFilled.delete([boardY, boardX].join('-'))
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
					this.pointsToBeFilled.add([boardY, boardX].join('-'))
				}
			}
		}
	}

	removeAllPieces() {
		Array.from({ length: this.placedPieces.length }, () => this.removeLastPiece())
	}

	checkForSingleIsolatedPoints(): Point | undefined {
		for (const pointStr of this.pointsToBeFilled.values()) {
			const [rowStr, colStr] = pointStr.split('-')
			const row = parseInt(rowStr)
			const col = parseInt(colStr)

			const isTopFree = row > 0 && this.selectedArea[row - 1][col] && !this.filledArea[row - 1][col]
			const isBottomFree =
				row < this.selectedArea.length - 1 &&
				this.selectedArea[row + 1][col] &&
				!this.filledArea[row + 1][col]
			const isLeftFree =
				col > 0 && this.selectedArea[row][col - 1] && !this.filledArea[row][col - 1]
			const isRightFree =
				col < this.selectedArea[row].length - 1 &&
				this.selectedArea[row][col + 1] &&
				!this.filledArea[row][col + 1]
			
			if(!isTopFree && !isBottomFree && !isLeftFree && !isRightFree) return new Point(col, row)
		}

		return undefined
	}
}

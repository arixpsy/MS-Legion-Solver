import { Piece, PlacedPiece, Point } from '$lib/classes'

export default class LegionBoard {
	size = $state({
		height: 0,
		width: 0
	})
	selectedArea: boolean[][] = $state([[]])
	state: number[][] = $state([[]])
	middlePoints: Array<Point> = $state([])
	placedPieces: Array<PlacedPiece> = $state([])

	blocksToFill: number = $derived.by(() => {
		let count = 0
		for (let row = 0; row < this.selectedArea.length; ++row) {
			for (let col = 0; col < this.selectedArea[row].length; ++col) {
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

		this.state = Array.from({ length: height }, () => Array(width).fill(0))
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

	addPlacedPiece(point: Point, piece: Piece) {
		this.placedPieces.push(new PlacedPiece(point, piece))
	}
}

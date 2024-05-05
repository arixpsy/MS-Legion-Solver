export class LegionBoard {
	size = $state({
		height: 0,
		width: 0
	})
	selectedArea: boolean[][] = $state([[]])
	state: number[][] = $state([[]])

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
	}

	setSelectedArea(rowIndex: number, colIndex: number, isSelected: boolean) {
		this.selectedArea[rowIndex][colIndex] = isSelected
	}
}

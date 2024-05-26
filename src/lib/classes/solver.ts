import { LegionBoard, Piece, PlacedPiece, Point, Shape } from '$lib/classes'
import { BlockType, ShapeType } from '$lib/types'

export default class Solver {
	board: LegionBoard
	pieces: Array<Piece>
	shouldLiveSolve: boolean

	constructor(
		board: LegionBoard,
		shapeCountMap: Record<ShapeType, number>,
		shouldLiveSolve: boolean
	) {
		this.board = board
		this.pieces = this.convertShapeCountMapToPieces(shapeCountMap)
		this.shouldLiveSolve = shouldLiveSolve
	}

	convertShapeCountMapToPieces(shapeCountMap: Record<ShapeType, number>): Array<Piece> {
		const pieces: Array<Piece> = []
		for (const [shapeType, numOfPieces] of Object.entries(shapeCountMap)) {
			for (let num = 0; num < numOfPieces; ++num) {
				const shape = new Shape(shapeType as ShapeType)
				const piece = new Piece({ shape })
				pieces.push(piece)
			}
		}
		pieces.sort((a, b) => b.shape.blockCount - a.shape.blockCount)
		return pieces
	}

	getPiecesBlockCount(): number {
		let blockCount = 0
		for (const piece of this.pieces) {
			blockCount += piece.shape.blockCount
		}
		return blockCount
	}

	getStartingPoints(): Array<Point> {
		const startingPoints = []
		for (const midPoint of this.board.middlePoints) {
			if (this.board.selectedArea[midPoint.y][midPoint.x]) {
				startingPoints.push(midPoint)
			}
		}
		return startingPoints
	}

	async solve() {
		if (this.pieces.length === 0) throw Error('No pieces to place on the board')
		if (this.board.blocksToFill === 0) throw Error('No selected board area')
		if (this.board.blocksToFill !== this.getPiecesBlockCount())
			throw Error('Size of selected area should match the block count of all pieces')

		// find all starting points
		const startingPoints = this.getStartingPoints()

		if (startingPoints.length === 0) throw Error('Selected board area invalid.')

		// loop through pieces and see if they fit the selected area for each starting point
		const possibleFirstPlacedPieces: Array<PlacedPiece> = []
		for (const startPoint of startingPoints) {
			for (const piece of this.pieces) {
				for (const rotation of [0, 90, 180, 270]) {
					if (rotation && !piece.shape.canRotate()) break
					for (const flip of [false, true]) {
						if (flip && !piece.shape.canFlip()) break
						const transformedPiece = new Piece({
							id: piece.id,
							shape: new Shape(piece.shape.shapeType, rotation, flip)
						})
						if (this.canPlacePiece(startPoint, transformedPiece)) {
							possibleFirstPlacedPieces.push(new PlacedPiece(startPoint, transformedPiece))
						}
					}
				}
			}
		}

		if (possibleFirstPlacedPieces.length === 0) throw Error('Board cannot be solved')

		let isSolved = false

		for (const firstPlacedPiece of possibleFirstPlacedPieces) {
			const piecesLeft = this.pieces.filter((p) => p.id !== firstPlacedPiece.id)
			this.board.addPlacedPiece(firstPlacedPiece)

			const nextPoint = this.findNextPointToFill()
			if (!nextPoint) {
				isSolved = true
				break
			}

			const pieceCombinations: Array<Piece> = []

			for (const piece of piecesLeft) {
				for (const rotation of [0, 90, 180, 270]) {
					if (rotation && !piece.shape.canRotate()) break
					for (const flip of [false, true]) {
						if (flip && !piece.shape.canFlip()) break
						const transformedPiece = new Piece({
							id: piece.id,
							shape: new Shape(piece.shape.shapeType, rotation, flip)
						})
						pieceCombinations.push(transformedPiece)
					}
				}
			}

			const solved = await this.fillNextPointRecursive(pieceCombinations, [], nextPoint)

			if (solved) {
				isSolved = true
				break
			}

			this.board.removeLastPiece()
		}

		return isSolved
	}

	async fillNextPointRecursive(
		pieceCombinations: Array<Piece>,
		history: Array<PlacedPiece>,
		point: Point | undefined
	): Promise<boolean> {
		if (!point) return false
		let pieceIndex = 0
		let currentPiece = pieceCombinations[pieceIndex]
		let currentPoint: Point | undefined = point

		while (currentPoint !== undefined) {
			const canFitPiece = this.canPlacePiece(currentPoint, currentPiece)

			if (canFitPiece) {
				const placedPiece = new PlacedPiece(currentPoint, currentPiece)
				this.board.addPlacedPiece(placedPiece)
				history.push(placedPiece)
				if (this.shouldLiveSolve) {
					await this.sleep(1)
				}

				if (history.length === this.pieces.length - 1) {
					return true
				}

				const newPieceCombinations = pieceCombinations.filter((p) => p.id !== currentPiece.id)
				const hasIsolatedPoint = this.board.checkForSingleIsolatedPoints()
				const singleBlockPiece = newPieceCombinations.filter((p) => p.shape.shapeType === 'Lv60')

				if (hasIsolatedPoint && singleBlockPiece.length === 0) {
					this.board.removeLastPiece()
					history.pop()
				} else {
					const newPermutation = await this.fillNextPointRecursive(
						newPieceCombinations,
						history,
						this.findNextPointToFill()
					)

					if (newPermutation) {
						return true
					} else {
						this.board.removeLastPiece()
						history.pop()
					}
				}
			}

			if (pieceIndex < pieceCombinations.length - 1) {
				pieceIndex = pieceIndex + 1
				currentPiece = pieceCombinations[pieceIndex]
			} else {
				currentPoint = this.findNextPointToFill(currentPoint)
				pieceIndex = 0
				currentPiece = pieceCombinations[pieceIndex]
			}
		}

		return false
	}

	findNextPointToFill(currentPoint?: Point): Point | undefined {
		for (let row = 0; row < this.board.filledArea.length; row++) {
			if (currentPoint && row < currentPoint.y) continue
			for (let col = 0; col < this.board.filledArea[row].length; col++) {
				if (!this.board.selectedArea[row][col]) continue
				if (currentPoint && row <= currentPoint.y && col <= currentPoint.x) continue
				if (!this.board.filledArea[row][col]) {
					return new Point(col, row)
				}
			}
		}
		return undefined
	}

	canPlacePiece(point: Point, piece: Piece): boolean {
		const shapeLayout = piece.shape.layout
		const pieceMiddleOffset = piece.middleOffset

		for (let row = 0; row < shapeLayout.length; ++row) {
			for (let col = 0; col < shapeLayout[row].length; ++col) {
				if (shapeLayout[row][col] !== BlockType.Empty) {
					// convert shape point to point on the board
					const boardX = point.x - (pieceMiddleOffset.x - col)
					const boardY = point.y - (pieceMiddleOffset.y - row)

					// check if point out of bounds
					if (boardY < 0) return false
					if (boardX < 0) return false
					if (boardY >= this.board.selectedArea.length) return false
					if (boardX >= this.board.selectedArea[boardY].length) return false

					// check if point is filled in a selected area
					if (!this.board.selectedArea[boardY][boardX]) return false

					// check if point is filled in a filled area
					if (this.board.filledArea[boardY][boardX]) return false
				}
			}
		}

		return true
	}

	sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
}

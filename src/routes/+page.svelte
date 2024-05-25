<script lang="ts">
	import { LegionBoard, Shape, Solver } from '$lib/classes'
	import {
		BoardInfoSection,
		LegionBoard as LegionBoardComponent,
		LegionUI,
		PieceInfoSection,
		PieceSelector,
		RankSelector
	} from '$lib/components'
	import { ShapeType } from '$lib/types'
	import { initPieceCount } from '$lib/utils/functions'

	let board = new LegionBoard(500)
	let playerLevel: number = $state(500)
	let shouldLiveSolve: boolean = $state(false)
	let shapeCountMap: Record<ShapeType, number> = $state(initPieceCount())
	let totalPieceCount: number = $derived.by(getPieceCount)
	let totalShapeBlockCount: number = $derived.by(getPieceBlockCount)

	$effect(() => {
		board.setBoardSize(playerLevel)
		board.setPieceLimit(playerLevel)
	})

	function getPieceCount() {
		let pieceCount = 0
		for (const numOfPieces of Object.values(shapeCountMap)) {
			pieceCount += numOfPieces
		}
		return pieceCount
	}

	function getPieceBlockCount() {
		let blockCount = 0
		for (const [shapeType, numOfPieces] of Object.entries(shapeCountMap)) {
			blockCount += new Shape(shapeType as ShapeType).blockCount * numOfPieces
		}
		return blockCount
	}

	function solveLegionBoard() {
		const solver = new Solver(board, shapeCountMap, shouldLiveSolve)
		solver.solve()
	}
</script>

<div class="min-h-screen flex justify-center items-center flex-col bg-stone-700">
	<LegionUI>
		<LegionBoardComponent {board} slot="legion-board" />
		<PieceSelector {shapeCountMap} slot="piece-selector" />
		<PieceInfoSection {totalPieceCount} pieceLimit={board.pieceLimit} slot="piece-info" />

		<RankSelector bind:playerLevel slot="legion-rank" />
		<BoardInfoSection
			{totalShapeBlockCount}
			blocksToFill={board.blocksToFill}
			handleClickSolve={solveLegionBoard}
			bind:shouldLiveSolve
			slot="board-info"
		/>
	</LegionUI>
</div>

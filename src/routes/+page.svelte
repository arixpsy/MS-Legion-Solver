<script lang="ts">
	import { LegionBoard, Shape, Solver } from '$lib/classes'
	import {
		LegionBoard as LegionBoardComponent,
		LegionUI,
		PieceSelector,
		RankSelector
	} from '$lib/components'
	import { ShapeType } from '$lib/types'
	import { initPieceCount } from '$lib/utils/functions'

	let board = new LegionBoard(500)
	let playerLevel: number = $state(500)
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

	function handleSolve() {
		const solver = new Solver(board, shapeCountMap)
		solver.solve()
	}
</script>

<div class="min-h-screen flex justify-center items-center flex-col bg-stone-700">
	<LegionUI>
		<LegionBoardComponent {board} slot="legion-board" />

		<RankSelector bind:playerLevel slot="legion-rank" />

		<PieceSelector {shapeCountMap} slot="piece-selector" />

		<div class="flex items-center h-full" slot="board-info">
			<div
				class="ml-[100px] mt-[4px] h-[16px] text-center text-sm font-bold text-gray-500 w-[65px]"
			>
				<span class="text-white">{totalPieceCount}</span> / {board.pieceLimit}
			</div>
			<div class="flex gap-10">
				<p>Blocks available: {totalShapeBlockCount}</p>
				<p>Blocks to Fill: {board.blocksToFill}</p>
				<button onclick={handleSolve}>Solve</button>
			</div>
		</div>
	</LegionUI>
</div>

<script lang="ts">
	import { LegionBoard, Shape, Solver } from '$lib/classes'
	import { LegionBoard as LegionBoardComponent, LegionUI } from '$lib/components'
	import PieceSelector from '$lib/components/PieceSelector/PieceSelector.svelte'
	import { ShapeType } from '$lib/types'
	import { initPieceCount } from '$lib/utils/functions'

	let board = new LegionBoard(500)
	let playerLevel: number = $state(500)
	let shapeCountMap: Record<ShapeType, number> = $state(initPieceCount())
	let totalShapeBlockCount: number = $derived.by(getPieceBlockCount)

	function onChangePlayerLevel() {
		board.setBoardSize(playerLevel)
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

		<PieceSelector {shapeCountMap} slot="piece-selector" />

		<div class="flex flex-col border border-gray-400" slot="left-area">
			<label for="playerLevel"> Player Level:</label>
			<input
				id="playerLevel"
				type="number"
				min={500}
				bind:value={playerLevel}
				onchange={onChangePlayerLevel}
			/>

			<p>Blocks available: {totalShapeBlockCount}</p>
			<p>Blocks to Fill: {board.blocksToFill}</p>

			<button onclick={handleSolve}>Solve</button>
		</div>
	</LegionUI>
</div>

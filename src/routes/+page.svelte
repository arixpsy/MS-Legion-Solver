<script lang="ts">
	import { LegionBoard, Shape, Solver } from '$lib/classes'
	import { LegionBoard as LegionBoardComponent } from '$lib/components'
	import { ShapeType, BlockType } from '$lib/types'
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

	function handleSolve () {
		const solver = new Solver(board, shapeCountMap)
		solver.solve()
	}
</script>

<div class="min-h-screen flex justify-center items-center flex-col">
	<div class="flex flex-col border border-gray-400">
		<label for="playerLevel"> Player Level:</label>
		<input
			id="playerLevel"
			type="number"
			min={500}
			bind:value={playerLevel}
			onchange={onChangePlayerLevel}
		/>
	</div>

	<!-- TODO: convert to its own component -->
	<div class="grid grid-cols-4 my-3">
		{#each Object.values(ShapeType) as s}
			{@const shape = new Shape(s)}
			<div class="flex justify-between p-2 border h-16 items-center">
				<div class="flex flex-col">
					{#each shape.layout as shapeRow}
						<div class="flex">
							{#each shapeRow as colValue}
								{@const isEmptyBlock = colValue === BlockType.Empty}
								<div
									class="h-3 w-3 border"
									class:bg-blue-300={!isEmptyBlock}
									class:border-blue-300={!isEmptyBlock}
									class:bg-transparent={isEmptyBlock}
									class:border-transparent={isEmptyBlock}
								></div>
							{/each}
						</div>
					{/each}
				</div>

				<input
					type="number"
					class="w-10 bg-slate-200 rounded-md text-center"
					bind:value={shapeCountMap[s]}
				/>
			</div>
		{/each}
	</div>

	<button onclick={handleSolve}>Solve</button>

	<LegionBoardComponent {board} />

	<p>Blocks available: {totalShapeBlockCount}</p>
	<p>Blocks to Fill: {board.blocksToFill}</p>
</div>

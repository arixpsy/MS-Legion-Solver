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
	let appState: 'default' | 'solving' | 'solved' = $state('default')

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

	async function handleClickSolve() {
		appState = 'solving'
		let isSolved = false
		const solver = new Solver(board, shapeCountMap, shouldLiveSolve)
		await solver.sleep(1)

		try {
			isSolved = await solver.solve()
		} catch (e) {
			console.log(e)
		} finally {
			if (isSolved) {
				appState = 'solved'
			} else {
				appState = 'default'
			}
		}
	}

	function handleClickReset() {
		board.selectedArea = Array.from({ length: board.size.height }, () =>
			Array(board.size.width).fill(false)
		)
	}

	function handleClickClear() {
		board.removeAllPieces()
		appState = 'default'
	}

	function handleOnClickResetPieceCount() {
		shapeCountMap = initPieceCount()
	}
</script>

<div class="min-h-screen flex justify-center items-center flex-col bg-stone-700">
	<LegionUI>
		{#snippet BoardInfoSnippet()}
			<BoardInfoSection
				{appState}
				{totalShapeBlockCount}
				blocksToFill={board.blocksToFill}
				{handleClickSolve}
				{handleClickReset}
				{handleClickClear}
				bind:shouldLiveSolve
			/>
		{/snippet}

		{#snippet LegionBoardSnippet()}
			<LegionBoardComponent {board} />
		{/snippet}

		{#snippet LegionRankSnippet()}
			<RankSelector bind:playerLevel />
		{/snippet}

		{#snippet PieceInfoSnippet()}
			<PieceInfoSection
				{totalPieceCount}
				pieceLimit={board.pieceLimit}
				onClickReset={handleOnClickResetPieceCount}
			/>
		{/snippet}

		{#snippet PieceSelectorSnippet()}
			<PieceSelector bind:shapeCountMap {totalPieceCount} pieceLimit={board.pieceLimit} />
		{/snippet}
	</LegionUI>
</div>

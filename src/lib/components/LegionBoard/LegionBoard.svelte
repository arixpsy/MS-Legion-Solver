<script lang="ts">
	import { LegionBoard } from '$lib/classes'
	import { PlacedPiece as PlacedPieceComponent } from '$lib/components'

	type LegionBoardProps = {
		board: LegionBoard
	}

	let { board }: LegionBoardProps = $props()
	let dragValue = false
	let isDragging = false

	function handleGridMouseDown(row: number, col: number) {
		const gridValue = board.selectedArea[row][col]
		isDragging = true
		dragValue = !gridValue
		board.setSelectedArea(row, col, dragValue)
	}

	function handleGridMouseOver(row: number, col: number) {
		if (isDragging) {
			board.setSelectedArea(row, col, dragValue)
		}
	}

	function handleGridMouseUp() {
		isDragging = false
	}
</script>

<div class="w-full h-full grid justify-center items-center">
	<div
		class="flex flex-col relative overflow-hidden gap-[1px] bottom-[4px] right-[1px] hide-outer-tiles"
	>
		{#each board.selectedArea as rowData, rindex}
			<div class="flex gap-[1px]">
				{#each rowData as colData, cindex}
					<button
						onmousedown={() => handleGridMouseDown(rindex, cindex)}
						onmouseover={() => handleGridMouseOver(rindex, cindex)}
						onmouseup={handleGridMouseUp}
						onfocus={() => {}}
						class="h-[21px] w-[21px] rounded-sm opacity-50"
						class:bg-green-700={board.selectedArea[rindex][cindex]}
					></button>
				{/each}
			</div>
		{/each}

		{#each board.placedPieces as placedPiece}
			{#key [placedPiece.id, placedPiece.shape]}
				<PlacedPieceComponent {placedPiece} />
			{/key}
		{/each}
	</div>
</div>

<style>
	.hide-outer-tiles {
		box-shadow: 0px 0px 1000px black;
	}
</style>

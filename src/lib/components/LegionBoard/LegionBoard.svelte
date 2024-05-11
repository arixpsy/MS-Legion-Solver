<script lang="ts">
	import { LegionBoard, Piece, PlacedPiece, Point, Shape } from '$lib/classes'
	import { PlacedPiece as PlacedPieceComponent } from '$lib/components'
	import { ShapeType } from '$lib/types'
	import { cn } from '$lib/utils/functions/commons'

	type LegionBoardProps = {
		board: LegionBoard
	}

	let { board }: LegionBoardProps = $props()
	let dragValue = false
	let isDragging = false
	// let placedPieces: Array<PlacedPiece> = [
	// 	new PlacedPiece(new Point(3, 4), new Piece(new Shape(ShapeType.Lv250Pirate)))
	// ]

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

<div class="flex flex-col relative overflow-hidden">
	{#each board.selectedArea as rowData, rindex}
		<div class="flex">
			{#each rowData as colData, cindex}
				<button
					onmousedown={() => handleGridMouseDown(rindex, cindex)}
					onmouseover={() => handleGridMouseOver(rindex, cindex)}
					onmouseup={handleGridMouseUp}
					onfocus={() => {}}
					class={cn(
						'h-7 w-7 bg-gray-700 border-gray-600 border',
						{ 'bg-slate-500': board.selectedArea[rindex][cindex] },
						{
							// Center grid lines
							'border-l-white': cindex === rowData.length / 2,
							'border-r-white': cindex + 1 === rowData.length / 2,
							'border-t-white': rindex === board.selectedArea.length / 2,
							'border-b-white': rindex + 1 === board.selectedArea.length / 2
						},
						{
							// top left grid lines
							'border-l-white': rindex === cindex - 1 && rindex < board.selectedArea.length / 2,
							'border-r-white': rindex === cindex && rindex < board.selectedArea.length / 2,
							'border-b-white': rindex === cindex - 1 && rindex < board.selectedArea.length / 2 - 1,
							'border-t-white': rindex === cindex && rindex < board.selectedArea.length / 2
						},
						{
							// top right grid lines
							'border-r-white':
								cindex - rindex === 2 * cindex - rowData.length + 2 &&
								rindex < board.selectedArea.length / 2,
							'border-l-white':
								cindex - rindex === 2 * cindex - rowData.length + 1 &&
								rindex < board.selectedArea.length / 2,
							'border-b-white':
								cindex - rindex === 2 * cindex - rowData.length + 2 &&
								rindex < board.selectedArea.length / 2 - 1,
							'border-t-white':
								cindex - rindex === 2 * cindex - rowData.length + 1 &&
								rindex < board.selectedArea.length / 2
						},
						{
							// bottom right grid lines
							'border-r-white':
								cindex - rindex === 2 * cindex - rowData.length + 3 &&
								rindex >= board.selectedArea.length / 2,
							'border-l-white':
								cindex - rindex === 2 * cindex - rowData.length + 2 &&
								rindex >= board.selectedArea.length / 2,
							'border-b-white':
								cindex - rindex === 2 * cindex - rowData.length + 3 &&
								rindex >= board.selectedArea.length / 2,
							'border-t-white':
								cindex - rindex === 2 * cindex - rowData.length + 2 &&
								rindex >= board.selectedArea.length / 2
						},
						{
							// bottom right grid lines
							'border-l-white':
								rindex + 1 === cindex - 1 && rindex >= board.selectedArea.length / 2,
							'border-r-white': rindex === cindex - 1 && rindex >= board.selectedArea.length / 2,
							'border-b-white': rindex + 2 === cindex && rindex >= board.selectedArea.length / 2,
							'border-t-white': rindex + 1 === cindex && rindex >= board.selectedArea.length / 2
						}
					)}
				>
					<!-- {colData} -->
				</button>
			{/each}
		</div>
	{/each}

	{#each board.placedPieces as placedPiece}
		{#key placedPiece.id}
			<PlacedPieceComponent {placedPiece} />
		{/key}
	{/each}
</div>

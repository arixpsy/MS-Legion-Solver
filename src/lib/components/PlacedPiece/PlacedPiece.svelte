<script lang="ts">
	import { PlacedPiece } from '$lib/classes'
	import { BlockType } from '$lib/types'

	type PlacedPieceProps = {
		placedPiece: PlacedPiece
	}

	let { placedPiece }: PlacedPieceProps = $props()
	let { shape, point } = placedPiece
	let { x: offsetX, y: offsetY } = placedPiece.middleOffset
	let topOffset = point.y * 28 - offsetY * 28
	let leftOffset = point.x * 28 - offsetX * 28
	// TODO: update color for each piece
	let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
</script>

<div class="flex flex-col absolute" style:top="{topOffset}px" style:left="{leftOffset}px">
	{#each shape.layout as shapeRow}
		<div class="flex">
			{#each shapeRow as colValue}
				{@const isEmptyBlock = colValue === BlockType.Empty}
				<div
					class="h-7 w-7 border"
					class:bg-transparent={isEmptyBlock}
					class:border-transparent={isEmptyBlock}
					style:background-color={!isEmptyBlock ? color : undefined}
					style:border-color={!isEmptyBlock ? color : undefined}
				></div>
			{/each}
		</div>
	{/each}
</div>

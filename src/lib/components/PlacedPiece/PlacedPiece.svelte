<script lang="ts">
	import { PlacedPiece } from '$lib/classes/placedPiece'
	import { BlockType } from '$lib/classes/shape'

	type PlacedPieceProps = {
		placedPiece: PlacedPiece
	}

	let { placedPiece }: PlacedPieceProps = $props()
	let { shape, point } = placedPiece
	let { offsetX, offsetY } = placedPiece.middleOffset
	let topOffset = point.y * 28 - offsetY * 28
	let leftOffset = point.x * 28 - offsetX * 28
</script>

<div class="flex flex-col absolute" style:top="{topOffset}px" style:left="{leftOffset}px">
	{#each shape.layout as shapeRow}
		<div class="flex">
			{#each shapeRow as colValue}
				{@const isEmptyBlock = colValue === BlockType.Empty}
				<div
					class="h-7 w-7 border"
					class:bg-blue-300={!isEmptyBlock}
					class:border-blue-300={!isEmptyBlock}
					class:bg-transparent={isEmptyBlock}
					class:border-transparent={isEmptyBlock}
				></div>
			{/each}
		</div>
	{/each}
</div>

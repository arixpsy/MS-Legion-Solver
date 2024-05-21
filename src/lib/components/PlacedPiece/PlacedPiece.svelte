<script lang="ts">
	import { PlacedPiece } from '$lib/classes'
	import { BlockType } from '$lib/types'

	type PlacedPieceProps = {
		placedPiece: PlacedPiece
	}

	let { placedPiece }: PlacedPieceProps = $props()
	let { shape, point } = placedPiece
	let { x: offsetX, y: offsetY } = placedPiece.middleOffset
	let topOffset = point.y * (21 + 1) - offsetY * (21 + 1)
	let leftOffset = point.x * (21 + 1) - offsetX * (21 + 1)
	// TODO: update color for each piece
	let color = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
</script>

<div class="flex flex-col absolute gap-[1px]" style:top="{topOffset}px" style:left="{leftOffset}px">
	{#each shape.layout as shapeRow}
		<div class="flex gap-[1px]">
			{#each shapeRow as colValue}
				{@const isEmptyBlock = colValue === BlockType.Empty}
				<div
					class="h-[21px] w-[21px]"
					class:bg-transparent={isEmptyBlock}
					style:background-color={!isEmptyBlock ? color : undefined}
				></div>
			{/each}
		</div>
	{/each}
</div>

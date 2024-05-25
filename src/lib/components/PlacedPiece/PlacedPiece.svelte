<script lang="ts">
	import { PlacedPiece } from '$lib/classes'
	import { BlockType } from '$lib/types'
	import { getPieceColor } from '$lib/utils/functions'

	type PlacedPieceProps = {
		placedPiece: PlacedPiece
	}

	let { placedPiece }: PlacedPieceProps = $props()
	let { shape, point } = placedPiece
	let { x: offsetX, y: offsetY } = placedPiece.middleOffset
	let topOffset = point.y * (21 + 1) - offsetY * (21 + 1)
	let leftOffset = point.x * (21 + 1) - offsetX * (21 + 1)
</script>

<div class="flex flex-col absolute gap-[1px]" style:top="{topOffset}px" style:left="{leftOffset}px">
	{#each shape.layout as shapeRow}
		<div class="flex gap-[1px]">
			{#each shapeRow as colValue}
				{@const isEmptyBlock = colValue === BlockType.Empty}
				<div
					class="h-[21px] w-[21px]"
					style:background-color={!isEmptyBlock ? getPieceColor(shape.shapeType) : 'transparent'}
				></div>
			{/each}
		</div>
	{/each}
</div>

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
	let isMouseHovering = $state(false)
</script>

<div
	role="listitem"
	class="hover:scale-105 hover:z-30 transition-transform flex flex-col absolute gap-[1px]"
	style:top="{topOffset}px"
	style:left="{leftOffset}px"
	onmouseout={() => (isMouseHovering = false)}
	onmouseover={() => (isMouseHovering = true)}
	onfocus={() => {}}
	onblur={() => {}}
	style:--block-border-color={isMouseHovering ? 'white' : '#222222'}
>
	{#each shape.layout as shapeRow}
		<div class="flex gap-[1px]">
			{#each shapeRow as colValue}
				{@const isEmptyBlock = colValue === BlockType.Empty}
				<div
					class="h-[21px] w-[21px]"
					class:block-border={!isEmptyBlock}
					style:background-color={!isEmptyBlock ? getPieceColor(shape.shapeType) : 'transparent'}
				></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.block-border {
		box-shadow: 0 0 0 1px var(--block-border-color);
	}
</style>

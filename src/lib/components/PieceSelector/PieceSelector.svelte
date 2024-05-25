<script lang="ts">
	import { Shape } from '$lib/classes'
	import { BlockType, ShapeType } from '$lib/types'
	import { getPieceColor, initPieceCount } from '$lib/utils/functions'

	type PieceSelectorProps = {
		pieceLimit: number
		totalPieceCount: number
		shapeCountMap: Record<ShapeType, number>
	}

	let {
		shapeCountMap = $bindable(initPieceCount()),
		pieceLimit,
		totalPieceCount
	}: PieceSelectorProps = $props()
</script>

<div class="flex justify-center items-center w-full h-full">
	<div class="w-[478px] h-[172px] grid grid-cols-4 gap-x-[9px]">
		{#each Object.values(ShapeType) as s}
			{@const shape = new Shape(s)}
			<div class="flex justify-between px-3 items-center">
				<div class="flex flex-col gap-[1px]">
					{#each shape.layout as shapeRow}
						<div class="flex gap-[1px]">
							{#each shapeRow as colValue}
								{@const isEmptyBlock = colValue === BlockType.Empty}
								<div
									class="h-2 w-2"
									class:block-border={!isEmptyBlock}
									style:background-color={!isEmptyBlock ? getPieceColor(s) : 'transparent'}
								></div>
							{/each}
						</div>
					{/each}
				</div>

				<input
					type="number"
					class="w-10 bg-slate-200 rounded-md text-center"
					bind:value={shapeCountMap[s]}
					min={0}
					max={pieceLimit - (totalPieceCount - shapeCountMap[s])}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.block-border {
		box-shadow: 0 0 0 1px #222222;
	}
</style>

<script lang="ts">
	type BoardInfoSectionProps = {
		totalShapeBlockCount: number
		blocksToFill: number
		handleClickSolve?: () => void
	}

	let {
		totalShapeBlockCount,
		blocksToFill,
		handleClickSolve = () => {}
	}: BoardInfoSectionProps = $props()
</script>

<div class="h-[170px] px-[15px]">
	<div class="h-[80px] flex flex-col">
		<p>Blocks available: {totalShapeBlockCount}</p>
		<p>Blocks to Fill: {blocksToFill}</p>
	</div>
	<div class="flex">
		<button class="w-full" onclick={handleClickSolve}>Reset Board Selection</button>
		<button class="w-full" onclick={handleClickSolve}>Solve</button>
	</div>
</div>

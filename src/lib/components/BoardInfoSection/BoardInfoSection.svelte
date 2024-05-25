<script lang="ts">
	type BoardInfoSectionProps = {
		totalShapeBlockCount: number
		blocksToFill: number
		handleClickSolve?: () => void
		shouldLiveSolve?: boolean
	}

	let {
		totalShapeBlockCount,
		blocksToFill,
		handleClickSolve = () => {},
		shouldLiveSolve = $bindable(false)
	}: BoardInfoSectionProps = $props()
</script>

<div class="h-[170px] px-[15px]">
	<div class="h-[80px] flex flex-col justify-center px-[10px] text-white text-sm">
		<p>Blocks available from pieces: {totalShapeBlockCount}</p>
		<p>Blocks to Fill: {blocksToFill}</p>
		<label class="flex gap-1">
			<input type="checkbox" bind:checked={shouldLiveSolve} /> Live Solve
		</label>
	</div>
	<div class="flex">
		<button class="w-full" onclick={handleClickSolve}>Reset Board Selection</button>
		<button class="w-full" onclick={handleClickSolve}>Solve</button>
	</div>
</div>

<script lang="ts">
	import BoardInfoButton from './BoardInfoButton.svelte'

	type BoardInfoSectionProps = {
		appState: 'default' | 'solving' | 'solved'
		totalShapeBlockCount: number
		blocksToFill: number
		handleClickSolve?: () => void
		handleClickReset?: () => void
		handleClickClear?: () => void
		shouldLiveSolve?: boolean
	}

	let {
		appState,
		totalShapeBlockCount,
		blocksToFill,
		handleClickSolve = () => {},
		handleClickReset = () => {},
		handleClickClear = () => {},
		shouldLiveSolve = $bindable(false)
	}: BoardInfoSectionProps = $props()

	let isAppSolving = $derived(appState === 'solving')
	let isAppSolved = $derived(appState === 'solved')
</script>

{#snippet spinner()}
	<div
		class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
		role="status"
		aria-label="loading"
	>
		<span class="sr-only">Loading...</span>
	</div>
{/snippet}

<div class="h-[170px] px-[15px]">
	<div class="h-[80px] flex flex-col justify-center px-[10px] text-white text-sm">
		<p>Blocks available from pieces: {totalShapeBlockCount}</p>
		<p>Blocks to Fill: {blocksToFill}</p>
		<label class="flex gap-1">
			<input type="checkbox" bind:checked={shouldLiveSolve} /> Live Solve
		</label>
	</div>
	<div class="flex gap-3 h-[90px] py-3">
		<BoardInfoButton
			color="green"
			onclick={handleClickReset}
			isDisabled={isAppSolving || isAppSolved}
		>
			Reset Selection
		</BoardInfoButton>
		{#if isAppSolved}
			<BoardInfoButton color="red" onclick={handleClickClear}>Clear Pieces</BoardInfoButton>
		{:else if isAppSolving}
			<BoardInfoButton color="blue" isDisabled>
				{@render spinner()}
				Solving
			</BoardInfoButton>
		{:else}
			<BoardInfoButton color="green" onclick={handleClickSolve}>Solve</BoardInfoButton>
		{/if}
	</div>
</div>

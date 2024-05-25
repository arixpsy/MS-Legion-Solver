<script lang="ts">
	import PieceResetButton from './PieceResetButton.svelte'

	type PieceInfoSectionProps = {
		totalPieceCount: number
		pieceLimit: number
		onClickReset?: () => void
	}

	let { totalPieceCount, pieceLimit, onClickReset }: PieceInfoSectionProps = $props()
</script>

<div class="flex items-center h-full">
	<div class="ml-[100px] mt-[4px] h-[16px] text-center text-sm font-bold text-gray-500 w-[65px]">
		<span class="text-white">{totalPieceCount}</span> / {pieceLimit}
	</div>
	<PieceResetButton onclick={onClickReset} isDisabled={totalPieceCount === 0} />
</div>

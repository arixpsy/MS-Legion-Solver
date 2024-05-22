<script lang="ts">
	type PieceInfoSectionProps = {
		totalPieceCount: number
		pieceLimit: number
	}

	let { totalPieceCount, pieceLimit }: PieceInfoSectionProps = $props()
</script>

<div class="flex items-center h-full">
	<div class="ml-[100px] mt-[4px] h-[16px] text-center text-sm font-bold text-gray-500 w-[65px]">
		<span class="text-white">{totalPieceCount}</span> / {pieceLimit}
	</div>
</div>

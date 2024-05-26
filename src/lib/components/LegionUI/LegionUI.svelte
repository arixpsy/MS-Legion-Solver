<script lang="ts">
	import type { Snippet } from 'svelte'
	import bg from '$lib/assets/legion-bg.png'

	type LegionUIProps = {
		BoardInfoSnippet: Snippet
		CreditsSnippet: Snippet
		LegionBoardSnippet: Snippet
		LegionRankSnippet: Snippet
		PieceInfoSnippet: Snippet
		PieceSelectorSnippet: Snippet
	}

	let {
		BoardInfoSnippet,
		CreditsSnippet,
		LegionBoardSnippet,
		LegionRankSnippet,
		PieceInfoSnippet,
		PieceSelectorSnippet
	}: LegionUIProps = $props()
</script>

<div
	class="relative flex justify-between object-cover w-[1008px] h-[743px] pt-[9px] pr-[13px] pb-[19px] pl-[13px]"
	style:background={`url(${bg})`}
>
	<!-- Left Side -->
	<div class="w-[582px] flex flex-col">
		<div class="w-full h-[476px]">
			{@render LegionBoardSnippet()}
		</div>
		<div class="w-full h-[44px]">
			{@render PieceInfoSnippet()}
		</div>
		<div class="w-full h-[194px]">
			{@render PieceSelectorSnippet()}
		</div>
	</div>

	<!-- Right Side -->
	<div class="w-[392px]">
		<div class="h-[436px]">
			{@render LegionRankSnippet()}
			{@render BoardInfoSnippet()}
		</div>

		<div class="h-[270px] mt-[10px]">
			{@render CreditsSnippet()}
		</div>
	</div>
</div>

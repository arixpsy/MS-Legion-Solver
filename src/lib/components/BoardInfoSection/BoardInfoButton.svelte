<script lang="ts">
	import type { Snippet } from 'svelte'

	type BoardInfoButtonProps = {
		color: 'red' | 'blue' | 'green'
		isDisabled?: boolean
		onclick?: () => void
		children?: Snippet
	}

	let { color, children, isDisabled, onclick }: BoardInfoButtonProps = $props()
</script>

<button
	class="w-full flex items-center justify-center gap-2 bg-lime-500 text-white rounded-lg text-lg font-bold"
	class:bg-lime-500={color === 'green'}
	class:bg-red-500={color === 'red'}
	class:bg-blue-500={color === 'blue'}
	class:text-stone-200={isDisabled}
	class:cursor-not-allowed={isDisabled}
	disabled={isDisabled}
	{onclick}
>
	{#if children}
		{@render children()}
	{/if}
</button>

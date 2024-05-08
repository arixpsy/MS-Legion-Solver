<script lang="ts">
	import { LegionBoard } from '$lib/classes'

	import LegionBoardComponent from '$lib/components/LegionBoard/LegionBoard.svelte'

	let board = new LegionBoard(500)
	let playerLevel: number = $state(500)

	function onChangePlayerLevel() {
		board.setBoardSize(playerLevel)
	}
</script>

<div class="min-h-screen flex justify-center items-center flex-col">
	<div class="flex flex-col border border-gray-400">
		<label for="playerLevel"> Player Level:</label>
		<input
			id="playerLevel"
			type="number"
			min={500}
			bind:value={playerLevel}
			onchange={onChangePlayerLevel}
		/>
	</div>

	<LegionBoardComponent {board} />
</div>

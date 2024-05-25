<script lang="ts">
	type PieceResetButtonProps = {
		isDisabled?: boolean
		onclick?: () => void
	}

	let { isDisabled = false, onclick }: PieceResetButtonProps = $props()
</script>

<button class="piece-reset-button" disabled={isDisabled} {onclick}></button>

<style>
	.piece-reset-button {
		height: 35px;
		width: 62px;
		scale: 0.7;
		background-position: center;
		background-size: auto;
		background-repeat: no-repeat;
		background-image: url($lib/assets/resetButton/attackerSetting.buttonclear.normal.0.png);
	}

	.piece-reset-button:active {
		background-image: url($lib/assets/resetButton/attackerSetting.buttonclear.pressed.0.png);
	}

	.piece-reset-button:hover:not(:active):not(:disabled) {
		background-image: url($lib/assets/resetButton/attackerSetting.buttonclear.mouseOver.0.png);
	}

	.piece-reset-button:disabled {
		background-image: url($lib/assets/resetButton/attackerSetting.buttonclear.disabled.0.png);
	}
</style>

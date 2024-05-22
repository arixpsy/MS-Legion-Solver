<script lang="ts">
	type LeftButtonProps = {
		isDisabled?: boolean
		onclick?: () => void
	}

	let { isDisabled = false, onclick }: LeftButtonProps = $props()
</script>

<button class="left-button" disabled={isDisabled} {onclick}></button>

<style>
	.left-button {
		height: 64px;
		width: 29px;
		scale: 0.7;
		background-position: center;
		background-size: auto;
		background-repeat: no-repeat;
		background-image: url($lib/assets/leftButton/attackerSetting.buttonLeft.normal.0.png);
	}

	.left-button:active {
		background-image: url($lib/assets/leftButton/attackerSetting.buttonLeft.pressed.0.png);
	}

	.left-button:hover:not(:active):not(:disabled) {
		background-image: url($lib/assets/leftButton/attackerSetting.buttonLeft.mouseOver.0.png);
	}

	.left-button:disabled {
		background-image: url($lib/assets/leftButton/attackerSetting.buttonLeft.disabled.0.png);
	}
</style>

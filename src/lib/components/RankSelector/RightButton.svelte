<script lang="ts">
	type RightButtonProps = {
		isDisabled?: boolean
		onclick?: () => void
	}

	let { isDisabled = false, onclick }: RightButtonProps = $props()
</script>

<button class="right-button" disabled={isDisabled} {onclick}></button>

<style>
	.right-button {
		height: 64px;
		width: 29px;
		scale: 0.7;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		background-image: url($lib/assets/rightButton/attackerSetting.buttonRight.normal.0.png);
	}

	.right-button:active {
		background-image: url($lib/assets/rightButton/attackerSetting.buttonRight.pressed.0.png);
	}

	.right-button:hover:not(:active):not(:disabled) {
		background-image: url($lib/assets/rightButton/attackerSetting.buttonRight.mouseOver.0.png);
	}

	.right-button:disabled {
		background-image: url($lib/assets/rightButton/attackerSetting.buttonRight.disabled.0.png);
	}
</style>

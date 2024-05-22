<script lang="ts">
	import noviceSymbol1 from '$lib/assets/rank/attackerSetting.Rank.symbol.0.0.png'
	import noviceSymbol2 from '$lib/assets/rank/attackerSetting.Rank.symbol.0.1.png'
	import noviceSymbol3 from '$lib/assets/rank/attackerSetting.Rank.symbol.0.2.png'
	import noviceSymbol4 from '$lib/assets/rank/attackerSetting.Rank.symbol.0.3.png'
	import noviceSymbol5 from '$lib/assets/rank/attackerSetting.Rank.symbol.0.4.png'
	import veteranSymbol1 from '$lib/assets/rank/attackerSetting.Rank.symbol.1.0.png'
	import veteranSymbol2 from '$lib/assets/rank/attackerSetting.Rank.symbol.1.1.png'
	import veteranSymbol3 from '$lib/assets/rank/attackerSetting.Rank.symbol.1.2.png'
	import veteranSymbol4 from '$lib/assets/rank/attackerSetting.Rank.symbol.1.3.png'
	import veteranSymbol5 from '$lib/assets/rank/attackerSetting.Rank.symbol.1.4.png'
	import masterSymbol1 from '$lib/assets/rank/attackerSetting.Rank.symbol.2.0.png'
	import masterSymbol2 from '$lib/assets/rank/attackerSetting.Rank.symbol.2.1.png'
	import masterSymbol3 from '$lib/assets/rank/attackerSetting.Rank.symbol.2.2.png'
	import masterSymbol4 from '$lib/assets/rank/attackerSetting.Rank.symbol.2.3.png'
	import masterSymbol5 from '$lib/assets/rank/attackerSetting.Rank.symbol.2.4.png'
	import grandMasterSymbol1 from '$lib/assets/rank/attackerSetting.Rank.symbol.3.0.png'
	import grandMasterSymbol2 from '$lib/assets/rank/attackerSetting.Rank.symbol.3.1.png'
	import grandMasterSymbol3 from '$lib/assets/rank/attackerSetting.Rank.symbol.3.2.png'
	import grandMasterSymbol4 from '$lib/assets/rank/attackerSetting.Rank.symbol.3.3.png'
	import grandMasterSymbol5 from '$lib/assets/rank/attackerSetting.Rank.symbol.3.4.png'
	import supremeSymbol1 from '$lib/assets/rank/attackerSetting.Rank.symbol.4.0.png'
	import supremeSymbol2 from '$lib/assets/rank/attackerSetting.Rank.symbol.4.1.png'
	import supremeSymbol3 from '$lib/assets/rank/attackerSetting.Rank.symbol.4.2.png'
	import supremeSymbol4 from '$lib/assets/rank/attackerSetting.Rank.symbol.4.3.png'
	import supremeSymbol5 from '$lib/assets/rank/attackerSetting.Rank.symbol.4.4.png'
	import noviceTitle1 from '$lib/assets/rank/attackerSetting.Rank.title.0.0.png'
	import noviceTitle2 from '$lib/assets/rank/attackerSetting.Rank.title.0.1.png'
	import noviceTitle3 from '$lib/assets/rank/attackerSetting.Rank.title.0.2.png'
	import noviceTitle4 from '$lib/assets/rank/attackerSetting.Rank.title.0.3.png'
	import noviceTitle5 from '$lib/assets/rank/attackerSetting.Rank.title.0.4.png'
	import veteranTitle1 from '$lib/assets/rank/attackerSetting.Rank.title.1.0.png'
	import veteranTitle2 from '$lib/assets/rank/attackerSetting.Rank.title.1.1.png'
	import veteranTitle3 from '$lib/assets/rank/attackerSetting.Rank.title.1.2.png'
	import veteranTitle4 from '$lib/assets/rank/attackerSetting.Rank.title.1.3.png'
	import veteranTitle5 from '$lib/assets/rank/attackerSetting.Rank.title.1.4.png'
	import masterTitle1 from '$lib/assets/rank/attackerSetting.Rank.title.2.0.png'
	import masterTitle2 from '$lib/assets/rank/attackerSetting.Rank.title.2.1.png'
	import masterTitle3 from '$lib/assets/rank/attackerSetting.Rank.title.2.2.png'
	import masterTitle4 from '$lib/assets/rank/attackerSetting.Rank.title.2.3.png'
	import masterTitle5 from '$lib/assets/rank/attackerSetting.Rank.title.2.4.png'
	import grandMasterTitle1 from '$lib/assets/rank/attackerSetting.Rank.title.3.0.png'
	import grandMasterTitle2 from '$lib/assets/rank/attackerSetting.Rank.title.3.1.png'
	import grandMasterTitle3 from '$lib/assets/rank/attackerSetting.Rank.title.3.2.png'
	import grandMasterTitle4 from '$lib/assets/rank/attackerSetting.Rank.title.3.3.png'
	import grandMasterTitle5 from '$lib/assets/rank/attackerSetting.Rank.title.3.4.png'
	import supremeTitle1 from '$lib/assets/rank/attackerSetting.Rank.title.4.0.png'
	import supremeTitle2 from '$lib/assets/rank/attackerSetting.Rank.title.4.1.png'
	import supremeTitle3 from '$lib/assets/rank/attackerSetting.Rank.title.4.2.png'
	import supremeTitle4 from '$lib/assets/rank/attackerSetting.Rank.title.4.3.png'
	import supremeTitle5 from '$lib/assets/rank/attackerSetting.Rank.title.4.4.png'
	import LeftButton from './LeftButton.svelte'
	import RightButton from './RightButton.svelte'

	type RankSelectorProps = {
		playerLevel: number
	}

	let { playerLevel = $bindable(500) }: RankSelectorProps = $props()
	let legionSymbolImage = $derived.by(getLegionSymbol)
	let legionTitleImage = $derived.by(getLegionTitle)

	function increaseLevel() {
		playerLevel += 500
	}

	function decreaseLevel() {
		playerLevel -= 500
	}

	function getLegionSymbol() {
		switch (playerLevel) {
			case 500:
				return noviceSymbol1
			case 1000:
				return noviceSymbol2
			case 1500:
				return noviceSymbol3
			case 2000:
				return noviceSymbol4
			case 2500:
				return noviceSymbol5
			case 3000:
				return veteranSymbol1
			case 3500:
				return veteranSymbol2
			case 4000:
				return veteranSymbol3
			case 4500:
				return veteranSymbol4
			case 5000:
				return veteranSymbol5
			case 5500:
				return masterSymbol1
			case 6000:
				return masterSymbol2
			case 6500:
				return masterSymbol3
			case 7000:
				return masterSymbol4
			case 7500:
				return masterSymbol5
			case 8000:
				return grandMasterSymbol1
			case 8500:
				return grandMasterSymbol2
			case 9000:
				return grandMasterSymbol3
			case 9500:
				return grandMasterSymbol4
			case 10000:
				return grandMasterSymbol5
			case 10500:
				return supremeSymbol1
			case 11000:
				return supremeSymbol2
			case 11500:
				return supremeSymbol3
			case 12000:
				return supremeSymbol4
			case 12500:
				return supremeSymbol5
			default:
				return ''
		}
	}

	function getLegionTitle() {
		switch (playerLevel) {
			case 500:
				return noviceTitle1
			case 1000:
				return noviceTitle2
			case 1500:
				return noviceTitle3
			case 2000:
				return noviceTitle4
			case 2500:
				return noviceTitle5
			case 3000:
				return veteranTitle1
			case 3500:
				return veteranTitle2
			case 4000:
				return veteranTitle3
			case 4500:
				return veteranTitle4
			case 5000:
				return veteranTitle5
			case 5500:
				return masterTitle1
			case 6000:
				return masterTitle2
			case 6500:
				return masterTitle3
			case 7000:
				return masterTitle4
			case 7500:
				return masterTitle5
			case 8000:
				return grandMasterTitle1
			case 8500:
				return grandMasterTitle2
			case 9000:
				return grandMasterTitle3
			case 9500:
				return grandMasterTitle4
			case 10000:
				return grandMasterTitle5
			case 10500:
				return supremeTitle1
			case 11000:
				return supremeTitle2
			case 11500:
				return supremeTitle3
			case 12000:
				return supremeTitle4
			case 12500:
				return supremeTitle5
			default:
				return ''
		}
	}
</script>

<div
	class="h-[266px] relative bg-no-repeat bg-top"
	style:background-image={`url(${legionTitleImage})`}
>
	<div class="absolute top-[15px] left-[10px]">
		<LeftButton isDisabled={playerLevel === 500} onclick={decreaseLevel} />
	</div>

	<div class="absolute top-[15px] right-[10px]">
		<RightButton isDisabled={playerLevel === 12500} onclick={increaseLevel} />
	</div>

	<img src={legionSymbolImage} alt="legion-rank-symbol" class="absolute top-[80px] left-[20px]" />

	<div class="absolute top-[125px] right-[30px] text-white text-5xl">
		{playerLevel}
	</div>
</div>

<script lang="ts">
	import bg from '$lib/assets/legion-bg.png'
</script>

<div
	class="relative flex justify-between object-cover w-[1008px] h-[743px] pt-[9px] pr-[13px] pb-[19px] pl-[13px]"
	style:background={`url(${bg})`}
>
	<!-- Left Side -->
	<div class="w-[582px] flex flex-col">
		<div class="w-full h-[478px]">
      <!-- Legion Board -->
      <slot name='legion-board' />
    </div>
    <div class="w-full h-[43px]">
      <slot name='board-info' />
    </div>
    <div class="w-full h-[200px]">
      <slot name='piece-selector' />
    </div>
	</div>

	<!-- Right Side -->
	<div class="bg-green-600 w-[392px] opacity-20"></div>
</div>

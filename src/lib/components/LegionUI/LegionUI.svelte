<script lang="ts">
	import bg from '$lib/assets/legion-bg.png'
</script>

<div
	class="relative flex justify-between object-cover w-[1008px] h-[743px] pt-[9px] pr-[13px] pb-[19px] pl-[13px]"
	style:background={`url(${bg})`}
>
	<!-- Left Side -->
	<div class="w-[582px] flex flex-col">
		<div class="w-[582px] h-[478px]">
      <!-- Legion Board -->
      <slot name='legion-board' />
    </div>
	</div>

	<!-- Right Side -->

	<div class="bg-green-600 w-[392px] opacity-20"></div>

	<!-- <div class=" px-[13px] py-[8px]">
		<div
			style:height="442px"
			style:width="486px"
			class="mt-[19px] ml-[47px] opacity-25 grid justify-center items-center"
		>
			
		</div>
	</div> -->
</div>

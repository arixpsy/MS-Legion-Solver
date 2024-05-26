<script lang="ts">
	import IconGithub from '~icons/mdi/github'
	import IconLink from '~icons/ci/external-link'
	import characterImage from '$lib/assets/character.png'
</script>

<div class="px-4 py-2 text-white">
	<h2 class="text-lg font-bold">Credits</h2>
	<div class="flex gap-3 text-sm">
		<div class="w-full p-3">
			<h3 class="font-bold">Inspired by:</h3>
			<div class="flex gap-1 items-center">
				Xenogent
				<a href="https://xenogents.github.io/LegionSolver/" class="hover:text-blue-500">
					<IconLink />
				</a>
				<a href="https://github.com/Xenogents/LegionSolver" class="hover:text-blue-500">
					<IconGithub />
				</a>
			</div>

			<h3 class="font-bold mt-5">Special thanks to:</h3>
			<div class="flex gap-1 items-center">
				Wickker
				<a href="https://github.com/wickker" class="hover:text-blue-500">
					<IconGithub />
				</a>
			</div>
		</div>
		<div class="w-full p-3">
			<h3 class="font-bold">Made by:</h3>
			<div class="flex gap-1 items-center">
				arixpsy
				<a href="https://github.com/arixpsy" class="hover:text-blue-500">
					<IconGithub />
				</a>
			</div>
			<img
				class="rounded-lg border-2 border-gray-500 mx-auto my-2"
				src={characterImage}
				alt="my maple character"
			/>
		</div>
	</div>
</div>

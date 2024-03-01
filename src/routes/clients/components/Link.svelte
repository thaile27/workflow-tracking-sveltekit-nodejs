<script>
	export let path = '#';
	export let label;
	export let style =
		'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
</script>

<a href={path} class={style}>{label}</a>

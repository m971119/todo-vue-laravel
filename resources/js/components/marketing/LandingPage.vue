<template>
	<div class="page-wrapper flex-center">
		<div class="card">
			<div class="card-body">
				This is a Todo List SPA (Single Page App) using Vue and PHP
				Laravel API.
				<br />View source code on
				<a
					href="https://github.com/m971119/todo-vue-laravel"
				>github.com/m971119/todo-vue-laravel</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.card {
		position: relative;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		min-width: 0;
		word-wrap: break-word;
		background-color: #fff;
		background-clip: border-box;
		border: 1px solid rgba(0, 0, 0, 0.125);
		border-radius: 0.5rem;
	}

	.card-body {
		line-height: 2em;
		text-align: center;
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		min-height: 1px;
		padding: 1.25rem;
		font-size: 20px;
	}
</style>

<script>
	import { Router, Route, Link  } from 'svelte-navigator';
	import Keno from './Keno.svelte';
	import Home from './Home.svelte';
    import MineSweeper from './mine-sweeper.svelte';
	import HILO from "./HILO.svelte"

</script>

<Router >
	<div>
	<header>
		<Link to="/">Home</Link>
		<Link to="/Minesweeper">Minesweeper</Link>
		<Link to="/Keno">Keno</Link>
		<Link to="/HILO">HILO</Link>

	</header>
<main>
	<Route primary={false} path="/" ><Home/></Route>
	<Route primary={false} path="/Minesweeper" ><MineSweeper/></Route>
	<Route primary={false} path="/Keno" ><Keno/></Route>
	<Route primary={false} path="/HILO" ><HILO/></Route>

</main>
</Router>

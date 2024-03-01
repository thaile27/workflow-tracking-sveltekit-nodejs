<script>
import NavBar from '$components/NavBar.svelte';
</script>

<header>
  <NavBar
    pageH1="Landing Pages"
    title="TinaKing"
    links={[
			{ path: '/landing/client-landing', name:'Client', class_style: ''},
			{ path: '/landing/admin-landing', name:'Admin', class_style: ''},
			{ path: '/landing/manager-landing', name:'Manager', class_style: ''},
			{ path: '/landing/reviewer-landing', name:'Reviewer', class_style: ''},
			{ path: '/', name:'Logout', class_style: 'text-danger'},
		]}
  />
</header>
<main>
  <div class="page-container">
    <div class="container">
      <div class="row text-center">
        <h2>Choose the landing pages you want to visit to test and see</h2>
      </div>
      <div class="row text-center">
        <p>Here is some content</p>
        <div><button class="btn btn-warning">Click me</button></div>
      </div>
    </div>
  </div>
</main>

<style>
  header{
    position: relative;
    z-index: 10;
  }
  .container {
    padding: 5rem 0;
  }
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color:#ebf3f7;
  }
</style>
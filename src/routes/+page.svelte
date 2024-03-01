
<script>
  import LoginPage from '$components/LoginPage.svelte';
	import NavBar from '$components/NavBar.svelte';
</script>
<header>
  <NavBar
    pageH1="Login Page"
    links = {[
          {path: "/clientreg", name: "Client Register", class_style: ''},
          {path: "/employeereg", name: "Employee Register", class_style: ''},
          {path: "/review", name: "Review", class_style: ''},
          {path: "/reviewresult", name: "Review Result", class_style: ''},
          {path: "/landing", name: "Landing", class_style: ''}
        ]} />
</header>
    <main>
      <LoginPage />
    </main>

  <style>
    header{
      position: relative;
      z-index: 10;
    }

  </style>
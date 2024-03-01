<script>
    export let title = "TinaKing";
    export let links = [{}];
    export let pageH1;
  </script>
  
  <style>
    .navbar {
      background-color: rgb(0, 102, 153);
      padding: 2.5rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .navbar::after{
    content: '';
    position: absolute;
    height: 33px;
    min-width: 100%;
    background: url($lib/images/headerborder.png);
    opacity: 1;
    z-index: 2001;
    top: 107px;
    left:0px;
    }
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      margin: 10rem 0;
      position: absolute;
      top: 50%; /* Center it vertically */
      left: 50%; /* Center it horizontally */
      transform: translate(-50%, -50%); /* Adjust the exact center position */
      padding: 10px;
      border-radius: 8px;
      color: white;
    }
  </style>

<nav class="navbar">
  <div class="logo"><a href="/">{title}</a></div>
  {#each links as link}
    <a href={link.path} class="{link.class_style}">{link.name}</a>
  {/each}
</nav>

<h1>{pageH1}</h1>
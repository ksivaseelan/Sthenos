<script lang="ts">
    import type { PageData } from './$types';
    // import { enhance } from '$app/forms';
    
    export let data: PageData;
</script>

<h1>Profile</h1>
<p>User id: {data.userId}</p>
<p>GitHub username: {data.githubUsername}</p>
<!-- <form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form> -->
<form method="post" action="?/logout">
	<input type="submit" value="Sign out" />
</form>
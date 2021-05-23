document.addEventListener('DOMContentLoaded', () => {
    const addpostform = document.getElementById("new-post");

    const addNewpost = async (event) => {
        event.preventDefault();

        const title = document.querySelector('#post-title').value.trim();
        const description = document.querySelector('#post-body').value.trim();

        if (title && description) {
            console.log(title);
            const response = await fetch('/api/posts/', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
                alert("You have successfully adding post.");
            } else {
                alert('Failed to log in.');
            }
        }
    };

    addpostform.addEventListener('submit', addNewpost);
  
});
document.addEventListener('DOMContentLoaded', () => {
    const addpostform = document.getElementById("new-post");
    // const editpostform = document.getElementById("edit-post-form");
    // const deleteButton = document.getElementById('delete-button');

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

    // const editPost = async (event) => {
    //     event.preventDefault();
    //     console.log("testing");
    //     const id = event.target.getAttribute("data-id");

    //     const title = document.querySelector('#editpost-title').value.trim();
    //     const description = document.querySelector('#editpost-body').value.trim();

    //     console.log(title, description);

    //     if (title && description) {
    //         const response = await fetch(`/api/posts/edit/${id}`, {
    //             method: 'PUT',
    //             body: JSON.stringify({ title, description }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });

    //         if (response.ok) {
    //             document.location.replace('/dashboard');
    //             alert('You have successfully updating your post.');
    //         } else {
    //             alert('Failed to log in.');
    //         }
    //     }
    // };

    // const deletePost = async (event) => {
    //     event.preventDefault();
    //     const id = event.target.getAttribute("data-id");
    //     const response = await fetch(`/api/posts/${id}`, {
    //         method: 'DELETE',
    //     });

    //     if (response.ok) {
    //         alert(
    //             'You have successfully delete your post'
    //         );
    //     } else {
    //         alert('Failed to delet');
    //     }
    // };

    addpostform.addEventListener('submit', addNewpost);

  
});
document.addEventListener('DOMContentLoaded', () => {
    const addpostform = document.getElementById("new-post");
    const editpostform = document.getElementById("edit-post");

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

    const editPost = async (event) => {
        event.preventDefault();

        const title = document.querySelector('#editpost-title').value.trim();
        const description = document.querySelector('#editpost-body').value.trim();

        if (title && description) {
            const response = await fetch('/api/posts/edit/:id', {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
                alert('You have successfully updating your post.');
            } else {
                alert('Failed to log in.');
            }
        }
    };

    document.addEventListener('submit', addNewpost);
    document.addEventListener('submit', editPost);


    // addpostButton.addEventListener('submit', (e) => {
    //     // Prevent the default submission of the form
    //     e.preventDefault();
    //     // Get the values input by the user in the form fields
    //     const title = document.querySelector('#post-title').value;
    //     const description = document.querySelector('#post-body').value;
    //     console.log(title,description);
    //     if (title && description) {
    //         // If the credentials are valid, show an alert box and reload the page
    //         addNewpost(e);
    //         alert('sucessfully submitted')
    //     } else {
    //         // Otherwise, make the login error message show (change its oppacity)
    //         loginErrorMsg.style.opacity = 1;
    //         alert('not working')
    //     }
    // })

    // editpostButton.addEventListener('click', (e) => {
    //     // Prevent the default submission of the form
    //     e.preventDefault();
    //     // Get the values input by the user in the form fields
    //     const id = document.querySelector('#editpost-id').value;
    //     const title = document.querySelector('#editpost-title').value;
    //     const description = document.querySelector('#editpost-body').value;

    //     if (id && title && description) {
    //         // If the credentials are valid, show an alert box and reload the page
    //         editPost(e);
    //     } else {
    //         // Otherwise, make the login error message show (change its oppacity)
    //         loginErrorMsg.style.opacity = 1;
    //     }
    // })
});
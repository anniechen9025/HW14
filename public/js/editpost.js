document.addEventListener('DOMContentLoaded', () => {
    const editpostform = document.querySelector(".edit-post-form");
    const deleteButton = document.getElementById('delete-button');


   

    const editPost = async (event) => {
        event.preventDefault();
        const id = event.target.getAttribute("data-id");

        const title = document.querySelector('#editpost-title').value.trim();
        const description = document.querySelector('#editpost-body').value.trim();

        console.log(title, description);
        console.log(id);

        if (title && description) {
            const response = await fetch(`/api/posts/edit/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
                alert('You have successfully updating your post.');
            } else {
                alert('Failed to edit.');
            }
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            alert(
                'You have successfully delete your post'
            );
        } else {
            alert('Failed to delet');
        }
    };

   
    editpostform.addEventListener('submit', editPost);
    deleteButton.addEventListener('click', deletePost);
});
document.addEventListener('DOMContentLoaded', () => {
    const addcommentform = document.getElementById("new-comment");

    const addComment = async (event) => {
        event.preventDefault();

        const id = event.target.getAttribute("data-id");
        console.log(id);

        const body = document.querySelector('#comment-body').value.trim();
        console.log(body);
        if (body) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'POST',
                body: JSON.stringify({ body }),
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);

            if (response.ok) {
                document.location.replace('/');
                alert("You have successfully adding comment.");
            } else {
                alert('Failed to add comment.');
            }
        }
    };

    document.addEventListener('submit',addComment);
});
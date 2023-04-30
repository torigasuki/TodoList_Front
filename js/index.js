window.onload = () => {
    /**엑세스 토큰 확인 */
    if (localStorage.getItem('access') !== undefined) {
        todopost()
    }
}
/**글쓰기 */
function todopost() {
    todowrite = document.getElementById("todowrite");
    todowrite.addEventListener("click", async (event) => {
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const response = await fetch("http://127.0.0.1:8000/todos/", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access'),
                "content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'content': content,
            })
        })
        location.reload();
    })
}
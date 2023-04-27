window.onload = () => {
    /**엑세스 토큰 확인 */
    if (localStorage.getItem('access') !== null) {
        nav = document.querySelector('.nav')
        const payload = localStorage.getItem('payload')
        const payload_json = JSON.parse(payload)
        var user = payload_json.username + '님 환영합니다.'
        nav.innerHTML = '';
        nav.innerHTML = '<li><summary aria-haspopup="listbox" role="link" class="secondary" id="user"></summary></li>' +
            '<li><summary aria-haspopup="listbox" role="link" class="secondary"><a href="#" id="logout">로그아웃</a></summary></li>'
        document.getElementById('user').innerText = user

        /**로그아웃 */
        logout = document.getElementById("logout"); 
        logout.addEventListener("click", async (event) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('payload')
            window.location.href = "/login.html"
        })
        postview()
        /**글쓰기 */
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
}
/**글보기 */
async function postview() {
    const response = await fetch('http://127.0.0.1:8000/todos/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
        method: 'GET',
    })
    response_json = await response.json()
    response_json.forEach(e => {
        document.getElementById('todo').innerHTML += "<details id='todo" + e.id + "' open></details>"
        todo = document.getElementById('todo' + e.id)
        todo.innerHTML = '<summary>' + e.id + '.   ' + e.title + '</summary>' +
            '<p>' + '내용:' + e.content + '</p>' +
            '<p>수행여부:<input type="checkbox" id=is_done' + e.id + ' name="is_done" value="' + e.is_done + '" onclick=is_done(' + e.id + ',' + e.is_done + ')></p>' +
            '<p><button onclick=tododelete(' + e.id + ')>삭제</button></p>'
            
        if (e.is_done == true) {
            console.log('실행 되었습니다')
            todo.innerHTML = '<summary>' + e.id + '.   ' + e.title + '</summary>' +
                '<p>내용:' + e.content + '</p>' +
                '<p>완료시간:' + e.completion_at + '</p>' +
                '<p><button onclick=tododelete(' + e.id + ')>삭제</button></p>'

        }
    });
}
/**수행여부 */
async function is_done(id, bool) {
    if (bool == true) {
        bool = false
    }
    else if (bool == false) {
        bool = true
    }
    const response = await fetch('http://127.0.0.1:8000/todos/' + id + '/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
            "content-Type": "application/json",
        },
        method: 'PUT',
        body: JSON.stringify({
            'is_done': bool
        })
    })
    location.reload();

}
/**삭제 */
async function tododelete(id) {
    const response = fetch('http://127.0.0.1:8000/todos/' + id + '/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
            "content-Type": "application/json",
        },
        method: 'DELETE',
        body: JSON.stringify({
        })
    })
    location.reload();

}
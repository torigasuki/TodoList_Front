new Vue({
    el: '#nav',
    data: {
        user: ''
    },
    methods: {
        logout: function () {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('payload')
        },
    },
    mounted() {
        const payload = localStorage.getItem('payload')
        const payload_json = JSON.parse(payload)
        this.user = payload_json
    }
})


new Vue({
    el: '#todolist',
    data: {
        todos: []
    },
    methods: {
        tododelete: function (id) {
            const response = fetch('http://127.0.0.1:8000/todos/' + id + '/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access'),
                    "content-Type": "application/json",
                },
                method: 'DELETE',
                body: JSON.stringify({
                })
            })
            location.reload()
        },

        is_done: function (id, bool) {
            bool == true ? bool = false : bool = true
            const response = fetch('http://127.0.0.1:8000/todos/' + id + '/', {
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
        },
        refresh: async function () {
            const response = await fetch('http://127.0.0.1:8000/users/api/token/refresh/', {
                headers: {
                    'content-type': "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    'refresh': localStorage.getItem('refresh')
                }),
            })
            if (!response.ok) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                localStorage.removeItem('payload')
                window.location.href = "/login.html"
            }
            else{
                const response_json = await response.json()
                localStorage.setItem('access', response_json.access)
            }
        }
    },
    async mounted() {
        if (localStorage.getItem('access') !== null) {
            const response = await fetch('http://127.0.0.1:8000/todos/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access'),
                },
                method: 'GET',
            })
            if (!response.ok) {
                this.refresh();
                window.location.href = "/"
            }
            const response_json = await response.json();
            this.todos = response_json;
        }
    }
})
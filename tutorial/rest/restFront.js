async function getUser() {
    try {
        const rest = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '����';
            edit.addEventListener('click', async () => {
                const name = prompt('�ٲ� �̸��� �Է��ϼ���');
                if (!name) {
                    return alert('�̸��� �ݵ�� �Է��ϼž� �մϴ�');
                }
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '����';
            remove.addEventListener('click', async () => {
                try {
                    await axios.delete('/users/' + key);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (err) {
        console.error(err);
    }
}

window.onload = getUser;
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('�̸��� �Է��ϼ���');
    }
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});
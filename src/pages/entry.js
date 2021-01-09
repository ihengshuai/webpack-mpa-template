import "@style/index.scss"
import { getUsers } from "@request/user"
import BackTop from "pkg-backtop"

new BackTop({})

document.querySelector("#userBtn").addEventListener("click", async () => {
	getUsers().then(res => {
		const listHTML = res.data.users.reduce((p, c) => p += `<li>姓名：${c.username}, 年龄：${c.age}, 省份：${c.province}</li>`, "")
		document.querySelector("#userList").innerHTML = listHTML
	})
})

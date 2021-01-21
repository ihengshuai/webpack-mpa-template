import "@style/index.scss"
import { getUsers } from "@request/user"
import { getAuthCode, userLogin, userLogout } from "@request/auth"
import BackTop from "pkg-backtop"
import MD5 from "crypto-js/md5"

new BackTop({})

document.querySelector("#userBtn").addEventListener("click", async () => {
	getUsers().then(({ data }) => {
		if (data.error && data.error.length) {
			alert(data.error)
			return
		}
		const listHTML = data.dataList.users.reduce((p, c) => p += `<li>姓名：${c.username}, 年龄：${c.age}, 省份：${c.province}</li>`, "")
		document.querySelector("#userList").innerHTML = listHTML
	})
})

const loginBtn = document.querySelector("#loginBtn"),
	logoutBtn = document.querySelector("#logoutBtn"),
	codeSvg = document.querySelector("#codeSvg")

// 初始化验证码
authCode()
// 刷新验证码
codeSvg.addEventListener("click", authCode)
async function authCode() {
	await getAuthCode().then(({ data }) => codeSvg.innerHTML = data)
}

// 登录
loginBtn.addEventListener("click", async () => {
	let account = document.querySelector("#account"),
		pwd = document.querySelector("#pwd"),
		code = document.querySelector("#code")
	const formData = { account: account.value, pwd: pwd.value ? MD5(pwd.value).toString() : "", code: code.value }
	const { data } = await userLogin(formData)
	if (data.error && data.error.length) {
		await authCode()
		alert(data.error)
		return
	} else {
		alert(data.msg)
	}
})


// 退出
logoutBtn.addEventListener("click", async () => {
	const { data } = await userLogout()
	if (!data.error) {
		alert(data.msg)
	}
})

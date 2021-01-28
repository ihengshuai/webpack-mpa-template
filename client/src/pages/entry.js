import "./index.scss"
import { GetUserListApi } from "@api/user/get-user-list-api"
import { GetAuthCodeApi, UserLoginApi, UserLogoutApi } from "@api/auth-api"
import BackTop from "pkg-backtop"
import MD5 from "crypto-js/md5"

new BackTop({})

// Mock Button
document.querySelector("#userBtn").addEventListener("click", async () => {
	try {
		const api = new GetUserListApi()
		const data = await api.send()
		const listHTML = data.dataList.users.reduce((p, c) => p += `<li>姓名：${c.username}, 年龄：${c.age}, 省份：${c.province}</li>`, "")
		document.querySelector("#userList").innerHTML = listHTML
	} catch (error) {
		alert(error)
	}
})

const loginBtn = document.querySelector("#loginBtn"),
	logoutBtn = document.querySelector("#logoutBtn"),
	codeSvg = document.querySelector("#codeSvg")

// 初始化验证码
authCode()
// 刷新验证码
codeSvg.addEventListener("click", authCode)
async function authCode() {
	try {
		const api = await new GetAuthCodeApi()
		const data = await api.send()
		codeSvg.innerHTML = data
	} catch (error) {
		console.log(error)
	}
}

// 登录
loginBtn.addEventListener("click", async () => {
	let account = document.querySelector("#account"),
		pwd = document.querySelector("#pwd"),
		code = document.querySelector("#code")
	const formData = { account: account.value, pwd: pwd.value ? MD5(pwd.value).toString() : "", code: code.value }
	try {
		const api = new UserLoginApi()
		api.data = formData
		const data = await api.send()
		alert(data.msg)
	} catch (error) {
		authCode()
		alert(error)
	}
})


// 退出
logoutBtn.addEventListener("click", async () => {
	try {
		const api = new UserLogoutApi()
		const data = await api.send()
		alert(data.msg)
	} catch (error) {
		console.log(error)
	}
})

import config from './config'

const newPromise = function (url, params) {
	return new Promise(function (resolve, reject) {
		fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		})
		.then(res=>res.json())
		.then(res => {
			if(res.ok){
				resolve(res.obj)
			}else{
				reject(res.message)
			}
		})
		.catch(err => reject(err));
	})
}

export default {
	/**
	 * 繁体转简体
	 */
	f2j(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/f2j', {
			content
		})
	},
	/**
	 * 简体转繁体
	 */
	j2f(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/j2f', {
			content
		})
	},
	/**
	 * 简体转拼音
	 */
	pinyin(content) {
		return new newPromise(config.apiPath + 'NlpDemoApi/pinyin', {
			content
		})
	},
	/**
	 * 获取CPU信息
	 */
	getCpus(monitorDate, interval) {
		return newPromise('cpu', monitorDate, interval);
	},
	/**
	 * 获取系统物理内存信息
	 */
	getMem(monitorDate, interval) {
		return newPromise('sys', monitorDate, interval);
	},
	/**
	 * 获取操作系统信息
	 */
	getOperatingSystem(monitorDate, interval) {
		return newPromise('os', monitorDate, interval);
	},
	/**
	 * 获取系统用户信息
	 */
	getUsers(monitorDate, interval) {
		return newPromise('user', monitorDate, interval);
	},
	/**
	 * 获取文件系统信息
	 */
	getFileSystems(monitorDate, interval) {
		return newPromise('fs', monitorDate, interval);
	},
	/**
	 * 获取网络信息
	 */
	getNets(monitorDate, interval) {
		return newPromise('net', monitorDate, interval);
	},
	/**
	 * 获取目录信息
	 */
	getDirectorys(monitorDate, interval) {
		return newPromise('directory', monitorDate, interval);
	},
	/**
	 * 获取JVM类加载信息
	 */
	getJVMClassLoading(monitorDate, interval) {
		return newPromise('jvmclassloading', monitorDate, interval);
	},
	/**
	 * 获取JVM类编译信息
	 */
	getJVMCompilation(monitorDate, interval) {
		return newPromise('jvmcompilation', monitorDate, interval);
	},
	/**
	 * 获取JVM垃圾收集信息
	 */
	getJVMGarbageCollectors(monitorDate, interval) {
		return newPromise('jvmgc', monitorDate, interval);
	},
	/**
	 * 获取JVM内存信息
	 */
	getJVMMemoryManagers(monitorDate, interval) {
		return newPromise('jvmmemmgr', monitorDate, interval);
	},
	/**
	 * 获取内存管理器信息
	 */
	getJVMMemoryPool(monitorDate, interval) {
		return newPromise('jvmmempool', monitorDate, interval);
	},
	/**
	 * 获取JVM内存池信息
	 */
	getJVMMemory(monitorDate, interval) {
		return newPromise('jvmmem', monitorDate, interval);
	},
	/**
	 * 获取JVM所在操作系统信息
	 */
	getJVMOperatingSystem(monitorDate, interval) {
		return newPromise('jvmos', monitorDate, interval);
	},
	/**
	 * 获取JVM运行时参数及其它信息
	 */
	getJVMRuntime(monitorDate, interval) {
		return newPromise('jvmrt', monitorDate, interval);
	},
	/**
	 * 获取JVM线程相关信息
	 */
	getJVMThread(monitorDate, interval) {
		return newPromise('jvmthd', monitorDate, interval);
	},
	/**
	 * 获取Http Request
	 */
	getHttpRequest(monitorDate, interval) {
		return newPromise('httprequest', monitorDate, interval);
	},
	/**
	 * 获取Http Session
	 */
	getHttpSession(monitorDate, interval) {
		return newPromise('httpsession', monitorDate, interval);
	},

	/**
	 * 获取cpu,sys,jvmos
	 */
	getCpuAndMemAndLoad(monitorDate, interval) {
		return newPromise('cpu,sys,jvmos', monitorDate, interval);
	},
	/**
	 * 获取jvmrt,jvmcompilation
	 */
	getJVMRuntimeAndJVMCompilation(monitorDate, interval) {
		return newPromise('jvmrt,jvmcompilation', monitorDate, interval);
	},
	/**
	 * 获取sql
	 */
	getSql(monitorDate, interval) {
		return newPromise('sql', monitorDate, interval);
	}
}

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://johnny-ttj.vaiwan.com' : 'https://zhswapi.sxidc.com'

const config = {
	baseUrl,
	apiBaseUrl: baseUrl + '/api/',
	httpDefaultOption: {
		showLoading: true,
		isAuth: true,
	},
}

export default config

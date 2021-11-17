const axios = require('axios');

class Request {
	constructor(host, key) {
		this.host = host;
		this.key  = key;
	}

	getRequest(request, data, _data) {
		const url = getUrl(request, this.host, data, _data)
		return axios({
			url: url,
			method: 'GET',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
		}).then((response) => {
			if (request.startsWith('GetAll'))
				return response.data.data
			else
				return response.data.attributes
		}).catch((err) => {
			const error = createError(request, err, data)
			if (error) throw error
		})
	}

	postRequest(request, data, _data) { // _data is nullable
		const url = getUrl(request, this.host, data, _data)
		
		return axios({
			url: url,
			method: 'POST',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
			data: data,
		}).then((response) => {
			return response.data.attributes
		}).catch((error) => {
			const err = createError(request, error, data)
			if (err) throw err
		})
	}
	
	patchRequest(request, data, _data) { // _data is nullable		
		const url = getUrl(request, this.host, data, _data)

		return axios({
			url: url,
			method: 'PATCH',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
			data: data,
		}).then((response) => {
			return response.data.attributes
		}).catch((error) => {
			const err = createError(request, error, data)
			if (err) throw err
		})
	}

	deleteRequest(request, data, _data) {
		const url = getUrl(request, this.host, data, _data) // data is nullable
		
		return axios({
			url: url,
			method: 'DELETE',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
		}).then((response) => {
			return createObjectSuccess('Deleted successfully.')
		}).catch((error) => {
			const err = createError(request, error)
			if (err) throw err
		})
	}
}

function getUrl(request, host, data, _data) { // _data = nullable
	switch (request) {		
		// User actions
		case 'EditUser', 'DeleteUser', 'GetUserInfo':
			if (_data != null) return host + '/api/application/users/' + _data
			return host + '/api/application/users/' + data
		case 'CreateUser', 'GetAllUsers':
			if (_data != null) return host + '/api/application/users?page=' + _data
			return host + '/api/application/users'
		
		// Server actions
		case 'GetAllServers', 'CreateServer':
			if (_data != null) return host + '/api/application/servers?page=' + _data
			return host + '/api/application/servers'
		case 'GetServerInfo', 'DeleteServer':
			return host + '/api/application/servers/' + data
		case 'UpdateBuild':
			return host + '/api/application/servers/' + _data + '/build'
		case 'UpdateDetails':
			return host + '/api/application/servers/' + _data + '/details'
		case 'SuspendServer':
			return host + '/api/application/servers/' + _data + '/suspend'
		case 'UnsuspendServer':
			return host + '/api/application/servers/' + _data + '/unsuspend'
		case 'ReinstallServer':
			return host + '/api/application/servers/' + _data + '/reinstall'
		case 'ForceDeleteServer':
			return host + '/api/application/servers/' + data + '/force'
		
		// Node actions
		case 'GetAllNodes', 'CreateNode':
			return host + '/api/application/nodes'
		case 'UpdateNode', 'DeleteNode':
			return host + '/api/application/nodes/' + data
		case 'GetAllAllocations':
			if (_data != null) return host + '/api/application/nodes/' + data + '/allocations?page=' + _data
			return host + '/api/application/nodes/' + data + '/allocations'
		case 'CreateAllocation':
			return host + '/api/application/nodes/' + _data + '/allocations'
		case 'DeleteAllocation':
			return host + '/api/application/nodes/' + data + '/allocations/' + _data
		
		// Database actions
		case 'CreateDatabase', 'GetAllDatabases':
			if (_data != null) return host + '/api/application/servers/' + _data + '/databases'
			return host + '/api/application/servers/' + data + '/databases'
		case 'DeleteDatabase', 'GetDatabaseInfo':
			return host + '/api/application/servers/' + data + '/databases/' + _data
		case 'ResetDatabasePassword':
			return host + '/api/application/servers/' + data + '/databases/' + _data + '/reset-password'

		// Location actions
		case 'GetAllLocations', 'CreateLocation':
			if (_data != null) return host + '/api/application/locations?page=' + _data
			return host + '/api/application/locations'
		case 'DeleteLocation', 'GetLocationInfo', 'UpdateLocation':
			if (_data != null) return host + '/api/application/locations/' + _data
			return host + '/api/application/locations/' + data
		
		// Nest/Eggs Actions
		case 'GetAllNests':
			return host + '/api/application/nests'
		case 'GetAllEggs':
			return host + '/api/application/nests/' + data + '/eggs'
		case 'GetEggInfo':
			return host + '/api/application/nests/' + data + '/eggs/' + _data
		case 'GetNestInfo':
			return host + '/api/application/nests/' + data

		default:
			return host + '/api/application/'
	}
}

function createObjectSuccess(message) {
	return {
		'success': true,
		'message': message,
	}
}

function createError(request, err, data) {
	let error;

	if (request == 'CreateUser' || request == 'EditUser' || request == 'GetUserInfo') {
		if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) == false) {
			error = new Error('The provided email is not a valid.')
			error.status = 422
			return error
		} else if (err.response.status == 422) {
			error = new Error('User already exists! (Or Email/Username is in use already)')
			error.status = 422
			return error
		} else if (err.response.status == 404) {
			error = new Error('User does not exist!')
			error.status = 404
			return error
		} else {
			return err
		}
	} else if(typeof err.response != 'undefined' && err.response.hasOwnProperty('data')) {
		return err.response.data.errors
	}
}

module.exports = Request;

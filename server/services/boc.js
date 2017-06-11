const axios = require('axios')

const URL = 'http://api.bocapi.net/v1/api/banks/'
const BANK_ID = 'bda8eb884efcef7082792d45'
const VIEW_ID = '5710bba5d42604e4072d1e92'
const AUTH_PROVIDER_NAME = '012301030701'
const AUTH_ID = '123456789'
const OCP_SUBSCRIPTION_KEY = '0198fd48ce9a45f4821a6868ce66ecd8'

class BankOfCyprus {
  getRequest(endpoint) {
    axios.get(endpoint, { 'headers': {
      'Auth-Provider-Name': AUTH_PROVIDER_NAME,
      'Auth-ID': AUTH_ID,
      'Ocp-Apim-Subscription-Key': OCP_SUBSCRIPTION_KEY,
    },
    })
      .then(response => {
        console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log(error)
        console.log(error)
      })
  }

  postRequest(endpoint) {
    axios.get(endpoint)
      .then(response => {
      })
      .catch((response) => {
      })
  }

  getAccount() {
    const endPoint = `${URL}${BANK_ID}/accounts/${ACCOUNT_ID}/${VIEW_ID}/account`
    return this.getRequest(endPoint)

  }

  getAccounts() {
    const endPoint = `${URL}${BANK_ID}/accounts`
    console.log(endPoint)
    return this.getRequest(endPoint)
  }

  getAtm() {
    const endPoint = `${URL}${BANK_ID}/atms/${ATM_ID}`
    return this.getRequest(endPoint)
  }

  getAtms(ANK_ID) {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }

  getAccountsPrivate() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }
  getAccountsPublic() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }
  getCustomer() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }
  getProduct() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)

  }
  getProducts() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }
  getTransaction() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }
  getTransactions() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.getRequest(endPoint)
  }

  postMakeTransaction() {
    const endPoint = `${URL}${BANK_ID}/atms`
    return this.postRequest(endPoint)
  }
}

module.exports = new BankOfCyprus()

import {API, Storage} from 'aws-amplify'
import {flowerModel} from '../app/pages/crud/redux/models/FlowerModel'

//************* CALLS FOR DB flowers **************/

export async function getDataFromDB(): Promise<flowerModel[]> {
  const apiName = 'flowerApi'
  const path = '/flowers/:flowerId'
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      flowerId: '',
    },
  }

  const apiResponse = API.get(apiName, path, myInit)
    .then((response) => {
      // Add your code here
      return response.data
    })
    .catch((error) => {
      console.log('This is an error of GET DATA', error)
    })
  return apiResponse
  // const ourData  = await axios.get(`https://55budww6z3.execute-api.us-east-1.amazonaws.com/dev/campaigns/%7Bid%7D`)
  // console.log(ourData)
}

export async function postDataToDB(
  flowerId: string,
  description: string,
  flowerName: string,
  imageUrl: string,
  popularity: number,
  price: number
) {
  const apiName = 'flowerApi'
  const path = '/flowers'
  const myInit = {
    body: {
      flowerId,
      description,
      flowerName,
      imageUrl,
      popularity,
      price,
    }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  }

  API.post(apiName, path, myInit)
    .then((response) => {
      // Add your code here
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export async function updateDataInDB(
  flowerId: string,
  description: string,
  flowerName: string,
  imageUrl: string,
  popularity: number,
  price: number
) {
  const apiName = 'flowerApi'
  const path = '/flowers'
  const myInit = {
    body: {
      flowerId,
      description,
      flowerName,
      imageUrl,
      popularity,
      price,
    }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  }

  API.put(apiName, path, myInit)
    .then((response) => {
      // Add your code here
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export async function deleteDataFromDB(flowerId: string) {
  const apiName = 'flowerApi'
  const path = '/flowers/:flowerId'
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      flowerId: flowerId,
    },
  }
  API.del(apiName, path, myInit)
    .then((response) => {
      // Add your code here
    })
    .catch((error) => {
      console.log(error.response)
    })
}

//************* CALLS FOR S3 BUCKET ***********/

export async function uploadFileS3(fileData: File) {
  await Storage.put(fileData.name, fileData, {
    contentType: fileData.type,
  })
}

export async function deleteFileS3(fileName: string) {
  await Storage.remove(fileName)
}

export async function getFileS3(s3Key: string): Promise<string> {
  try {
    const imageUrl = await Storage.get(s3Key)
    return imageUrl
  } catch (error) {
    console.log(`Error fetching file: ${error}`)
    return `Error fetching file: ${error}`
  }
}

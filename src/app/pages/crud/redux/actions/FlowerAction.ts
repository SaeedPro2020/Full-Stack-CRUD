import {Dispatch} from 'redux'
import {FLOWER_FAIL, FLOWER_LOADING, FLOWER_SUCCESS, FlowerDispatchTypes} from './asyncActions'
// import axios from "axios";
import {flowerModel} from '../models/FlowerModel'
import {AppActions} from './actions'
import {getDataFromDB} from '../../../../../api/apicalls'

export const requestFlowers = (): AppActions => ({
  type: FLOWER_LOADING,
  loading: true,
  flowers: [],
  error: '',
})

export const receivedFlowers = (flowers: flowerModel[]): AppActions => ({
  type: FLOWER_SUCCESS,
  loading: false,
  flowers: flowers,
  error: '',
})

export const invalidateFlowers = (): AppActions => ({
  type: FLOWER_FAIL,
  loading: false,
  flowers: [],
  error: 'Unable to fetch data',
})

// function simulateAxiosGet(): Promise<flowerModel[]> {
//     return new Promise<flowerModel[]>((resolve, reject) => {
// // Simulate delay with STATIC DATA
// setTimeout(() => {
//     const data: flowerModel[] =
//     [
//     {
//       flowerId: 1,
//       imageUrl: '/media/svg/flowers/flower1.jpg',
//       flowerName: "Tulip Supreme",
//       description: "Colourful Tulips beautifully arranged to make someone`s day!",
//       price: 33,
//       popularity: 3.7
//     },
//     {
//       flowerId: 2,
//       imageUrl: "/media/svg/flowers/flower2.jpg",
//       flowerName: "Hyacinth & Tulips",
//       description: "Chase the Winter blues away with our gorgeous new Spring bouquet!",
//       price: 29,
//       popularity: 3.7
//     },
//     {
//       flowerId: 3,
//       imageUrl: "/media/svg/flowers/flower3.jpg",
//       flowerName: "Rose and Lily",
//       description: "A gorgeous bouquet of stunning roses and lilies perfect for all occasions!",
//       price: 22,
//       popularity: 3.7
//     },
//     {
//       flowerId: 4,
//       imageUrl: "/media/svg/flowers/flower4.webp",
//       flowerName: "La Belle",
//       description: "Named for their beauty, long stem roses, perfect for all occasions!",
//       price: 27,
//       popularity: 3.8
//     },
//     {
//       flowerId: 5,
//       imageUrl: "/media/svg/flowers/flower5.webp",
//       flowerName: "Rose Medley",
//       description: "A truly special arrangement to brighten any day and celebrate all occasions.",
//       price: 36,
//       popularity: 4
//     },
//     {
//       flowerId: 6,
//       imageUrl: '/media/svg/flowers/flower6.jpg',
//       flowerName: "Joyful",
//       description: "A truly special arrangement to brighten any day and celebrate all occasions.",
//       price: 25,
//       popularity: 3.7
//     },
//     ]
// // Resolve the promise with the data
// resolve(data);
// }, 500);
// });
// }

export const GetFlowers = () => async (dispatch: Dispatch<FlowerDispatchTypes>) => {
  try {
    dispatch(requestFlowers())

    // const res = await axios.get(``);

    const res = await getDataFromDB()
    dispatch(receivedFlowers(res))
    // const res = await simulateAxiosGet();
  } catch (e) {
    dispatch(invalidateFlowers())
  }
}

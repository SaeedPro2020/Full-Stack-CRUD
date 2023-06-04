export interface flowerModel {
  flowerId: number
  imageUrl: string
  flowerName: string
  description: string
  price: number
  popularity: number
}

export interface productModel {
  avatar: File | undefined
  pName: string
  Description: string
  price: number
}

export const initialValues = {
  avatar: undefined,
  pName: 'White Rose',
  Description: 'Chase the Winter blues away with our gorgeous new Spring bouquet!',
  price: 37,
}

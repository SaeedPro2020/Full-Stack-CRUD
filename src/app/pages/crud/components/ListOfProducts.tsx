import React, {FC, useEffect, useState} from 'react'
import {MixedWidget5} from './Prodeuct'

import {flowerModel} from '../redux/models/FlowerModel'
import {GetFlowers} from '../redux/actions/FlowerAction'

import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {AsideMenuItem} from '../../../../demoresource/layout/components/aside/AsideMenuItem'
import {Dispatch} from 'redux'
import {FlowerDispatchTypes} from '../redux/actions/asyncActions'
import {deleteDataFromDB, deleteFileS3} from '../../../../api/apicalls'
import {EditProduct} from './EditProduct'

const ListOfProducts: FC = () => {
  const dispatch = useDispatch()

  const [redirect, setRedirect] = useState(false)
  const [id, setid] = useState(0)

  const JsonData = useSelector((state: RootState) => state.flowerReducer)

  const rowComponents = []
  let chunk: flowerModel[] = []

  for (let i = 0; i < JsonData?.flowers.length; i += 3) {
    chunk = JsonData?.flowers.slice(i, i + 3)
    rowComponents.push(chunk)
  }

  const handleDeleteItem = (value: number) => {
    const ourElementForDelete = JsonData.flowers.findIndex((flowres) => flowres.flowerId === value)
    deleteFileS3(JsonData.flowers[ourElementForDelete].imageUrl)
    deleteDataFromDB(JsonData.flowers[ourElementForDelete].flowerId.toString())
    JsonData.flowers.splice(ourElementForDelete, 1)
  }

  useEffect(() => {
    dispatch(GetFlowers() as Dispatch<FlowerDispatchTypes>)
  }, [dispatch])

  return (
    <>
      {redirect ? (
        <EditProduct OnEditedId={id} onRedirect={setRedirect} />
      ) : (
        <>
          {JsonData?.loading === true ? (
            <h3
              className='indicator-progress d-flex flex-wrap justify-content-center pb-lg-0'
              style={{display: 'block'}}
            >
              ...Loading
            </h3>
          ) : (
            <div className='row g-5 g-xl-8'>
              <div
                className='btn btn-primary float-end'
                style={{width: '160px', height: '60px', float: 'inline-end'}}
              >
                <AsideMenuItem
                  to='/crafted/widgets/addProducts'
                  title='Add Product'
                  hasBullet={false}
                />
              </div>

              {rowComponents.map((element, index) => (
                <div key={index} className='row g-5 g-xl-8'>
                  {/* begin::Col */}
                  {element.map((flowerCollection: flowerModel, index: number) => (
                    <div key={index} className='col-xl-4'>
                      <MixedWidget5
                        id={flowerCollection.flowerId}
                        className='card-xl-stretch mb-xl-8'
                        image={flowerCollection.imageUrl}
                        price={flowerCollection.price.toString() + '€'}
                        name={flowerCollection.flowerName}
                        description={flowerCollection.description}
                        onDeleteBtnClicked={handleDeleteItem}
                        onIdForEdit={setid}
                        onRedirect={setRedirect}
                      />
                    </div>
                  ))}
                  {/* end::Col */}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export {ListOfProducts}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {InputImage} from './InputImage'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {deleteFileS3, updateDataInDB, uploadFileS3} from '../../../../api/apicalls'
import {receivedFlowers} from '../redux/actions/FlowerAction'

const AddProductsSchema = Yup.object().shape({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  company: Yup.string().required('Company name is required'),
  price: Yup.string().required('Contact phone is required'),
  companySite: Yup.string().required('Company site is required'),
  country: Yup.string().required('Country is required'),
  language: Yup.string().required('Language is required'),
  timeZone: Yup.string().required('Time zone is required'),
  currency: Yup.string().required('Currency is required'),
})

interface Props {
  OnEditedId: number
  onRedirect: (confirm: boolean) => void
}

interface editedFlowerModel {
  flowerId: number
  imageUrl: undefined | File
  flowerName: string
  description: string
  price: number
  popularity: number
}

const EditProduct: React.FC<Props> = ({OnEditedId, onRedirect}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const JsonData = useSelector((state: RootState) => state.flowerReducer)
  const itsImageUrl = useSelector((state: RootState) => state.sliceName.flowerUrl)

  const ourElementForEdit = JsonData.flowers.filter((flowres) => flowres.flowerId === OnEditedId)
  const indexOfEditedItem = JsonData.flowers.findIndex((flowres) => flowres.flowerId === OnEditedId)

  const initialValues: editedFlowerModel = {
    flowerId: OnEditedId,
    imageUrl: undefined,
    flowerName: ourElementForEdit[0]?.flowerName,
    description: ourElementForEdit[0]?.description,
    price: ourElementForEdit[0]?.price,
    popularity: ourElementForEdit[0]?.popularity,
  }

  const formik = useFormik<editedFlowerModel>({
    initialValues,
    validationSchema: AddProductsSchema,
    onSubmit: (values) => {},
  })

  const handleFileChange = (value: File | undefined) => {
    formik.values.imageUrl = value
  }

  async function updateData() {
    setLoading(true)
    const flowerId = ourElementForEdit[0].flowerId.toString()

    //Update would perform for backend and front-end only if all fields change for image and text
    if (
      formik.values.imageUrl &&
      formik.values.flowerName &&
      formik.values.description &&
      formik.values.price
    ) {
      //Update Backend
      await deleteFileS3(ourElementForEdit[0].imageUrl)
      await uploadFileS3(formik.values.imageUrl)
      const imageUrlS3 = formik.values.imageUrl.name
      await updateDataInDB(
        flowerId,
        formik.values.description,
        formik.values.flowerName,
        imageUrlS3,
        formik.values.popularity,
        formik.values.price
      )

      //Change data in JSON array retrieved from store
      JsonData.flowers[indexOfEditedItem].flowerName = formik.values.flowerName
      JsonData.flowers[indexOfEditedItem].description = formik.values.description
      JsonData.flowers[indexOfEditedItem].popularity = formik.values.popularity
      JsonData.flowers[indexOfEditedItem].price = formik.values.price
      JsonData.flowers[indexOfEditedItem].imageUrl = imageUrlS3

      //Update store ==> update front-end immidately
      dispatch(receivedFlowers(JsonData.flowers))
    }

    setLoading(false)
    //Redirect to list of items
    onRedirect(false)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Product Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6 required'>Flower image</label>

              <InputImage onImageChange={handleFileChange} defaultImage={itsImageUrl} />
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Name of flower
              </label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Flower name'
                      {...formik.getFieldProps('flowerName')}
                    />
                    {formik.touched.flowerName && formik.errors.flowerName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.flowerName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Description'
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.description}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Price</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Price'
                  {...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.price}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='button'
              className='btn btn-primary mx-10'
              disabled={loading}
              onClick={() => onRedirect(false)}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
              onClick={updateData}
            >
              {!loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Update
                </span>
              )}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {EditProduct}

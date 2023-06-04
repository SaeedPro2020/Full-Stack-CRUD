import React, {useState} from 'react'
import {initialValues, productModel} from '../redux/models/FlowerModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {AsideMenuItem} from '../../../../demoresource/layout/components/aside/AsideMenuItem'
import {InputImage} from './InputImage'
import {postDataToDB, uploadFileS3} from '../../../../api/apicalls'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {useHistory} from 'react-router-dom'

const AddProductsSchema = Yup.object().shape({
  pName: Yup.string().required('First name is required'),
  Description: Yup.string().required('Product description is required'),
  price: Yup.string().required('Contact phone is required'),
})

const AddProducts: React.FC = () => {
  const history = useHistory()

  const [data, setData] = useState<productModel>(initialValues)
  const JsonData = useSelector((state: RootState) => state.flowerReducer)

  const [loading, setLoading] = useState(false)
  const formik = useFormik<productModel>({
    initialValues,
    validationSchema: AddProductsSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        values.price = data.price
        values.avatar = data.avatar
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        setLoading(false)
      }, 1000)
    },
  })

  const handleFileChange = (value: File | undefined) => {
    formik.values.avatar = value
  }

  async function saveData() {
    setLoading(false)
    const flowerId = (JsonData.flowers.length + 1).toString()
    if (
      formik.values.avatar &&
      formik.values.pName &&
      formik.values.Description &&
      formik.values.price
    ) {
      await uploadFileS3(formik.values.avatar)
      const imageUrlS3 = formik.values.avatar.name
      await postDataToDB(
        flowerId,
        formik.values.Description,
        formik.values.pName,
        imageUrlS3,
        3.6,
        formik.values.price
      )
    }

    setTimeout(() => {
      setLoading(true)
      history.push('/crafted/widgets/products')
    }, 1000)
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

              <InputImage
                onImageChange={handleFileChange}
                defaultImage='/media/avatars/istockphoto.jpg'
              />
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
                      placeholder='First name'
                      {...formik.getFieldProps('pName')}
                    />
                    {formik.touched.pName && formik.errors.pName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.pName}</div>
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
                  {...formik.getFieldProps('Description')}
                />
                {formik.touched.Description && formik.errors.Description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.Description}</div>
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
                  placeholder='Phone number'
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
            <button type='submit' className='btn btn-primary mx-10' disabled={loading}>
              <AsideMenuItem to='/crafted/widgets/mixed' title='Cancel' hasBullet={false} />
            </button>

            <button type='submit' className='btn btn-primary' disabled={loading} onClick={saveData}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {AddProducts}

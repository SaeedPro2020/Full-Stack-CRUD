/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {toAbsoluteUrl} from '../../../../demoresource/helpers'
import {getFileS3} from '../../../../api/apicalls'

import {Link} from 'react-router-dom'
import {Dropdown, DropdownButton} from 'react-bootstrap-v5'
import {useDispatch} from 'react-redux'
import {sliceName} from '../slice/Slice'

type Props = {
  id: number
  className: string
  price: string
  image: string
  name: string
  description: string
  onDeleteBtnClicked: (value: number) => void
  onRedirect: (confirm: boolean) => void
  onIdForEdit: (value: number) => void
}

const MixedWidget5: React.FC<Props> = ({
  id,
  className,
  price,
  image,
  name,
  description,
  onDeleteBtnClicked,
  onRedirect,
  onIdForEdit,
}) => {
  const [imageUrl, setImageUrl] = useState('')

  const dispatch = useDispatch()

  const handleButtonClick = () => {
    onIdForEdit(id)
    console.log(id)
    onRedirect(true)
    dispatch(sliceName.actions.addData(imageUrl))
  }

  const handleButtonDel = () => {
    onDeleteBtnClicked(id)
  }

  getFileS3(image).then((result) => {
    setImageUrl(result)
  })

  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Body */}
        <div className='card card-flush flex-row-fluid p-6 pb-5 mw-100'>
          {/* <!--begin::Body--> */}

          {/* <!--begin of menu--> */}
          <div className='menu-item px-3'>
            <DropdownButton
              key='Primary'
              id='dropdown-variants-Primary'
              variant='Primary'
              title='Actions'
            >
              <Dropdown.Item>
                <div className='menu-link px-3'>
                  <span className='menu-title' style={{color: 'black'}} onClick={handleButtonClick}>
                    Edit
                  </span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='#'>
                  <span className='menu-title' style={{color: 'black'}} onClick={handleButtonDel}>
                    Delete
                  </span>
                </Link>
              </Dropdown.Item>
            </DropdownButton>
          </div>
          {/* <!--end of menu--> */}

          <div className='card-body text-center'>
            {/* <!--begin::Food img-->*/}
            <img
              src={toAbsoluteUrl(imageUrl)}
              className='rounded-3 mb-4 w-150px h-150px w-xxl-200px h-xxl-200px'
              alt='flower'
            />
            {/* <!--end::Food img-->           */}

            {/* <!--begin::Info--> */}
            <div className='mb-2'>
              {/* <!--begin::Title--> */}
              <div className='text-center'>
                <span className='fw-bold text-gray-800 cursor-pointer text-hover-primary fs-3 fs-xl-1'>
                  {name}
                </span>

                <span className='text-gray-400 fw-semibold d-block fs-6 mt-n1'>{description}</span>
              </div>
              {/* <!--end::Title--> */}
            </div>
            {/* <!--end::Info-->    */}

            {/* <!--begin::Total-->             */}
            <span className='text-success text-end fw-bold fs-1'>{price}</span>
            {/* <!--end::Total--> */}
          </div>
          {/* <!--end::Body-->                        */}
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

export {MixedWidget5}

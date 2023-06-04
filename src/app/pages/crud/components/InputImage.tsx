import React from 'react'
import {toAbsoluteUrl} from '../../../../demoresource/helpers'
import ImageUploading, {ImageListType} from 'react-images-uploading'

type Props = {
  onImageChange: (value: File | undefined) => void
  defaultImage: string
}
//
const InputImage: React.FC<Props> = ({onImageChange, defaultImage}) => {
  const [images, setImages] = React.useState([])
  const maxNumber = 1

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    onImageChange(imageList[0]?.file)
    setImages(imageList as never[])
  }

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Thumbnail</h2>
        </div>
      </div>

      <div className='card-body text-center pt-0'>
        <div
          className='image-input image-input-outline image-input-placeholder mb-3 image-input-changed'
          data-kt-image-input='true'
        >
          <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className='upload__image-wrapper'>
                {imageList.length === 0 ? (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow mt-5'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    aria-label='Change avatar'
                    data-bs-original-title='Change avatar'
                    data-kt-initialized='1'
                    style={isDragging ? {color: 'red'} : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <i className='bi bi-pencil-fill fs-7'></i>
                  </button>
                ) : (
                  <button
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow mt-5'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    aria-label='Change avatar'
                    data-bs-original-title='Change avatar'
                    data-kt-initialized='1'
                    style={isDragging ? {color: 'red'} : undefined}
                    onClick={() => onImageUpdate(0)}
                    {...dragProps}
                  >
                    <i className='bi bi-pencil-fill fs-7'></i>
                  </button>
                )}
                &nbsp;
                {imageList.length === 0 ? (
                  <div
                    className='image-input-wrapper w-150px h-150px image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl(defaultImage)})`}}
                  ></div>
                ) : (
                  imageList.map((image, index) => (
                    <div key={index} className='image-item'>
                      <img
                        className='image-input-wrapper w-150px h-150px image-input-outline'
                        src={image.dataURL}
                        alt='Pic'
                      />

                      <div className='image-item__btn-wrapper'>
                        <button
                          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                          data-kt-image-input-action='cancel'
                          data-bs-toggle='tooltip'
                          aria-label='Cancel avatar'
                          data-bs-original-title='Cancel avatar'
                          data-kt-initialized='1'
                          onClick={() => onImageRemove(index)}
                        >
                          <i className='bi bi-x fs-2'></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </ImageUploading>
        </div>
        <div className='text-muted fs-7'>
          Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted
        </div>
      </div>
    </div>
  )
}

export {InputImage}

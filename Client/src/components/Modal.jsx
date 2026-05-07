import React from 'react'

const Modal = ({
    children,
    isOpen,
    onClose,
    hideHeader,
    title,
}) => {

    if(!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 p-4">
        {/*Modal content */}
        <div className={`relative flex flex-col bg-white rounded-xl overflow-hidden max-h-[90vh] w-full max-w-md`}>
            {!hideHeader &&(
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
                    <button className="text-gray-400 hover:text-gray-900 rounded-lg text-sm" type='button' onClick={onClose}>
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            {hideHeader && (
                <button className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-4 right-4 cursor-pointer z-10" type='button' onClick={onClose}>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}


            <div className="flex-1 overflow-y-auto custom-scollbar">
                {children}
            </div>
            </div>


        
        
    </div>
    
  )
}

export default Modal
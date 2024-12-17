import React from 'react'
import { Input } from 'antd'

const UNInput = ({placeholder , onChange}) => {
  return (
    <div>
      <Input placeholder={placeholder} className="my-2 w-full" onChange={onChange}/>
    </div>
  )
}

export default UNInput

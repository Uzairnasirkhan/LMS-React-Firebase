import React from 'react'
import { Button } from "antd";

const UNButton = ({label,onClick,loading}) => {
  return (
    <Button 
    type="primary"
    htmlType="submit"
    size='medium'
    onClick={onClick}
    loading={loading}
    >
         {label}
    </Button>
  )
}

export default UNButton

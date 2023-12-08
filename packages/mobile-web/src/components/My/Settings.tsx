import React from 'react'

import styles from '@style/Popup.module.css'
import { UserResponseDto } from '../../../__generated__/Api'

type MySettingsProps = {
  me: UserResponseDto | null
}

export const MySettings = ({ me }: MySettingsProps) => {
  const { email, group, name, role, teams } = me || {}
  return (
    <div style={{ width: '100px', height: '200px', backgroundColor: 'red' }}>
      <div>{email}</div>
      <div>{group}</div>
      <div>{name}</div>
      <div>{role}</div>
      <div>{teams}</div>
    </div>
  )
}

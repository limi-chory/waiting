import React from 'react'

import styles from '@style/Popup.module.css'

type MySettingsProps = {
  me?: {
    email: string
    group: string
    name: string
    role: string
    teams: string[]
  }
}

export const MySettings = ({ me }: MySettingsProps) => {
  const { email, group, name, role, teams } = me || {}
  return (
    <div style={{ width: '100px', height: '200px', backgroundColor: 'red' }}>
      <label>{email}</label>
      <label>{group}</label>
      <label>{name}</label>
      <label>{role}</label>
      <label>{teams}</label>
    </div>
  )
}

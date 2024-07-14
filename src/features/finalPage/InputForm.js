import React, { useContext, useState } from 'react'
// import { NameContext, EmailContext, PhoneContext, AdressContext,useName, useEmail, usePhone,useAdress} from './FinalPage'

export const InputForm = ({setName, setAdress, setPhone, setEmail, setCurrier}) => {
    //to think of another way to pass data to server bcz now the last symbol gets lost

    let [nameLocal, setNameLocal] = useState('')
    let [emailLocal, setEmailLocal] = useState('')
    let [phoneLocal, setPhoneLocal] = useState('')
    let [adressLocal, setAdressLocal] = useState('')
    let [currierLocal, setCurrierLocal] = useState(false)
    const onNameChanged = e => {
        setNameLocal(e.target.value)
        setName(nameLocal)
    }
    const onEmailChanged = e => {
        setEmailLocal(e.target.value)
        setEmail(emailLocal)
    }
    const onPhoneChanged = e => {
        setPhoneLocal(e.target.value)
        setPhone(phoneLocal)
    }
    const onAdressChanged = e => {
        setAdressLocal(e.target.value)
        setAdress(adressLocal)
    }
    const onCurrierChecked = e => {
        setCurrierLocal(e.target.checked)
        setCurrier(e.target.checked)
    }

  return (
         <form className="submitForm">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={nameLocal}
                    onChange={onNameChanged}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={emailLocal}
                    onChange={onEmailChanged}
                />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phoneLocal}
                    onChange={onPhoneChanged}
                />
                <label htmlFor="adress">Adress:</label>
                <input
                    type="text"
                    id="adress"
                    name="adress"
                    value={adressLocal}
                    onChange={onAdressChanged}
                />
                <label htmlFor="currier">Currier delivery:</label>
                <input
                    type="checkbox"
                    id="currier"
                    name="currier"
                    checked={currierLocal}
                    onChange={onCurrierChecked}
                />
        </form>

  )
}

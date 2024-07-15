import React, { useContext, useState, useEffect } from 'react'

export const InputForm = ({setName, setAdress, setPhone, setEmail, setCurrier}) => {
    let [nameLocal, setNameLocal] = useState('')
    let [emailLocal, setEmailLocal] = useState('')
    let [phoneLocal, setPhoneLocal] = useState('')
    let [adressLocal, setAdressLocal] = useState('')
    let [currierLocal, setCurrierLocal] = useState(false)

    const onNameChanged = e => {setNameLocal(e.target.value)}
    const onEmailChanged = e => {setEmailLocal(e.target.value)}
    const onPhoneChanged = e => {setPhoneLocal(e.target.value)}
    const onAdressChanged = e => {setAdressLocal(e.target.value)}
    const onCurrierChecked = e => {setCurrierLocal(e.target.checked)}
    useEffect(() => {
        setName(nameLocal)
        setEmail(emailLocal)
        setPhone(phoneLocal)
        setAdress(adressLocal)
        setCurrier(currierLocal)
    }, [nameLocal, emailLocal, phoneLocal, adressLocal, currierLocal])

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

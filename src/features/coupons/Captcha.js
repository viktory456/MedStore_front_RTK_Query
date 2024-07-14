import React from 'react'
import { useEffect, useState } from'react'

export const Captcha = ({setButtonStatus}) => {

let [keyText, setKeyText] = useState('');
let [captcha, setCaptcha] = useState('');
let [captchaCode, setCaptchaCode] = useState('');

    useEffect(() => {
        Generate();
    }, [])

function Generate() {
    setCaptchaCode("")
    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.random() * randomchar.length)
    }
    setCaptcha(uniquechar)
}
const captchaChange = (e) => {
    setCaptchaCode(e.target.value)
}

function Printmsg() {
    const usr_input = captchaCode;
    if (usr_input == captcha) {
        setKeyText("Matched");
        setButtonStatus(false)
        Generate();
    }
    else {
        setKeyText("not Matched");
        Generate();
    }
}
  return (
    <div className="captcha">
        <div id="captcha_input" className="inline">
            <input type="text" placeholder="Captcha code" value={captchaCode} onChange={captchaChange}/>
        </div>
        <div id="captcha_image" className="inline" selectable="False">{captcha}</div>
        <input type="submit" id="btn" onClick={Printmsg} />
        <p id="key">{keyText}</p>
    </div>
  )
}

import * as React from 'react'
import "./styles.css"

export const InputText = ({type = 'text', placeholder, onChange, value}: 
	{type: string, placeholder?: string, onChange?: any, value?: any}) => {
    return (
        <input 
			onChange={onChange} 
			className="InputText" 
			type={type} 
			placeholder={placeholder}
			value={value}
		/>
    )
}
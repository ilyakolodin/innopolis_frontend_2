import * as React from 'react';
import { useEffect } from 'react'

const withLogger = (WrappedComponent: any) => {
    const WithLogger = (props: any) => {
        useEffect(() => {
            // Логирование когда компонент примонтровался
            //console.log(`Компонент ${WrappedComponent.name} примонтировался`)
            
            return () => {
                // Логирование компонента при размонтировании
                //console.log(`Компонент ${WrappedComponent.name} размонтировался`)
            }
        }, [])

        useEffect(() => {
            // Логирование компонента при обновлении
            //console.log(`Компонент ${WrappedComponent.name} обновился`)
        })

        return <WrappedComponent {...props} />
    }

    WithLogger.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name})`
    return WithLogger 
}

export default withLogger
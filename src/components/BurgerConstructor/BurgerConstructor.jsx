import React from 'react'

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element'

import './BurgerConstructor.module.css'

class BurgerConstructor extends React.Component {
    state = {  } 
    render() { 
        return (
            <section className='container'>
                <ConstructorElement/>
            </section>
        );
    }
}
 
export default BurgerConstructor ;